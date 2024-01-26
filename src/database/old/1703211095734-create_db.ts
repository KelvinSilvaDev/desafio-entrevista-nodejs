import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1703211095734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE DATABASE \`parking\`;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP DATABASE \`parking\`;
        `);
    }

}
