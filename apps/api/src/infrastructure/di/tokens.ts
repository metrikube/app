export class DiTokens {
  /**
   * Application use cases
   */
  static readonly PluginUseCaseToken = 'PLUGIN_USE_CASE' as const;
  static readonly CredentialUseCaseToken = 'CREDENTIAL_USE_CASE' as const;
  static readonly AlertUseCaseToken = 'ALERT_USE_CASE' as const;
  static readonly DashboardUseCaseToken = 'DASHBOARD_USE_CASE' as const;
  static readonly MetricUseCaseToken = 'METRIC_USE_CASE' as const;

  /**
   * Repositories
   */
  static readonly PluginRepositoryToken = 'PLUGIN_REPOSITORY' as const;
  static readonly CredentialRepositoryToken = 'CREDENTIAL_REPOSITORY' as const;
  static readonly AlertRepositoryToken = 'ALERT_REPOSITORY' as const;
  static readonly MetricRepositoryToken = 'METRIC_REPOSITORY' as const;
  static readonly PluginToMetricRepositoryToken = 'PLUGIN_TO_METRIC_REPOSITORY' as const;

  /**
   * Plugins
   */
  static readonly ApiMonitoringToken = 'API_MONITORING' as const;
  static readonly GithubServiceToken = 'GITHUB_PLUGIN' as const;
  static readonly AWSServiceToken = 'AWS_PLUGIN' as const;
  static readonly DbAnalyticsPluginServiceToken = 'DB_ANALYTICS_PLUGIN' as const;

  /**
   * Infrastructure services
   */
  static readonly Mailer = 'MAILER' as const;
  static readonly Scheduler = 'SCHEDULER' as const;
}
