import * as AWS from 'aws-sdk';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsClientService {
  protected readonly client: AWS.Service;

  constructor() {
    const accessKeyId = 'ACCESS_KEY';
    const secretAccessKey = 'SECRET_ACCESS_KEY';

    // Configurer le client AWS de base
    AWS.config.update({
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      region: 'eu-central-1' // Remplacez par votre région AWS souhaitée
    });

    // init base client
    this.client = new AWS.Service();
  }
}
