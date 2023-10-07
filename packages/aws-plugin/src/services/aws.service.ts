import { Injectable, Logger } from '@nestjs/common';

import { ApiAWSSingleResourceInstanceResult, AwsCredentialType, GenericPluginError, MetricType, PluginConnectionInterface, PluginResult } from '@metrikube/common';

import { InvalidCredentialException } from '../../../../apps/api/src/domain/exceptions/invalid-credential.exception';
import { EC2Service } from './ec2.service';
import { S3Service } from './s3.service';

@Injectable()
export class AWSService implements PluginConnectionInterface {
  // EC2 Section
  async getEc2Instance(credentials: AwsCredentialType) {
    try {
      if (!credentials.resourceId) {
        console.error('No resource ID provided');
        throw new InvalidCredentialException(new Error('No resource ID provided'));
      }
      const ec2Service = new EC2Service(credentials);
      const instance = await ec2Service.getInstanceInformations(credentials.resourceId);
      return instance;
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message
      };
    }
  }

  async getEc2Instances(credentials: AwsCredentialType) {
    try {
      const ec2Service = new EC2Service(credentials);
      const instances = await ec2Service.getInstancesInformations();
      return instances;
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message
      };
    }
  }

  // S3 Section
  async getS3Bucket(credentials: AwsCredentialType) {
    try {
      if (!credentials.resourceId) {
        console.error('No resource ID provided');
        throw new InvalidCredentialException(new Error('No resource ID provided'));
      }
      const s3Service = new S3Service(credentials);
      return s3Service.getSingleBucket(credentials.resourceId);
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message
      };
    }
  }

  async getS3Buckets(credentials: AwsCredentialType): Promise<ApiAWSSingleResourceInstanceResult[] | GenericPluginError> {
    try {
      const s3Service = new S3Service(credentials);
      return s3Service.getBuckets();
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message
      };
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
      return {
        ok: false,
        message: (error as Error).message || 'Error while pinging AWS'
      };
    }
  }

  describe(type: MetricType): string[] {
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
