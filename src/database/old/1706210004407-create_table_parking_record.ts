import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableParkingRecord1706210004407 implements MigrationInterface {

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE \`parking_record\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`vehicleId\` int NOT NULL,
          \`establishmentId\` int NOT NULL,
          \`entryTime\` datetime NOT NULL,
          \`exitTime\` datetime NULL,
          PRIMARY KEY (\`id\`),
          CONSTRAINT \`FK_5d1d2a3e7a8d5b4f4d8e1e1a7d6\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
          CONSTRAINT \`FK_3e8b9b2c0e0d9c2b0a1f5e3b3e3\` FOREIGN KEY (\`establishmentId\`) REFERENCES \`establishment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE \`parking_record\`;
        `);
    }

}
