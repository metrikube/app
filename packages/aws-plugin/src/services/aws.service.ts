import { Injectable } from '@nestjs/common';

import { ApiAWSSingleResourceInstanceResult, PluginConnectionInterface } from '@metrikube/common';
import { AwsCredentialType } from '@metrikube/common';

import { EC2Service } from './ec2.service';
import { S3Service } from './s3.service';

@Injectable()
export class AWSService implements PluginConnectionInterface {
  // EC2 Section
  async getEc2Instance(credentials: AwsCredentialType) {
    try {
      if (!credentials.resourceId) {
        throw new Error('No resource ID provided');
      }
      const ec2Service = new EC2Service(credentials);
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

  // S3 Section
  async getS3Bucket(credentials: AwsCredentialType): Promise<ApiAWSSingleResourceInstanceResult> {
    try {
      console.log('credentials', credentials);
      if (!credentials.resourceId) {
        throw new Error('No resource ID provided');
      }
      const s3Service = new S3Service(credentials);
      return s3Service.getSingleBucket(credentials.resourceId);
    } catch (error) {
      console.error('Error fetching instances:', error);
      throw error;
    }
  }

  async getS3Buckets(credentials: AwsCredentialType) {
    try {
      const s3Service = new S3Service(credentials);
      return s3Service.getBuckets();
    } catch (error) {
      console.error('Error fetching instances:', error);
      throw error;
    }
  }

  async testConnection(): Promise<{ ok: boolean; message: string | null }> {
    return {
      ok: true,
      message: null
    };
  }
}
