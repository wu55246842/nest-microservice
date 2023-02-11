import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceAService {
  getHello(): string {
    return 'I am service A';
  }
}
