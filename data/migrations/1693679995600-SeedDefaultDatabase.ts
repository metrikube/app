import { randomUUID } from 'crypto';
import { EntityTarget, MigrationInterface, ObjectLiteral, QueryRunner } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AlertEntity } from '../../apps/api/src/infrastructure/database/entities/alert.entity';
import { CredentialEntity } from '../../apps/api/src/infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../apps/api/src/infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../apps/api/src/infrastructure/database/entities/plugin.entity';
import { WidgetEntity } from '../../apps/api/src/infrastructure/database/entities/widget.entity';

export class SeedDefaultDatabase1693679995600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pluginIds = {
      aws: randomUUID(),
      sql: randomUUID(),
      github: randomUUID(),
      apiHealthCheck: randomUUID()
    };

    const metricIds = {
      apiHealthCheck: randomUUID(),
      awsEc2SingleInstanceUsage: randomUUID(),
      awsEc2MultipleInstancesUsage: randomUUID(),
      awsS3SingleBucketUsage: randomUUID(),
      awsS3MultipleBucketsUsage: randomUUID(),
      githubLastIssues: randomUUID(),
      githubLastPRs: randomUUID(),
      sqlDatabaseQueries: randomUUID(),
      sqlDatabaseSlowQueries: randomUUID(),
      sqlDatabaseSize: randomUUID()
    };

    const credentialIds = {
      apiHealthCheck: randomUUID(),
      github: randomUUID()
    };

    const widgetIds = {
      pingApi: randomUUID()
    };

    const plugins = [
      {
        id: pluginIds.aws,
        name: 'AWS',
        type: 'aws',
        description: 'Amazon Web Services Plugin',
        instruction: `
        <h2 id="guide-installation-plugin-aws">Guide installation plugin AWS</h2>
        <h3 id="database-compatible">Activer Cost Explorer</h3>
        <p>Pour utiliser l'API Cost Explorer, vous devez activer l'accès au service Cost Explorer via la console AWS en allant dans le service <strong>"Cost Explorer"</strong></p>
        <h3 id="database-compatible">Créer un utilisateur </h3>
        <p>Vous devez tout d'abord créer un utilisateur<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html">IAM<a/> avec la politique suivante:</p>
        <pre><code class="lang-json">
          {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "ce:*"
                    ],
                    "Resource": [
                        "*"
                    ]
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "ec2:DescribeInstances"
                    ],
                    "Resource": "*"
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListAllMyBuckets",
                        "s3:GetBucketLocation"
                    ],
                    "Resource": "*"
                }
            ]
          }
        </code></pre>
        <p>Remarque: Cela vous permettra d'avoir les accès pour appeler les services AWS (vous pouvez éléver ou non ces déclarations, ici nous sommes en lecture et liste).</p>
        <h3 id="creation-des-credentials">Création des identifiants</h3>
        <p>Une fois votre utilisateur IAM créé, il faudra <a href="https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html">récupérer vos clefs d'accès</a>.</p>
        <p>Une fois les clefs récupérées, copiez vos deux clefs d'accès et copiez les dans la configuration du plugin</p>
		    <p>Format de valeurs du json:</p>
        <pre><code class="lang-json">
          {
              <span class="hljs-attr">"accessKeyId"</span>: <span class="hljs-string">"AKIAIOSFODNN7EXAMPLE"</span>,
              <span class="hljs-attr">"secretAccessKey"</span>: <span class="hljs-string">"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"</span>,
              <span class="hljs-attr">"region"</span>: <span class="hljs-string">"eu-west-2"</span>,
          }
        </code></pre>
        `,
        category: 'cloud',
        credentialType: 'aws',
        iconUrl: ''
      },
      {
        id: pluginIds.sql,
        name: 'SQL Database',
        type: 'sql_database',
        description: 'SQL Database Plugin',
        instruction: `
        <h2 id="guide-installation-plugin-db">Guide installation plugin Db</h2>
        <h3 id="database-compatible">Database compatible</h3>
        <ul>
        <li>Mysql</li>
        <li>Mariadb</li>
        </ul>
        <h2 id="lignes-executer-sur-votre-base-de-donn-es">Lignes à executer sur votre base de données</h2>
        <h3 id="cr-er-utilisateur">Créer utilisateur</h3>
        <p>Vous devez ouvrir un shell mysql avec votre utilisateur root ou équivalent.</p>
        <p>Vous devez créer un utilisateur avec des accès en lecture seule.
        Il faut ajouter les accès pour cette table, avec ces commandes:</p>
        <pre><code class="lang-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">USER</span> <span class="hljs-string">'metrikube_user'</span> <span class="hljs-keyword">IDENTIFIED</span> <span class="hljs-keyword">BY</span> <span class="hljs-string">'metrikube_pwd'</span>
        <span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">ON</span> <span class="hljs-keyword">ON</span> mysql.general_log <span class="hljs-keyword">TO</span> <span class="hljs-string">'metrikube_user'</span>;
        <span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">ON</span> mysql.general_log <span class="hljs-keyword">TO</span> <span class="hljs-string">'metrikube_user'</span>;
        <span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">ON</span> performance_schema.* <span class="hljs-keyword">TO</span> <span class="hljs-string">'metrikube_user'</span>;
        <span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">ON</span> informations_schema.* <span class="hljs-keyword">TO</span> <span class="hljs-string">'metrikube_user'</span>;
        <span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">ON</span> &lt;nom_de_votre_db&gt; <span class="hljs-keyword">TO</span> <span class="hljs-string">'metrikube_user'</span>;
        <span class="hljs-keyword">GRANT</span> PROCESS <span class="hljs-keyword">ON</span> *.* <span class="hljs-keyword">TO</span> <span class="hljs-string">'metrikube_user'</span>;
        <span class="hljs-keyword">FLUSH</span> <span class="hljs-keyword">PRIVILEGES</span>;
        </code></pre>
        <h3 id="activer-les-tables-n-cessaires">Activer les tables nécessaires</h3>
        <p>Ensuite il faut regarder les tables qui sont actives dans
        <code>performance_schema</code>.</p>
        <pre><code class="lang-sql"><span class="hljs-keyword">select</span> * <span class="hljs-keyword">from</span> performance_schema.setup_consumers <span class="hljs-keyword">where</span> <span class="hljs-keyword">name</span> <span class="hljs-keyword">like</span> <span class="hljs-string">'events%statement%'</span>;
        </code></pre>
        <p>Si dans la colonne <code>ENABLED</code> vous avez des valeurs qui ne sont pas <code>YES</code> ou vrai. Vous devez les activer avec la commande:</p>
        <pre><code class="lang-sql"><span class="hljs-keyword">UPDATE</span>  performance_schema.setup_consumers  <span class="hljs-keyword">SET</span> ENABLED = <span class="hljs-string">'YES'</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">NAME</span>=<span class="hljs-string">'events_statements_history_long'</span> ;
        </code></pre>
        <p>Dans cet exemeple on active la table: <code>events_statements_history_long</code> mais il faut le faire avec vos table non activées.</p>
        <h3 id="modifier-le-fichier-de-configuration">Modifier le fichier de configuration</h3>
        <p>Ensuite il faut modifier le fichier de conf. Généralement il s&#39;appelle <code>my.cnf</code>. Vous devez ajouter ces lignes:</p>
        <pre><code class="lang-sql"><span class="hljs-attr">general_log</span> = <span class="hljs-literal">ON</span>
        <span class="hljs-attr">log_output</span> = TABLE
        </code></pre>
        <h3 id="creation-des-credentials-depuis-le-dashboard">Creation des credentials depuis le dashboard</h3>
        <p>Les valeurs de connexion attendus sont sous ce format-ci:</p>
        <p>Format de valeurs du json</p>
        <pre><code class="lang-json">{
            <span class="hljs-attr">"dbName"</span>: <span class="hljs-string">"str"</span>,
            <span class="hljs-attr">"dbUser"</span>: <span class="hljs-string">"str"</span>,
            <span class="hljs-attr">"dbPassword"</span>: <span class="hljs-string">"str"</span>,
            <span class="hljs-attr">"dbPort"</span>: <span class="hljs-string">"str"</span>,
            <span class="hljs-attr">"dbHost"</span>: <span class="hljs-number">3306</span>
        }
        </code></pre>
        <h3 id="description-des-donn-es">Description des données</h3>
        <p><strong>Le graphiques nombres de requêtes par heure:</strong></p>
        <ul>
        <li>Il contient le nombre de requêtes executés sur la base de données de ces 12 dernières heures </li>
        </ul>
        <p><strong>Les requetes les plus lentes:</strong></p>
        <ul>
        <li>Ce sont les requêtes qui ont été executés sur la base de données au moins une fois. Avec la datetime de la dernière execution, la requête sql, le temps moyen d&#39;execution et le temps maximum d&#39;execution</li>
        </ul>
        <p><strong>La taille de la base de donnée:</strong></p>
        <ul>
        <li>La taille de la bdd en mégabits </li>
        <li>Le nombre de table dans la base </li>
        <li>Le nombre d&#39;enregistrement dans la base</li>
        </ul>
        `,
        category: 'db',
        credentialType: 'dbConnection'
      },
      {
        id: pluginIds.github,
        name: 'Github',
        type: 'github',
        description: 'Github Plugin',
        instruction: `<h1>Github Plugin</h1>
        <p>Grace a ce plugin vous pourrez récuperer les dernières issues et pull requests de vos repositories Github.</p>
        <h2>Configuration</h2>
        <p>Pour pouvoir utiliser ce plugin vous devrez créer un token d&#39;accès dans votre compte Github. Vous pouvez le créer <a href="https://github.com/settings/personal-access-tokens/new">ici</a>.<br>Nous vous recommandons d&#39;utiliser les <cite>fine-grained tokens</cite>, car comme son nom l&#39;indique, vous pouvez donner au token seulement les permissions dont vous avez besoin.<br>Pour récuperer les dernières issues, vous devrez donner au token la permission <cite>Issues</cite> en lecture seule.<br>Pareil pour les dernières pull requests, vous devrez donner au token la permission <cite>Pull requests</cite> en lecture seule.</p>`,
        category: 'versionning',
        credentialType: 'github',
        iconUrl: ''
      },
      {
        id: pluginIds.apiHealthCheck,
        name: 'API Health Check',
        type: 'api_endpoint',
        description: 'API Health Check Plugin',
        instruction:
          "<p><strong>Installation plugin API :</strong></p> <ol> <li>Sur votre API mettez à disposition un endpoint API accesssible en [GET] sur la route de votre choix.</li> <li>Assurez-vous que votre API soit acessible sans authentification, ou alors que vous ayez un token d'autorisation à fournir dans le les paramètres de votre requête (ex: https://monapi.com/api/v1/endpoint?token=123456789).</li> <li>Enfin, assurez-vous que votre endpoint retourne un code HTTP de réponses de succès (200 - 299)</li> </ol>",
        category: 'api',
        credentialType: 'apiEndpoint',
        iconUrl: ''
      }
    ];
    const metrics = [
      {
        id: metricIds.apiHealthCheck,
        type: 'api-endpoint-health-check',
        name: 'Ping Api',
        pluginId: pluginIds.apiHealthCheck,
        isNotifiable: true
      },
      {
        id: metricIds.awsEc2SingleInstanceUsage,
        type: 'aws-ec2-single-instance-usage',
        name: 'AWS EC2 instance cost',
        pluginId: pluginIds.aws,
        isNotifiable: true
      },
      {
        id: metricIds.awsEc2MultipleInstancesUsage,
        type: 'aws-ec2-multiple-instances-usage',
        name: 'AWS EC2 multiple instances cost',
        pluginId: pluginIds.aws,
        isNotifiable: false
      },
      {
        id: metricIds.awsS3SingleBucketUsage,
        type: 'aws-bucket-single-instance',
        name: 'AWS Bucket single instance cost',
        pluginId: pluginIds.aws,
        isNotifiable: false
      },
      {
        id: metricIds.awsS3MultipleBucketsUsage,
        type: 'aws-bucket-multiple-instances',
        name: 'AWS Bucket multiple instances cost',
        pluginId: pluginIds.aws,
        isNotifiable: false
      },
      {
        id: metricIds.githubLastIssues,
        type: 'github-last-issues',
        name: 'Github last issues',
        pluginId: pluginIds.github,
        isNotifiable: false
      },
      {
        id: metricIds.githubLastPRs,
        type: 'github-last-prs',
        name: 'Github last PRs',
        pluginId: pluginIds.github,
        isNotifiable: false
      },
      {
        id: metricIds.sqlDatabaseQueries,
        type: 'database-queries',
        name: 'SQL Database Usage',
        pluginId: pluginIds.sql,
        isNotifiable: false
      },
      {
        id: metricIds.sqlDatabaseSlowQueries,
        type: 'database-slow-queries',
        name: 'SQL Database Slow Queries',
        pluginId: pluginIds.sql,
        isNotifiable: false
      },
      {
        id: metricIds.sqlDatabaseSize,
        type: 'database-size',
        name: 'SQL Database Size',
        pluginId: pluginIds.sql,
        isNotifiable: false
      }
    ];
    const credentials = [
      {
        id: credentialIds.apiHealthCheck,
        pluginId: pluginIds.apiHealthCheck,
        type: 'apiEndpoint',
        value:
          'eyJpdiI6IjViMWQ0NWRiNGYyZmY4NGZiOGU5ZjZlOGQ4NTY2NTk3IiwiZW5jcnlwdGVkRGF0YSI6ImY5OGU5NzRlYWNmMWE1MWM0Yjg5MmEwNmM4NTBhYTEzNTA1Y2IyOTEwOWY5YTUyNmVlMjk5OTdhYmQ0ZTk4OTQ5MTA5OTNkMzM2Y2ViMmZhZjZhZjZmM2RkMDNiMjczODY5MTNlNWY2NjkxZGEzM2YxZjEwYjU1OSJ9'
      },
      {
        id: credentialIds.github,
        pluginId: pluginIds.github,
        type: 'github',
        value: ''
      }
    ];
    const widgets = [
      {
        id: widgetIds.pingApi,
        pluginId: pluginIds.apiHealthCheck,
        metricId: metricIds.apiHealthCheck,
        credentialId: credentialIds.apiHealthCheck,
        isActive: true,
        resourceId: '',
        name: "Ping l'api jsonplaceholder",
        description: null
      }
    ];
    const alerts = [
      {
        id: '5607a60c-1dc9-455e-817a-59c3f82a176b',
        widgetId: widgetIds.pingApi,
        label: 'API Response Time > 50ms',
        triggered: false,
        triggeredAt: null,
        isActive: true,
        condition: {
          field: 'value',
          operator: 'gte',
          threshold: 50
        }
      }
    ];

    await this.execute(queryRunner, PluginEntity, plugins);
    await this.execute(queryRunner, MetricEntity, metrics);
    await this.execute(queryRunner, CredentialEntity, credentials);
    await this.execute(queryRunner, WidgetEntity, widgets);
    await this.execute(queryRunner, AlertEntity, alerts);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM alert WHERE id');
    await queryRunner.query('DELETE FROM credential WHERE id');
    await queryRunner.query('DELETE FROM widget WHERE id');
    await queryRunner.query('DELETE FROM metric WHERE id');
    await queryRunner.query('DELETE FROM plugin WHERE id');
  }

  execute(queryRunner: QueryRunner, entity: EntityTarget<ObjectLiteral>, values: QueryDeepPartialEntity<ObjectLiteral> | QueryDeepPartialEntity<ObjectLiteral>[]): Promise<unknown> {
    return queryRunner.manager.createQueryBuilder().insert().into(entity).values(values).execute();
  }
}
