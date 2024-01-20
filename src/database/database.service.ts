import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, getConnectionOptions, createConnection } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
    constructor(private connection: Connection) { }

    async onModuleInit() {
        const connectionOptions = this.connection.options;

        // Cria uma conexão temporária sem selecionar um banco de dados
        const tempConnection = await createConnection({ ...connectionOptions, database: undefined, synchronize: false });

        // Verifica se o banco de dados existe
        const result = await tempConnection.query(`SHOW DATABASES LIKE '${connectionOptions.database}';`);

        if (result.length === 0) {
            // Se o banco de dados não existir, cria-o
            await tempConnection.query(`CREATE DATABASE \`${connectionOptions.database}\`;`);
        }

        await tempConnection.close();
    }
}
