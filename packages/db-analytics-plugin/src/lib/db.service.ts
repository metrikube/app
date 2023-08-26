import { ApiEndpointCredentialType, DbConnectionCredentialType, PluginConnectionInterface, DbConnectionType } from '@metrikube/common';

import * as mysql from 'mysql2';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import type { AxiosError } from 'axios';


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

  public async getNbQueriesPerSec(): Promise<any> {
    const query = `
      SELECT ROUND(s1.variable_value / s2.variable_value, 4) AS nbQueriesPerSec
      FROM performance_schema.global_status s1, performance_schema.global_status s2
      WHERE s1.variable_name = 'queries' AND s2.variable_name = 'uptime';
    `;

    const connection = await this.connection();
    try {
      const results = await this.executeQuery(connection, query);
      console.log(results);
      return results[0].nbQueriesPerSec;
      } catch (error) {
      console.error('Error generated during query execution: ', error);
      throw error;
    } finally {
      connection.end();
    }
  }

  public async getDbSizeMb(): Promise<any> {
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

  public async getNbRows(): Promise<any> {

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

  public async getSlowQuery(): Promise<any> {
    const connection = await this.connection();
    const query = `
      SELECT
          MAX_TIMER_WAIT / 1000000000000 AS max_execution_time_seconds,
          AVG_TIMER_WAIT / 1000000000000 AS avg_execution_time_seconds,
          DIGEST_TEXT AS query_text
      FROM
          performance_schema.events_statements_summary_by_digest
      ORDER BY
          max_execution_time_seconds DESC
      LIMIT 1;
    `;

    try {
      const results = await this.executeQuery(connection, query);
      return results[0];
      console.log(results[0])
    } catch (error) {
      console.error('Error executing getDbSizeMb: ', error);
      throw error;
    }
  }
}

