import { DescribeInstancesCommand, DescribeInstancesCommandInput, EC2Client, Tag } from '@aws-sdk/client-ec2';

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

  // private createEC2Client(region: string): EC2Client {
  //   return new EC2Client({
  //     region: region,
  //     credentials: this.credentials,
  //   });
  // }

  async getInstanceInformations(instanceId: string): Promise<ApiAWSSingleResourceInstanceResult> {
    try {
      const params = {
        InstanceIds: [instanceId]
      };
      const res = await this.client.send(new DescribeInstancesCommand(params));
      if (!res.Reservations || res.Reservations.length === 0 || !res.Reservations[0].Instances || res.Reservations[0].Instances.length === 0) {
        throw new Error('No instance found');
      }
      const instanceFound = res.Reservations[0].Instances[0];
      const cost = await CostExplorerService.getInstance(this.credentials).getInstanceCost(instanceId, {
        startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
        endDate: new Date().toISOString().split('T')[0]
      });

      return {
        id: instanceId,
        name: instanceFound.Tags?.find((tag) => tag.Key === 'Name')?.Value || '',
        status: instanceFound.State?.Name === 'running',
        region: instanceFound.Placement?.AvailabilityZone?.slice(0, -1) || '',
        cost: cost.currentCost,
        currency: cost.currency
      };
    } catch (err) {
      throw new Error('Error fetching instance infos:' + err);
    }
  }

  // async getAvailableRegions() {
  //   const command = new DescribeRegionsCommand({});
  //   const response = await this.client.send(command);
  //   return response?.Regions?.map((region) => region.RegionName);
  // }

  // async getInstancesByRegion(region: string) {
  //   const client = new EC2Client({ credentials: this.credentials, region });
  //   const command = new DescribeInstancesCommand({});
  //   const response = await client.send(command);
  //   return response?.Reservations?.flatMap((reservation) => reservation.Instances);
  // }

  // async getAllInstances() {
  //   const regions = await this.getAvailableRegions();
  //   const allInstances = [];
  //   if (!regions || regions.length === 0) {
  //     return [];
  //   }
  //   for (const region of regions) {
  //     if (!region) {
  //       continue;
  //     }
  //     console.log('Récupération des instances pour la région:', region);
  //     const instances = await this.getInstancesByRegion(region);
  //     allInstances.push(instances);
  //   }
  //   return allInstances;
  // }

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
          const cost = await CostExplorerService.getInstance(this.credentials).getInstanceCost(instanceId, {
            startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
            endDate: new Date().toISOString().split('T')[0]
          });

          const instanceInfo = {
            id: instanceId,
            name: this.getInstanceName(instance.Tags) || '',
            status: instance.State.Name === 'running',
            region: instance.Placement.AvailabilityZone.slice(0, -1),
            cost: cost.currentCost,
            currency: cost.currency
          };

          instancesInformation.push(instanceInfo);
        }
      }
    } catch (err) {
      throw new Error('Error fetching instance infos:' + err);
    }
    return instancesInformation;
  }

  async pingEC2(): Promise<{ status: number | undefined; message: string }> {
    try {
      const response = await this.client.send(new DescribeInstancesCommand({}));

      return {
        status: response.$metadata.httpStatusCode,
        message: 'Successful ping to AWS EC2'
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Error reaching AWS EC2'
      };
    }
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
