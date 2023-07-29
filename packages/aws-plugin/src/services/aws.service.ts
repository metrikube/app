import { ApiAWSCostExplorerResult, ApiAWSSingleResourceInstanceResult, GenericCredentialType, PluginConnectionInterface } from '@metrikube/common';
import { AWSServiceType, AwsCredentialType } from '@metrikube/common';

import { Injectable } from '@nestjs/common';

import { CostExplorerService } from './cost-explorer.service';
import { EC2Service } from './ec2.service';

@Injectable()
export class AWSService implements PluginConnectionInterface {
  getCostExplorerService(credentials: AwsCredentialType): CostExplorerService {
    return new CostExplorerService(credentials);
  }

  getEc2Service(credentials: AwsCredentialType): EC2Service {
    return new EC2Service(credentials);
  }

  async getServicesInformations(
    credentials: AwsCredentialType,
    services: AWSServiceType[]
  ): Promise<
    | {
        costExplorer?: ApiAWSCostExplorerResult[];
        ec2?: ApiAWSSingleResourceInstanceResult[];
      }
    | undefined
  > {
    if (!services) {
      return;
    }
    let infos = {};
    if (services.includes('co')) {
      const costs = await this.getCostExplorerService(credentials).getServicesCosts();
      infos = {
        ...infos,
        costExplorer: costs
      };
    }
    if (services.includes('ec2')) {
      const ec2Infos = await this.getEc2Service(credentials).getInstancesInformations();
      infos = {
        ...infos,
        ec2: ec2Infos
      };
    }

    return infos;
  }
  testConnection(credential: GenericCredentialType): Promise<{ ok: boolean; message: string | null }> {
    throw new Error('Method not implemented.');
  }
}
