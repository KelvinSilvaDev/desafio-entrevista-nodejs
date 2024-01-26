import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1704207679282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE \`users\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`username\` varchar(255) NOT NULL,
          \`name\` varchar(255) NOT NULL,
          \`email\` varchar(255) NOT NULL,
          \`gravatar\` varchar(255) NOT NULL,
          \`password\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)
        ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE \`users\`;
        `);
    }

}
