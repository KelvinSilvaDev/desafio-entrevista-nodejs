import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  goToDocs(): string {
    return 'Bem vindo(a) ao projeto Parking API! Vá para api/v1/docs para ver a documentação.'
  }
}
