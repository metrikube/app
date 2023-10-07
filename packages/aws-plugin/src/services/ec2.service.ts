import { DescribeInstancesCommand, DescribeInstancesCommandInput, EC2Client, Tag } from '@aws-sdk/client-ec2';

import { ApiAWSSingleResourceInstanceResult, AwsCredentialType } from '@metrikube/common';

import { InvalidInstanceException } from '../../../../apps/api/src/domain/exceptions/invalid-instance.exception';
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

  async getInstanceInformations(instanceId: string): Promise<ApiAWSSingleResourceInstanceResult> {
    try {
      const params = {
        InstanceIds: [instanceId]
      };
      const res = await this.client.send(new DescribeInstancesCommand(params));
      if (!res.Reservations || res.Reservations.length === 0 || !res.Reservations[0].Instances || res.Reservations[0].Instances.length === 0) {
        throw new InvalidInstanceException(new Error('No instance found'));
      }
      const instanceFound = res.Reservations[0].Instances[0];
      const cost = await CostExplorerService.getInstance(this.credentials).getInstanceCost(instanceId, {
        startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
        endDate: new Date().toISOString().split('T')[0]
      });

      return {
        id: instanceId,
        name: instanceFound.Tags?.find((tag) => tag.Key === 'Name')?.Value || '',
        status: instanceFound.State?.Name,
        region: instanceFound.Placement?.AvailabilityZone?.slice(0, -1) || '',
        cost: cost.currentCost,
        currency: cost.currency
      };
    } catch (err) {
      throw new InvalidInstanceException(err);
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
        throw new InvalidInstanceException(new Error('No reservations found'));
      }

      for (const reservation of response.Reservations) {
        if (!reservation.Instances || reservation.Instances.length === 0) {
          throw new InvalidInstanceException(new Error('No instance found'));
        }
        for (const instance of reservation.Instances) {
          const instanceId = instance.InstanceId;
          if (!instanceId || !instance.Placement || !instance.State || !instance.Placement.AvailabilityZone) {
            throw new InvalidInstanceException(new Error('No instance id, region or state found'));
          }
          const cost = await CostExplorerService.getInstance(this.credentials).getInstanceCost(instanceId, {
            startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
            endDate: new Date().toISOString().split('T')[0]
          });

          const instanceInfo = {
            id: instanceId,
            name: this.getInstanceName(instance.Tags || []) || instanceId,
            status: instance.State.Name,
            region: instance.Placement.AvailabilityZone.slice(0, -1),
            cost: cost.currentCost,
            currency: cost.currency
          };

          instancesInformation.push(instanceInfo);
        }
      }
      return instancesInformation;
    } catch (err) {
      throw new InvalidInstanceException(err);
    }
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
