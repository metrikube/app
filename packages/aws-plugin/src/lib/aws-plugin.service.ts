import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsPluginService {
  getData() {
    return { message: 'Welcome to aws-plugin!' };
  }
}
