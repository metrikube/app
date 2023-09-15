import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationsForAlerts1694508938533 implements MigrationInterface {
  name = 'UpdateRelationsForAlerts1694508938533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_alert"
       (
           "id"          varchar PRIMARY KEY NOT NULL,
           "label"       varchar             NOT NULL,
           "triggered"   boolean             NOT NULL DEFAULT (0),
           "triggeredAt" datetime,
           "isActive"    boolean             NOT NULL DEFAULT (1),
           "widgetId"    varchar             NOT NULL,
           "condition"   json                NOT NULL,
           "createdAt"   datetime            NOT NULL DEFAULT (datetime('now')),
           "updatedAt"   datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_alert"("id", "label", "triggered", "triggeredAt", "isActive", "widgetId", "condition", "createdAt", "updatedAt")
       SELECT "id",
              "label",
              "triggered",
              "triggeredAt",
              "isActive",
              "widgetId",
              "condition",
              "createdAt",
              "updatedAt"
       FROM "alert"`
    );
    await queryRunner.query(`DROP TABLE "alert"`);
    await queryRunner.query(`ALTER TABLE "temporary_alert" RENAME TO "alert"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_alert"
       (
           "id"          varchar PRIMARY KEY NOT NULL,
           "label"       varchar             NOT NULL,
           "triggered"   boolean             NOT NULL DEFAULT (0),
           "triggeredAt" datetime,
           "isActive"    boolean             NOT NULL DEFAULT (1),
           "widgetId"    varchar             NOT NULL,
           "condition"   json                NOT NULL,
           "createdAt"   datetime            NOT NULL DEFAULT (datetime('now')),
           "updatedAt"   datetime            NOT NULL DEFAULT (datetime('now')),
           CONSTRAINT "fk_widget_id" FOREIGN KEY ("widgetId") REFERENCES "widget" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
       )`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_alert"("id", "label", "triggered", "triggeredAt", "isActive", "widgetId", "condition", "createdAt", "updatedAt")
       SELECT "id",
              "label",
              "triggered",
              "triggeredAt",
              "isActive",
              "widgetId",
              "condition",
              "createdAt",
              "updatedAt"
       FROM "alert"`
    );
    await queryRunner.query(`DROP TABLE "alert"`);
    await queryRunner.query(`ALTER TABLE "temporary_alert" RENAME TO "alert"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alert" RENAME TO "temporary_alert"`);
    await queryRunner.query(
      `CREATE TABLE "alert"
       (
           "id"          varchar PRIMARY KEY NOT NULL,
           "label"       varchar             NOT NULL,
           "triggered"   boolean             NOT NULL DEFAULT (0),
           "triggeredAt" datetime,
           "isActive"    boolean             NOT NULL DEFAULT (1),
           "widgetId"    varchar             NOT NULL,
           "condition"   json                NOT NULL,
           "createdAt"   datetime            NOT NULL DEFAULT (datetime('now')),
           "updatedAt"   datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `INSERT INTO "alert"("id", "label", "triggered", "triggeredAt", "isActive", "widgetId", "condition", "createdAt", "updatedAt")
       SELECT "id",
              "label",
              "triggered",
              "triggeredAt",
              "isActive",
              "widgetId",
              "condition",
              "createdAt",
              "updatedAt"
       FROM "temporary_alert"`
    );
    await queryRunner.query(`DROP TABLE "temporary_alert"`);
    await queryRunner.query(`ALTER TABLE "alert" RENAME TO "temporary_alert"`);
    await queryRunner.query(
      `CREATE TABLE "alert"
       (
           "id"          varchar PRIMARY KEY NOT NULL,
           "label"       varchar             NOT NULL,
           "triggered"   boolean             NOT NULL DEFAULT (0),
           "triggeredAt" datetime,
           "isActive"    boolean             NOT NULL DEFAULT (1),
           "widgetId"    varchar             NOT NULL,
           "condition"   json                NOT NULL,
           "createdAt"   datetime            NOT NULL DEFAULT (datetime('now')),
           "updatedAt"   datetime            NOT NULL DEFAULT (datetime('now')),
           CONSTRAINT "FK_06a86dacd0e4ee35dd81de706bc" FOREIGN KEY ("widgetId") REFERENCES "widget" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
       )`
    );
    await queryRunner.query(
      `INSERT INTO "alert"("id", "label", "triggered", "triggeredAt", "isActive", "widgetId", "condition", "createdAt", "updatedAt")
       SELECT "id",
              "label",
              "triggered",
              "triggeredAt",
              "isActive",
              "widgetId",
              "condition",
              "createdAt",
              "updatedAt"
       FROM "temporary_alert"`
    );
    await queryRunner.query(`DROP TABLE "temporary_alert"`);
  }
}
