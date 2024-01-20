import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEstablishment1705719894312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE establishment (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cnpj VARCHAR(14) NOT NULL,
                address VARCHAR(255) NOT NULL,
                phone VARCHAR(11) NOT NULL,
                motorcycle_spaces INT NOT NULL,
                car_spaces INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE establishment;
        `);
    }

}
