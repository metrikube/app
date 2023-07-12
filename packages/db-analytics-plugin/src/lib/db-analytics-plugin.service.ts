import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2';
import { DbConnectionCredentialType } from '../../../../common/types/credential';

@Injectable()
export class DbAnalyticsPluginService {
  async getDataDb(credentialData: DbConnectionCredentialType): Promise<any> {
    const dbConfig = {
      host: credentialData.dbHost,
      user: credentialData.dbUsername,
      password: credentialData.dbPassword,
      database: credentialData.dbName,
      port: credentialData.dbPort,
    };

    const connection = mysql.createConnection(dbConfig);

    return new Promise(async (resolve, reject) => {
      connection.connect(async (error) => {
        if (error) {
          console.error('Error generated during database connection', error);
          reject(error);
        } else {
          try {
            const nbQueriesPerSecQuery = `
              SELECT ROUND(s1.variable_value / s2.variable_value, 4) AS nbQueriesPerSec
              FROM performance_schema.global_status s1, performance_schema.global_status s2
              WHERE s1.variable_name = 'queries' AND s2.variable_name = 'uptime'
            `;

            const tablesDataQuery = `
              SELECT TABLE_NAME as tableName,
              UPDATE_TIME as lastUpdateTime,
              TABLE_ROWS as nbRows
              FROM information_schema.tables
              WHERE table_schema = '${credentialData.dbName}'
              and table_name <> '_dba_query_stats'
            `;

            const avgResponseTime = `
              SELECT ROUND(AVG(AVG_TIMER_WAIT)/ 100000000000,4) AS avgResponseTime
              FROM performance_schema.events_statements_summary_by_digest
              WHERE SCHEMA_NAME = '${credentialData.dbName}'
            `;

            const dbSizeMb = `
            SELECT FORMAT(SUM(data_length + index_length) / (1024 * 1024), 4)
            AS dbSizeMb
            FROM information_schema.tables
            WHERE table_schema = '${credentialData.dbName}'
            GROUP BY table_schema
            `;

            const [nbQueriesPerSecResult, tablesDataResult, avgResponseTimeResult, dbSizeMbResult] = await Promise.all([
              this.executeQuery(connection, nbQueriesPerSecQuery),
              this.executeQuery(connection, tablesDataQuery),
              this.executeQuery(connection, avgResponseTime),
              this.executeQuery(connection, dbSizeMb),
            ]);

            const data = {
              nbQueriesPerSec: nbQueriesPerSecResult[0].nbQueriesPerSec,
              nbQueriesPerHour: nbQueriesPerSecResult[0].nbQueriesPerSec * 3600,
              nbQueriesPerDay: nbQueriesPerSecResult[0].nbQueriesPerSec * 86400,
              tablesData: tablesDataResult,
              avgResponseTime: avgResponseTimeResult[0].avgResponseTime,
              dbSizeMb: dbSizeMbResult[0].dbSizeMb
            };

            resolve(data);
          } catch (err) {
            console.error('Error generated during query execution: ', err);
            reject(err);
          }

          connection.end();
        }
      });
    });
  }

  private executeQuery(connection: mysql.Connection, query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}
