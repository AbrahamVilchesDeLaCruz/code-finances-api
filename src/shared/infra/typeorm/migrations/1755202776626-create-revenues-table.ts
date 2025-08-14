import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRevenuesTable1755202776626 implements MigrationInterface {
  name = 'CreateRevenuesTable1755202776626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "revenues" ("id" uuid NOT NULL, "amount" numeric(15,2) NOT NULL, "date" TIMESTAMP NOT NULL, "equity_id" uuid NOT NULL, "account_id" uuid NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_6e25eff5dd513bda2556a3d9370" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "revenues"`);
  }
}
