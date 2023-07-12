import { DescribeInstancesCommand, DescribeInstancesCommandInput, DescribeRegionsCommand, EC2Client, Reservation, Tag } from '@aws-sdk/client-ec2';
import { ApiAWSSingleResourceInstanceResult, AwsCredentialType } from '@metrikube/common';

import { CostExplorerService } from './cost-explorer.service';

export class EC2Service {
  private readonly client: EC2Client;
  private readonly credentials: AwsCredentialType;
  constructor(credentials: AwsCredentialType) {
    this.client = new EC2Client({
      region: credentials.region,
      credentials: credentials
    });
    this.credentials = credentials;
  }

  async getInstances(
    params: DescribeInstancesCommandInput = {
      Filters: [
        {
          Name: 'instance-state-name',
          Values: ['running', 'pending', 'stopping', 'stopped']
        }
      ]
    }
  ): Promise<Reservation[]> {
    try {
      const data = await this.client.send(new DescribeInstancesCommand(params));
      if (!data.Reservations || data.Reservations.length === 0) {
        console.log('No reservations found');
        return [];
      }
      return data.Reservations;
    } catch (error) {
      console.error('Error fetching EC2 instances :', error);
      throw error;
    }
  }

  async getAvailableRegions() {
    const command = new DescribeRegionsCommand({});
    const response = await this.client.send(command);
    return response?.Regions?.map((region) => region.RegionName);
  }

  async getInstancesByRegion(region: string) {
    const client = new EC2Client({ credentials: this.credentials, region });
    const command = new DescribeInstancesCommand({});
    const response = await client.send(command);
    return response?.Reservations?.flatMap((reservation) => reservation.Instances);
  }

  async getAllInstances() {
    const regions = await this.getAvailableRegions();
    const allInstances = [];
    if (!regions || regions.length === 0) {
      return [];
    }
    for (const region of regions) {
      if (!region) {
        continue;
      }
      console.log('Récupération des instances pour la région:', region);
      const instances = await this.getInstancesByRegion(region);
      allInstances.push(instances);
    }
    return allInstances;
  }

  /**
   * Get one instance information based on its id
   * @param instanceId
   * @returns ApiAWSSingleResourceInstanceResult
   */
  async getInstanceInformation(instanceId: string): Promise<ApiAWSSingleResourceInstanceResult | null> {
    const params = {
      InstanceIds: [instanceId]
    };

    try {
      const data = await this.client.send(new DescribeInstancesCommand(params));

      if (data.Reservations && data.Reservations.length > 0) {
        const instance = data?.Reservations?.[0]?.Instances?.[0];
        if (!instance) {
          return null;
        }

        const costExploreClient = new CostExplorerService(this.credentials);
        const instanceCost = await costExploreClient.getInstanceCost(instanceId, {
          startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
          endDate: new Date().toISOString().split('T')[0]
        });
        const ec2Instance = {
          id: instance.InstanceId || '',
          name: instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || '',
          status: instance.State?.Name === 'running',
          region: instance.Placement?.AvailabilityZone?.slice(0, -1) || '',
          cost: instanceCost.currentCost || 0,
          currency: instanceCost.currency || ''
        };

        return ec2Instance;
      }
      return null;
    } catch (error) {
      throw new Error('Error retrieving EC2 instance:' + error);
    }
  }

  /**
   * Get all instances information
   * @returns
   */
  async getInstancesInformations(): Promise<ApiAWSSingleResourceInstanceResult[]> {
    const instancesInformation = [];
    try {
      const params: DescribeInstancesCommandInput = {
        Filters: [
          {
            Name: 'instance-state-name',
            Values: ['running', 'stopping', 'stopped']
          }
        ]
      };
      const response = await this.client.send(new DescribeInstancesCommand(params));

      if (!response.Reservations || response.Reservations.length === 0) {
        console.log('No reservations found');
        return [];
      }

      for (const reservation of response.Reservations) {
        if (!reservation.Instances || reservation.Instances.length === 0) {
          console.log('No instances found');
          return [];
        }
        for (const instance of reservation.Instances) {
          const instanceId = instance.InstanceId;
          if (!instanceId || !instance.Tags || !instance.Placement || !instance.State || !instance.Placement.AvailabilityZone) {
            console.log('No instance id, tags, region or state found');
            return [];
          }
          const instanceName = this.getInstanceName(instance.Tags);
          const region = instance.Placement.AvailabilityZone.slice(0, -1);
          const isActive = instance.State.Name === 'running';
          const costExploreClient = new CostExplorerService(this.credentials);
          const cost = await costExploreClient.getInstanceCost(instanceId, {
            startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
            endDate: new Date().toISOString().split('T')[0]
          });

          const instanceInfo = {
            id: instanceId,
            name: instanceName || '',
            region: region,
            cost: cost.currentCost || '',
            currency: cost.currency || '',
            status: isActive
          };

          instancesInformation.push(instanceInfo);
        }
      }
    } catch (err) {
      throw new Error('Error fetching instance infos:' + err);
    }
    return instancesInformation;
  }

  /**
   * Retrieve the instance name from the tags
   * @param tags
   * @returns
   */
  getInstanceName(tags: Tag[]) {
    for (const tag of tags) {
      if (tag.Key === 'Name') {
        return tag.Value;
      }
    }
    return '';
  }
}
