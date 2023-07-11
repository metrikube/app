import { fromIni } from '@aws-sdk/credential-providers';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';

import { Injectable } from '@nestjs/common';

import { AWSServiceType } from '../../../../common/types/aws';
import { CostExplorerService } from './cost-explorer.service';
import { EC2Service } from './ec2.service';

@Injectable()
export class AWSService {
  private readonly credentials: AwsCredentialIdentityProvider;
  private readonly costExplorerService: CostExplorerService;

  constructor() {
    this.credentials = fromIni({ profile: 'personal-account' });
    this.costExplorerService = new CostExplorerService(this.credentials);
  }

  getCostExplorerService(): CostExplorerService {
    return new CostExplorerService(this.credentials);
  }
  getEc2Service(region?: string): EC2Service {
    return new EC2Service(this.credentials, region);
  }

  async getServicesInformations(
    services: AWSServiceType[],
    region = 'us-east-1',
  ): Promise<
    | {
        costExplorer?: any;
        ec2?: any;
      }
    | undefined
  > {
    if (!services) {
      return;
    }
    let infos = {};
    if (services.includes('co')) {
      const costs = await this.costExplorerService.getServicesCosts();
      infos = {
        ...infos,
        costExplorer: costs,
      };
    }
    if (services.includes('ec2')) {
      const ec2Infos = await this.getEc2Service(region).getInstancesInformations();
      infos = {
        ...infos,
        ec2: ec2Infos,
      };
    }

    return infos;
  }
}
