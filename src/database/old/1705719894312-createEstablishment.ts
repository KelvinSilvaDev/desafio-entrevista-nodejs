import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEstablishment1705719894312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`establishment\` (
              \`id\` int NOT NULL AUTO_INCREMENT,
              \`name\` varchar(500) NOT NULL,
              \`cnpj\` varchar(20) NOT NULL,
              \`address\` varchar(500) NOT NULL,
              \`phone\` varchar(20) NOT NULL,
              \`motorcycleSpaces\` int NOT NULL,
              \`carSpaces\` int NOT NULL,
              \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
              \`occupiedCarSpaces\` int NOT NULL DEFAULT '0',
              \`occupiedMotorcycleSpaces\` int NOT NULL DEFAULT '0',
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE establishment;
        `);
    }

}
