import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceBService {
  getHello(): string {
    return 'I am service B';;
  }
}
