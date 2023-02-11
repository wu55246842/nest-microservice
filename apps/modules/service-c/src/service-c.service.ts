import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceCService {
  getHello(): string {
    return 'I am service C';
  }
}
