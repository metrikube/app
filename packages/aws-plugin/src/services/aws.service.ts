// import * as AWS from 'aws-sdk';
import { fromIni } from '@aws-sdk/credential-providers';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';

import { Injectable } from '@nestjs/common';

import { CostExplorerService } from './cost-explorer.service';
import { EC2Service } from './ec2.service';

@Injectable()
export class AWSService {
  private readonly credentials: AwsCredentialIdentityProvider;

  constructor() {
    this.credentials = fromIni({ profile: 'personal-account' });
  }

  getCostExplorerService(): CostExplorerService {
    return new CostExplorerService(this.credentials);
  }
  getEc2Service(region: string): EC2Service {
    return new EC2Service(this.credentials, region);
  }
}
