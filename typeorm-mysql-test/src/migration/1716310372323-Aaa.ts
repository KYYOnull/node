import { MigrationInterface, QueryRunner } from "typeorm";

export class Aaa1716310372323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE user (
                id int NOT NULL AUTO_INCREMENT,
                firstName varchar(255) NOT NULL,
                lastName varchar(255) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
