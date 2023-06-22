import * as AWS from 'aws-sdk';

import { Injectable } from '@nestjs/common';

import { AwsClientService } from './aws-client.service';

@Injectable()
export class EC2Service extends AwsClientService {
  protected override readonly client: AWS.EC2;

  constructor() {
    super();
    // set the region to us-east-1 because cost explorer is global
    AWS.config.update({ region: 'us-east-1' });
    this.client = new AWS.EC2({ apiVersion: '2017-10-25' });
  }

  async getInstances(params: AWS.EC2.DescribeInstancesRequest): Promise<AWS.EC2.DescribeInstancesResult> {
    try {
      return await this.client.describeInstances(params).promise();
    } catch (error) {
      console.error('Error fetching EC2 instances :', error);
      throw error;
    }
  }
}
