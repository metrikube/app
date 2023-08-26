import { DbConnectionCredentialType, DbConnectionType, ApiDatabaseLastAverageQueriesByHour, ApiDatabaseSlowQueries } from '@metrikube/common';
import * as mysql from 'mysql2';


export class DbService  {
  private readonly credentials: DbConnectionType;
  constructor(credentials: DbConnectionCredentialType) {
    const dbConfig = {
      host: credentials.dbHost,
      user: credentials.dbUsername,
      password: credentials.dbPassword,
      database: credentials.dbName,
      port: credentials.dbPort
    };
    this.credentials = dbConfig;
  }

  async connection(): Promise<mysql.Connection> {
    const connection = mysql.createConnection(this.credentials);
    return connection;
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

  public async getNbQueriesPerSec(): Promise<ApiDatabaseLastAverageQueriesByHour> {
    const query = `
      WITH hours AS (
          SELECT
              DATE_FORMAT(NOW() - INTERVAL (11 - n) HOUR, '%H:00:00') AS hour
          FROM
              (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3
               UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
               UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11) numbers
      )
      SELECT
          h.hour,
          IFNULL(COUNT(*), 0) AS nbRequests
      FROM
          hours h
      LEFT JOIN
          performance_schema.events_statements_summary_by_digest es
          ON DATE_FORMAT(es.FIRST_SEEN, '%H:00:00') = h.hour
          AND es.SCHEMA_NAME NOT IN ('performance_schema', 'information_schema')
          AND es.FIRST_SEEN >= NOW() - INTERVAL 12 HOUR
      GROUP BY
          h.hour
      ORDER BY
          h.hour;
    `;

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
    } finally {
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
      return results[0].dbSizeMb;
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
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
      return results[0].nbRows;
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }

  public async getNbTables(): Promise<number> {

    const connection = await this.connection();
    // TODO because it's 0
    const query = `
      SELECT COUNT(*) AS nbTables
      FROM information_schema.tables
      WHERE table_schema = '${this.credentials.database}';`;
    try {
      const results = await this.executeQuery(connection, query);
      return results[0].nbTables;


    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }

  public async getSlowQuery(): Promise<ApiDatabaseSlowQueries> {
    const connection = await this.connection();
    const query = `
      SELECT
          MAX_TIMER_WAIT / 1000000000000 AS max_execution_time_seconds,
          AVG_TIMER_WAIT / 1000000000000 AS executionTime,
          DIGEST_TEXT AS query
      FROM
          performance_schema.events_statements_summary_by_digest
      ORDER BY
          max_execution_time_seconds DESC
      LIMIT 1;
    `;

    try {
      const results = await this.executeQuery(connection, query);
      return results[0];
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }
}

