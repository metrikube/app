import { Injectable } from '@nestjs/common';

import { ApiAWSCostExplorerResult, ApiAWSSingleResourceInstanceResult, GenericCredentialType, PluginConnectionInterface } from '@metrikube/common';
import { AWSServiceType, AwsCredentialType } from '@metrikube/common';

import { CostExplorerService } from './cost-explorer.service';
import { EC2Service } from './ec2.service';

@Injectable()
export class AWSService implements PluginConnectionInterface {
  getCostExplorerService(credentials: AwsCredentialType): CostExplorerService {
    return new CostExplorerService(credentials);
  }

  // EC2 Section
  async getEc2Instance(credentials: AwsCredentialType): Promise<any> {
    try {
      const ec2Service = new EC2Service(credentials);
      if (!credentials.resourceId) {
        throw new Error('No resource ID provided');
      }
      return await ec2Service.getInstanceInformations(credentials.resourceId);
    } catch (error) {
      console.error('Error fetching instance infos:', error);
      throw error;
    }
  }

  async getEc2Instances(credentials: AwsCredentialType) {
    try {
      const ec2Service = new EC2Service(credentials);
      return ec2Service.getInstancesInformations();
    } catch (error) {
      console.error('Error fetching instances:', error);
      throw error;
    }
  }

  // async getServicesInformations(
  //   credentials: AwsCredentialType,
  //   services: AWSServiceType[]
  // ): Promise<
  //   | {
  //       costExplorer?: ApiAWSCostExplorerResult[];
  //       ec2?: ApiAWSSingleResourceInstanceResult[];
  //     }
  //   | undefined
  // > {
  //   if (!services) {
  //     return;
  //   }
  //   let infos = {};
  //   if (services.includes('co')) {
  //     const costs = await this.getCostExplorerService(credentials).getServicesCosts();
  //     infos = {
  //       ...infos,
  //       costExplorer: costs
  //     };
  //   }
  //   if (services.includes('ec2')) {
  //     const ec2Infos = await this.getEc2Service(credentials).getInstancesInformations();
  //     infos = {
  //       ...infos,
  //       ec2: ec2Infos
  //     };
  //   }

  //   return infos;
  // }
  async testConnection(): Promise<{ ok: boolean; message: string | null }> {
    return {
      ok: true,
      message: null
    };
  }
}
