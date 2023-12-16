import { MigrationInterface, QueryRunner } from "typeorm";

export class InittialMigration1702735748728 implements MigrationInterface {
    name = 'InittialMigration1702735748728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "phone_number" character varying(20) NOT NULL, "registration_date" date NOT NULL DEFAULT now(), "delete_date" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "full_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(20) NOT NULL, "registration_date" date NOT NULL DEFAULT now(), "delete_date" date, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
