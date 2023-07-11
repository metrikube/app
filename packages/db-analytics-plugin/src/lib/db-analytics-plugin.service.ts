import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2';
import { CredentialEntity } from '../../../../apps/api/src/infrastructure/database/entities/credential.entity';
import { CredentialRepositoryImpl } from '../../../../apps/api/src/infrastructure/database/repositories/credential.repository';
import { CredentialRepository } from '../../../../apps/api/src/domain/interfaces/repository/credential.repository';


@Injectable()
export class DbAnalyticsPluginService {
  constructor(private readonly credentialRepository: CredentialRepositoryImpl) {}

  async getDataDb(): Promise<string> {
    try {
      const credential = await this.credentialRepository.getCredentialsByType('db');
      const credentialValue = await credential;
      //const dbConfig: DbConnectionCredentialType = credentialValue.value;

      const connection = mysql.createConnection({
        host: credentialValue.value.dbHost,
        user: credentialValue.value.dbUsername,
        password: credentialValue.value.dbPassword,
        database: credentialValue.value.dbName,
        multipleStatements: true,
      });

      return new Promise<string>((resolve, reject) => {
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
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de connexion:', error);
      throw new Error('Erreur lors de la récupération des informations de connexion');
      }
    }
  }