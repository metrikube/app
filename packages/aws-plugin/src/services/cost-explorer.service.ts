// export class CostExplorerService {
//   protected readonly client: AWS.CostExplorer;
//   constructor() {
//     // set the region to us-east-1 because cost explorer is global
//     this.client = new AWS.CostExplorer({ region: 'us-east-1', apiVersion: '2017-10-25' });
//   }
//   async formatCosts(costs: AWS.CostExplorer.GetCostAndUsageResponse): Promise<{ [service: string]: number }> {
//     const results: { [service: string]: number } = {};
//     if (costs.ResultsByTime && costs.ResultsByTime.length > 0) {
//       const firstResult = costs.ResultsByTime[0];
//       if (firstResult.Groups && firstResult.Groups.length > 0) {
//         const serviceGroup = firstResult.Groups[0];
//         const metrics = serviceGroup.Metrics;
//         for (const metricKey in metrics) {
//           if (Object.prototype.hasOwnProperty.call(metrics, metricKey)) {
//             const metricValue = metrics[metricKey].Amount;
//             if (typeof metricValue === 'string') {
//               const parsedValue = parseFloat(metricValue);
//               if (!isNaN(parsedValue)) {
//                 results[metricKey] = parsedValue;
//               }
//             }
//           }
//         }
//       }
//     }
//     return results;
//   }
//   async getCosts(params: ICostExplorerParams): Promise<AWS.CostExplorer.GetCostAndUsageResponse> {
//     try {
//       const currentDateTime = new Date();
//       const currentDay = currentDateTime.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 });
//       const currentMonth = (currentDateTime.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 });
//       const currentYear = currentDateTime.getFullYear();
//       const defaultTimePeriod = {
//         Start: `${currentYear}-${currentMonth}-01`,
//         End: `${currentYear}-${currentMonth}-${currentDay}`,
//       };
//       console.log('defaultTimePeriod :', defaultTimePeriod);
//       const costExplorerParams: AWS.CostExplorer.GetCostAndUsageRequest = {
//         TimePeriod: params?.timePeriod ? params.timePeriod : defaultTimePeriod,
//         Metrics: params?.metrics ? params.metrics : ['BlendedCost', 'UsageQuantity'],
//         Granularity: 'MONTHLY',
//         GroupBy: [
//           { Type: 'DIMENSION', Key: 'SERVICE' },
//           { Type: 'DIMENSION', Key: 'REGION' },
//         ],
//       };
//       const costs = await this.client.getCostAndUsage(costExplorerParams).promise();
//       const formattedCosts = await this.formatCosts(costs);
//       console.log('formattedCosts :', formattedCosts);
//       return costs;
//     } catch (error) {
//       console.error('Error fetching costs :', error);
//       throw error;
//     }
//   }
// }
import { CostExplorerClient, GetCostAndUsageCommand, GetCostAndUsageCommandInput } from '@aws-sdk/client-cost-explorer';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';

export class CostExplorerService {
  private readonly client: CostExplorerClient;
  constructor(credentials: AwsCredentialIdentityProvider) {
    this.client = new CostExplorerClient({
      region: 'us-east-1',
      credentials: credentials
    });
  }
  async getCosts(
    params: GetCostAndUsageCommandInput = {
      TimePeriod: {
        Start: '2023-06-01',
        End: '2023-06-30'
      },
      Granularity: 'MONTHLY',
      Metrics: ['BlendedCost'],
      GroupBy: [
        { Type: 'DIMENSION', Key: 'SERVICE' },
        { Type: 'DIMENSION', Key: 'REGION' }
      ]
    }
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
}
