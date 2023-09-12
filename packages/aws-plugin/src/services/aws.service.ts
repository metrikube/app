import { Injectable, Logger } from '@nestjs/common';

import { ApiAWSSingleResourceInstanceResult, AwsCredentialType, MetricType, PluginConnectionInterface, PluginResult } from '@metrikube/common';

import { InvalidCredentialException } from '../../../../apps/api/src/domain/exceptions/invalid-credential.exception';
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

  async testConnection(credentials: AwsCredentialType): Promise<{ ok: boolean; message: string | null }> {
    Logger.log(`🏓 Pinging AWS on region"${credentials.region}`);
    try {
      const ec2Service = new EC2Service(credentials);
      const ec2Ping = await ec2Service.pingEC2();
      const s3Service = new S3Service(credentials);
      const s3Ping = await s3Service.pingS3();

      return {
        ok: true,
        message: `${ec2Ping.message} and ${s3Ping.message}}`
      };
    } catch (error) {
      Logger.log(`🏓 Pinging AWS on region"${credentials.region}" failed`);
      throw new InvalidCredentialException(error);
    }
  }

  describe(
    type: MetricType
  ): (
    | keyof PluginResult<'aws-ec2-multiple-instances-usage'>[number]
    | keyof PluginResult<'aws-ec2-single-instance-usage'>
    | keyof PluginResult<'aws-bucket-single-instance'>
    | keyof PluginResult<'aws-bucket-multiple-instances'>[number]
  )[] {
    switch (type) {
      case 'aws-ec2-single-instance-usage':
      case 'aws-ec2-multiple-instances-usage':
        return ['cost', 'status'];
      case 'aws-bucket-single-instance':
      case 'aws-bucket-multiple-instances':
        return ['cost', 'status'];
      default:
        return [];
    }
  }
}
