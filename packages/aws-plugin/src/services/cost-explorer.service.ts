import { CostExplorerClient, GetCostAndUsageCommand, GetCostAndUsageCommandInput, Group } from '@aws-sdk/client-cost-explorer';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';

export class CostExplorerService {
  private readonly client: CostExplorerClient;
  constructor(credentials: AwsCredentialIdentityProvider) {
    this.client = new CostExplorerClient({
      region: 'us-east-1',
      credentials: credentials,
    });
  }

  async getCosts(
    params: GetCostAndUsageCommandInput = {
      TimePeriod: {
        // Get the first day of the current month in the format of YYYY-MM (e.g. 2021-01)
        Start: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
        // Get the current date in the format of YYYY-MM-DD (e.g. 2021-01-31)
        End: new Date().toISOString().split('T')[0],
      },
      Granularity: 'MONTHLY',
      Metrics: ['UnblendedCost'],
      GroupBy: [
        { Type: 'DIMENSION', Key: 'SERVICE' },
        { Type: 'DIMENSION', Key: 'REGION' },
      ],
    },
  ) {
    const command = new GetCostAndUsageCommand(params);

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error('Error fetching costs:', error);
      throw error;
    }
  }

  /**
   * Get the total cost for all services
   * @returns
   */
  async getServicesCosts(): Promise<any[]> {
    const params = {
      TimePeriod: {
        Start: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
        End: new Date().toISOString().split('T')[0],
      },
      Granularity: 'MONTHLY',
      Metrics: ['UnblendedCost'],
      GroupBy: [
        {
          Key: 'SERVICE',
          Type: 'DIMENSION',
        },
      ],
    };

    const command = new GetCostAndUsageCommand(params);
    const response = await this.client.send(command);

    if (!response?.ResultsByTime?.[0]?.Groups || response?.ResultsByTime?.[0]?.Groups?.length === 0) {
      return [];
    }

    return response?.ResultsByTime?.[0]?.Groups?.map((group: Group) => {
      const serviceName = group?.Keys?.[0];
      const totalCost = group?.Metrics?.['UnblendedCost']?.Amount;
      const currency = group?.Metrics?.['UnblendedCost']?.Unit;

      return {
        serviceName,
        totalCost,
        currency,
      };
    });
  }

  /**
   * Retrieve instance costs for EC2 instances
   * @param instanceId
   * @param param1
   * @returns
   */
  async getInstanceCost(instanceId: string, { startDate, endDate }: { startDate: string; endDate: string }) {
    try {
      const params: GetCostAndUsageCommandInput = {
        Granularity: 'MONTHLY',
        TimePeriod: {
          Start: startDate,
          End: endDate,
        },
        Filter: {
          Tags: {
            Key: 'InstanceId',
            Values: [instanceId],
          },
        },
        Metrics: ['UnblendedCost'],
      };
      const command = new GetCostAndUsageCommand(params);
      const response = await this.client.send(command);
      const currentCost = response?.ResultsByTime?.[0]?.Total?.['UnblendedCost']?.Amount;
      const currency = response?.ResultsByTime?.[0]?.Total?.['UnblendedCost']?.Unit;
      return {
        currentCost,
        currency,
      };
    } catch (error) {
      console.error('Error fetching instance costs:', error);
      throw error;
    }
  }
}
