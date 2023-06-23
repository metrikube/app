import { DescribeInstancesCommand, DescribeInstancesCommandInput, EC2Client } from '@aws-sdk/client-ec2';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';

export class EC2Service {
  private readonly client: EC2Client;

  constructor(credentials: AwsCredentialIdentityProvider, region: string) {
    this.client = new EC2Client({
      region: region,
      credentials: credentials
    });
  }

  async getInstances(
    params: DescribeInstancesCommandInput = {
      Filters: [
        {
          Name: 'instance-state-name',
          Values: ['running']
        }
      ]
    }
  ): Promise<any> {
    try {
      const data = await this.client.send(new DescribeInstancesCommand(params));
      return data;
    } catch (error) {
      console.error('Error fetching EC2 instances :', error);
      throw error;
    }
  }
}
