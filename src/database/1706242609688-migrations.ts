import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706242609688 implements MigrationInterface {
    name = 'Migrations1706242609688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Vehicle\` (\`id\` varchar(36) NOT NULL, \`brand\` varchar(500) NOT NULL, \`model\` varchar(500) NOT NULL, \`color\` varchar(500) NOT NULL, \`licensePlate\` varchar(20) NOT NULL, \`type\` varchar(100) NOT NULL, \`cnh\` varchar(20) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`parking_record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entryTime\` datetime NOT NULL, \`exitTime\` datetime NULL, \`vehicleId\` varchar(36) NULL, \`establishmentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalCarSpaces\` int NULL, \`totalMotorcycleSpaces\` int NULL, \`totalCarEntries\` int NULL, \`totalMotorcycleEntries\` int NULL, \`totalCarExits\` int NULL, \`totalMotorcycleExits\` int NULL, \`totalCarEntriesPerHour\` int NULL, \`totalMotorcycleEntriesPerHour\` int NULL, \`totalCarExitsPerHour\` int NULL, \`totalMotorcycleExitsPerHour\` int NULL, \`totalCarEntriesPerDay\` int NULL, \`totalMotorcycleEntriesPerDay\` int NULL, \`totalCarExitsPerDay\` int NULL, \`totalMotorcycleExitsPerDay\` int NULL, \`establishmentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`establishment\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(500) NOT NULL, \`cnpj\` varchar(20) NOT NULL, \`address\` varchar(500) NOT NULL, \`phone\` varchar(20) NOT NULL, \`motorcycleSpaces\` int NOT NULL, \`carSpaces\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`occupiedCarSpaces\` int NOT NULL DEFAULT '0', \`occupiedMotorcycleSpaces\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` enum ('DEFAULT', 'SUDO') NOT NULL DEFAULT 'SUDO', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`gravatar\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`parking_record\` ADD CONSTRAINT \`FK_8402edb10088b68da17b0c99268\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`Vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_record\` ADD CONSTRAINT \`FK_8c99a016546cff73a35da02b241\` FOREIGN KEY (\`establishmentId\`) REFERENCES \`establishment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`report\` ADD CONSTRAINT \`FK_b6cc26ab2c94b44c8f816784b7a\` FOREIGN KEY (\`establishmentId\`) REFERENCES \`establishment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_472b25323af01488f1f66a06b67\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_472b25323af01488f1f66a06b67\``);
        await queryRunner.query(`ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_b6cc26ab2c94b44c8f816784b7a\``);
        await queryRunner.query(`ALTER TABLE \`parking_record\` DROP FOREIGN KEY \`FK_8c99a016546cff73a35da02b241\``);
        await queryRunner.query(`ALTER TABLE \`parking_record\` DROP FOREIGN KEY \`FK_8402edb10088b68da17b0c99268\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`establishment\``);
        await queryRunner.query(`DROP TABLE \`report\``);
        await queryRunner.query(`DROP TABLE \`parking_record\``);
        await queryRunner.query(`DROP TABLE \`Vehicle\``);
    }

}
