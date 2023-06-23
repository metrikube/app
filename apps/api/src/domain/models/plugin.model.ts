export type Plugin = {
  readonly id: string; // UUID
  readonly type: string; // PluginType
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly category: string; // cloud | database | versioning
  readonly widgets: Widget[];
};

export type Widget = {
  readonly id: string; // UUID
  readonly name: string;
  readonly description: string;
  readonly refreshInterval: number; // in seconds
  readonly type: string; // WidgetType
  readonly createdAt: Date;
};

// type WidgetType =
//   | 'aws_bucket_single_instance'
//   | 'aws_bucket_multiple_instances'
//   | 'aws_ec2_multiple_instances_usage'
//   | 'aws_ec2_single_instance_usage'
//   | 'github_last_pr'
//   | 'database_queries'
//   | 'database_size'
//   | 'database_connections'
//   | 'database_slow_queries';
//
// const provider: Plugin = {
//   id: 'P1',
//   type: 'aws',
//   name: 'AWS perso',
//   description: 'AWS plugin',
//   credential: {
//     type: 'apiKey',
//     value: {
//       apiKey: '33c7451e-8e7c-41d9-b522-db7cc8e02124'
//     }
//   },
//   createdAt: new Date(),
//   widgets: [
//     {
//       id: 'W1',
//       providerId: 'P1',
//       type: 'aws_single_instance_cost',
//       name: 'AWS',
//       description: 'Récupérer le cout d\'une instance AWS',
//       refreshInterval: 60,
//       createdAt: new Date(),
//     }
//   ]
// }
//
// const widgetData = {
//   id: 'W1',
//   pluginId: 'P1',
//   type: 'aws_single_instance_cost',
//   name: 'AWS',
//   description: 'Récupérer le cout d\'une instance AWS',
//   data: {
//     id: 'i-0c1f7d7e0e7f3e7f3',
//     name: 'Instance EC2',
//     cost: 0.5,
//     status: 'running'
//   }
// }
//
// const widgetData2 = {
//   id: 'W2',
//   pluginId: 'P1',
//   notifiable: false,
//   type: 'aws_multiple_instances',
//   name: 'AWS',
//   description: 'Récupérer les instances AWS',
//   data: [
//     { id: 'i-0c1f7d7e0e7f3e7f3', name: 'Instance EC2 1', cost: 1000, status: 'running' },
//     { id: 'i-0c1f7d7e0e7f3e7f3', name: 'Instance EC2 2', cost: 223, status: 'stopped' }
//   ]
// }
//
// const alerts = [
//   {
//     id: 'A1',
//     widgetId: 'W1',
//     triggered: false,
//     label: 'Alerte sur le cout d\'une instance AWS',
//     condition: {
//       field: 'cost',
//       operator: '>=',
//       value: 100
//     },
//   },
//   {
//     id: 'A2',
//     widgetId: 'W1',
//     triggered: false,
//     label: 'Alerte sur le cout d\'une instance AWS',
//     condition: {
//       field: 'status',
//       operator: '!=',
//       value: 'running'
//     }
//   }
// ]
