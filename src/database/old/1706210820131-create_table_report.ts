import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableReport1706210820131 implements MigrationInterface {

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE \`report\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`totalCarSpaces\` int NULL,
          \`totalMotorcycleSpaces\` int NULL,
          \`totalCarEntries\` int NULL,
          \`totalMotorcycleEntries\` int NULL,
          \`totalCarExits\` int NULL,
          \`totalMotorcycleExits\` int NULL,
          \`totalCarEntriesPerHour\` int NULL,
          \`totalMotorcycleEntriesPerHour\` int NULL,
          \`totalCarExitsPerHour\` int NULL,
          \`totalMotorcycleExitsPerHour\` int NULL,
          \`totalCarEntriesPerDay\` int NULL,
          \`totalMotorcycleEntriesPerDay\` int NULL,
          \`totalCarExitsPerDay\` int NULL,
          \`totalMotorcycleExitsPerDay\` int NULL,
          \`establishmentId\` int NOT NULL,
          PRIMARY KEY (\`id\`),
          CONSTRAINT \`FK_5d1d2a3e7a8d5b4f4d8e1e1a7d6\` FOREIGN KEY (\`establishmentId\`) REFERENCES \`establishment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE \`report\`;
        `);
    }

}
