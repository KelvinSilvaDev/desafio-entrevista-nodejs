import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicle1705788445396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE \`vehicle\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`licensePlate\` varchar(255) NOT NULL,
          \`type\` varchar(255) NOT NULL,
          \`color\` varchar(255) NOT NULL,
          \`model\` varchar(255) NOT NULL,
          \`brand\` varchar(255) NOT NULL,
          \`cnh\` varchar(255) NOT NULL,
          \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`IDX_78a916df40e02a9deb1c4b75ed\` (\`plate\`)
        ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE \`vehicle\`;
        `);
    }

}
