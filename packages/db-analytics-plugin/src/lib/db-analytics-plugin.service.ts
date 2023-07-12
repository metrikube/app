import * as mysql from 'mysql2';

import { Injectable } from '@nestjs/common';

import { DbConnectionCredentialType } from '../../../../common/types/credential';

@Injectable()
export class DbAnalyticsPluginService {
  getDataDb(credentialData: DbConnectionCredentialType): Promise<string> {
    return new Promise((resolve, reject) => {
      const dbConfig = {
        host: credentialData.dbHost,
        user: credentialData.dbUsername,
        password: credentialData.dbPassword,
        database: credentialData.dbName,
        port: credentialData.dbPort
      };

      const connection = mysql.createConnection(dbConfig);
      connection.connect((error) => {
        if (error) {
          console.error('Erreur de connexion à la base de données:', error);
          reject(error);
        } else {
          resolve('Connexion réussie !');
        }
        connection.end();
      });
    });
  }
}
