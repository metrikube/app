import * as mysql from 'mysql2';

import { ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSlowQueries, DbConnectionCredentialType, DbConnectionType } from '@metrikube/common';

type SlowQueriesType = {
  query: string;
  executionTime: string;
  date: string;
}



export class DbService {
  private readonly credentials: DbConnectionType;
  constructor(credentials: DbConnectionCredentialType) {
    this.credentials = {
      host: credentials.dbHost,
      user: credentials.dbUsername,
      password: credentials.dbPassword,
      database: credentials.dbName,
      port: credentials.dbPort
    };
  }

  connection(): mysql.Connection {
    return mysql.createConnection(this.credentials);
  }

  public executeQuery(connection: mysql.Connection, query: string): Promise<any> {
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

  public async getNbQueries(): Promise<ApiDatabaseLastAverageQueriesByHour> {

    const query = `
    WITH hours AS (SELECT DATE_FORMAT(NOW() - INTERVAL n HOUR, '%Y-%m-%d %H:00:00') AS hour
    FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3
     UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
     UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11) numbers),
     schema_requests AS (SELECT
     DATE_FORMAT(es.EVENT_TIME, '%Y-%m-%d %H:00:00') AS hour,
     COUNT(*) AS nbRequests FROM  mysql.general_log es
     LEFT JOIN information_schema.processlist p
     ON es.THREAD_ID = p.ID
     WHERE es.EVENT_TIME >= NOW() - INTERVAL 12 HOUR
     AND p.USER <> '${this.credentials.user}'
     GROUP BY hour)
     SELECT h.hour,
     IFNULL(sr.nbRequests, 0) AS nbRequests  FROM hours h
     LEFT JOIN schema_requests sr
     ON h.hour = sr.hour
     WHERE h.hour >= DATE_FORMAT(NOW() - INTERVAL 12 HOUR, '%Y-%m-%d %H:00:00')           AND h.hour <= DATE_FORMAT(NOW(), '%Y-%m-%d %H:00:00')
     ORDER BY h.hour;`;

    const connection = await this.connection();
    try {
      const results = await this.executeQuery(connection, query);
      const currentDate = new Date();
      return {
        queries: results,
        date: currentDate.toISOString()
      };
    } catch (error) {
      console.error('Error generated during query execution: ', error);
      throw error;
    }  finally {
      connection.end();
    }
  }

  public async getDbSizeMb(): Promise<number> {
    const connection = await this.connection();
    const query = `
      SELECT FORMAT(SUM(data_length + index_length) / (1024 * 1024), 4) AS dbSizeMb
      FROM information_schema.tables
      WHERE table_schema = '${this.credentials.database}'
      GROUP BY table_schema
    `;

    try {
      const results = await this.executeQuery(connection, query);
      return parseFloat(results[0].dbSizeMb);
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    } finally {
      connection.end();
    }
  }

  public async getNbRows(): Promise<number> {
    const connection = await this.connection();
    const query = `
      SELECT SUM(TABLE_ROWS) as nbRows
      FROM information_schema.tables
      WHERE table_schema = '${this.credentials.database}'
      and table_name <> '_dba_query_stats';
    `;
    try {
      const results = await this.executeQuery(connection, query);
      return parseInt(results[0].nbRows, 10);
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    } finally {
      connection.end();
    }
  }

  public async getNbTables(): Promise<number> {
    const connection = await this.connection();
    const query = `
      SELECT COUNT(*) AS nbTables
      FROM information_schema.tables
      WHERE table_schema = '${this.credentials.database}';`;
    try {
      const results = await this.executeQuery(connection, query);
      return parseInt(results[0].nbTables, 10);
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    } finally {
      connection.end();
    }
  }

  public async getSlowQuery(): Promise<SlowQueriesType[]> {
    const connection = await this.connection();
    const query = `
      SELECT AVG_TIMER_WAIT / 1000000000000 AS executionTime,
      DIGEST_TEXT AS query, LAST_SEEN AS date
      FROM performance_schema.events_statements_summary_by_digest
      WHERE SCHEMA_NAME = '${this.credentials.database}'
      ORDER BY executionTime DESC LIMIT 10;
    `;

    try {
      return this.executeQuery(connection, query);
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }  finally {
      connection.end();
    }
  }
}


