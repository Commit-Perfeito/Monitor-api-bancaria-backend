import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1734051990893 implements MigrationInterface {
  name = 'default1734051990893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "records" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "codeResponse" integer NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL, "timeRequest" integer NOT NULL, "payloadResponse" jsonb NOT NULL, "detailing" character varying(50) NOT NULL, "responseStatus" character varying(50) NOT NULL, "year" integer, "month" integer, "day" integer, "hour" integer, "minute" integer, "second" integer, "bankId" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "Type-idx" ON "records" ("type") `);
    await queryRunner.query(`CREATE INDEX "Bank-idx" ON "records" ("bankId") `);
    await queryRunner.query(
      `CREATE INDEX "date-idx" ON "records" ("dateCreated") `
    );
    await queryRunner.query(
      `CREATE INDEX "status-idx" ON "records" ("status") `
    );
    await queryRunner.query(`CREATE INDEX "year-idx" ON "records" ("year") `);
    await queryRunner.query(`CREATE INDEX "month-idx" ON "records" ("month") `);
    await queryRunner.query(`CREATE INDEX "day-idx" ON "records" ("day") `);
    await queryRunner.query(`CREATE INDEX "hour-idx" ON "records" ("hour") `);
    await queryRunner.query(
      `CREATE INDEX "minute-idx" ON "records" ("minute") `
    );
    await queryRunner.query(
      `CREATE INDEX "second-idx" ON "records" ("second") `
    );
    await queryRunner.query(
      `CREATE TABLE "banks" ("id" SERIAL NOT NULL, "name" text NOT NULL, "bankCode" integer NOT NULL, CONSTRAINT "PK_3975b5f684ec241e3901db62d77" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "name-idx" ON "banks" ("name") `);
    await queryRunner.query(
      `ALTER TABLE "records" ADD CONSTRAINT "FK_b4e49a5a0f51a9920dc84b8c584" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "records" DROP CONSTRAINT "FK_b4e49a5a0f51a9920dc84b8c584"`
    );
    await queryRunner.query(`DROP INDEX "public"."name-idx"`);
    await queryRunner.query(`DROP TABLE "banks"`);
    await queryRunner.query(`DROP INDEX "public"."second-idx"`);
    await queryRunner.query(`DROP INDEX "public"."minute-idx"`);
    await queryRunner.query(`DROP INDEX "public"."hour-idx"`);
    await queryRunner.query(`DROP INDEX "public"."day-idx"`);
    await queryRunner.query(`DROP INDEX "public"."month-idx"`);
    await queryRunner.query(`DROP INDEX "public"."year-idx"`);
    await queryRunner.query(`DROP INDEX "public"."status-idx"`);
    await queryRunner.query(`DROP INDEX "public"."date-idx"`);
    await queryRunner.query(`DROP INDEX "public"."Bank-idx"`);
    await queryRunner.query(`DROP INDEX "public"."Type-idx"`);
    await queryRunner.query(`DROP TABLE "records"`);
  }
}
