import { GetBucketLocationCommand, ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';

import { ApiAWSSingleResourceInstanceResult, AwsCredentialType } from '@metrikube/common';

import { CostExplorerService } from './cost-explorer.service';

export class S3Service {
  private readonly client: S3Client;
  private readonly credentials: AwsCredentialType;
  constructor(credentials: AwsCredentialType) {
    this.client = new S3Client({
      region: credentials.region,
      credentials: credentials
    });
    this.credentials = credentials;
  }

  async getSingleBucket(bucketName: string): Promise<ApiAWSSingleResourceInstanceResult> {
    try {
      const { Buckets } = await this.client.send(new ListBucketsCommand({}));
      if (Buckets === undefined) {
        throw new Error('No buckets found');
      }
      const bucket = Buckets.find((bucket) => bucket.Name === bucketName);
      if (!bucket || !bucket.Name) {
        throw new Error('No bucket found');
      }
      const locationParam = {
        Bucket: bucketName
      };

      const { LocationConstraint } = await this.client.send(new GetBucketLocationCommand(locationParam));
      const cost = await CostExplorerService.getInstance(this.credentials).getBucketCosts(
        bucket.Name,
        new Date().toISOString().split('T')[0].slice(0, -2) + '01',
        new Date().toISOString().split('T')[0]
      );
      return {
        id: bucketName,
        name: bucketName,
        region: LocationConstraint,
        cost: cost.currentCost,
        currency: cost.currency,
        additionnalData: {
          creationDate: bucket.CreationDate
        }
      };
    } catch (error) {
      console.error('Error fetching buckets:', error);
      throw error;
    }
  }

  // async getSingleBucket(bucketName: string): Promise<ApiAWSSingleResourceInstanceResult> {
  //   try {
  //     const params = {
  //       Bucket: bucketName
  //     };
  //     const buckets = await this.client.send(new ListBucketsCommand(params));
  //     if (!buckets.Buckets || buckets.Buckets.length === 0) {
  //       throw new Error('No bucket found');
  //     }
  //     const bucket = buckets.Buckets[0];

  //     const cost = await CostExplorerService.getInstance(this.credentials).getBucketCosts(
  //       bucketName,
  //       new Date().toISOString().split('T')[0].slice(0, -2) + '01',
  //       new Date().toISOString().split('T')[0]
  //     );
  //     return {
  //       id: bucketName,
  //       name: bucketName,
  //       cost: cost.currentCost,
  //       currency: cost.currency,
  //       additionnalData: {
  //         creationDate: bucket.CreationDate
  //       }
  //     };
  //   } catch (error) {
  //     console.error('Error fetching bucket:', error);
  //     throw error;
  //   }
  // }

  async getBuckets(): Promise<ApiAWSSingleResourceInstanceResult[]> {
    try {
      const buckets = [];
      const { Buckets } = await this.client.send(new ListBucketsCommand({}));
      if (Buckets === undefined) {
        throw new Error('No buckets found');
      }
      for (const bucket of Buckets) {
        if (!bucket.Name) {
          throw new Error('No bucket name found');
        }
        const cost = await CostExplorerService.getInstance(this.credentials).getBucketCosts(
          bucket.Name,
          new Date().toISOString().split('T')[0].slice(0, -2) + '01',
          new Date().toISOString().split('T')[0]
        );
        buckets.push({
          id: bucket.Name,
          name: bucket.Name,
          cost: cost.currentCost,
          currency: cost.currency,
          additionnalData: {
            creationDate: bucket.CreationDate
          }
        });
      }
      return buckets;
    } catch (error) {
      console.error('Error fetching buckets:', error);
      throw error;
    }
  }

  async pingS3(): Promise<{ status: number | undefined; message: string }> {
    try {
      const response = await this.client.send(new ListBucketsCommand({}));
      return {
        status: response.$metadata.httpStatusCode,
        message: 'Successful ping to AWS EC2'
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Error reaching AWS S3'
      };
    }
  }
}
