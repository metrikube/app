import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeDatabaseSchema1693679985856 implements MigrationInterface {
  name = 'InitializeDatabaseSchema1693679985856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "metric"
       (
         "id"              varchar PRIMARY KEY NOT NULL,
         "pluginId"        varchar             NOT NULL,
         "type"            varchar             NOT NULL,
         "name"            varchar             NOT NULL,
         "refreshInterval" integer             NOT NULL DEFAULT (59),
         "isNotifiable"    boolean             NOT NULL DEFAULT (0),
         "createdAt"       datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `CREATE TABLE "plugin"
       (
         "id"             varchar PRIMARY KEY NOT NULL,
         "name"           varchar             NOT NULL,
         "type"           varchar             NOT NULL,
         "description"    varchar             NOT NULL,
         "instruction"    varchar             NOT NULL DEFAULT ('No instruction'),
         "category"       varchar             NOT NULL,
         "credentialType" varchar             NOT NULL,
         "iconUrl"        varchar,
         "createdAt"      datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(`CREATE TABLE "credential"
                             (
                               "id"        varchar PRIMARY KEY NOT NULL,
                               "type"      varchar             NOT NULL,
                               "value"     varchar             NOT NULL,
                               "pluginId"  varchar             NOT NULL,
                               "createdAt" datetime            NOT NULL DEFAULT (datetime('now'))
                             )`);
    await queryRunner.query(
      `CREATE TABLE "widget"
       (
         "id"           varchar PRIMARY KEY NOT NULL,
         "name"         varchar             NOT NULL,
         "description"  varchar,
         "pluginId"     varchar             NOT NULL,
         "credentialId" varchar             NOT NULL,
         "metricId"     varchar             NOT NULL,
         "resourceId"   varchar,
         "isActive"     boolean             NOT NULL DEFAULT (1),
         "createdAt"    datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `CREATE TABLE "alert"
       (
         "id"        varchar PRIMARY KEY NOT NULL,
         "label"     varchar             NOT NULL,
         "triggered" boolean             NOT NULL DEFAULT (0),
         "isActive"  boolean             NOT NULL DEFAULT (1),
         "widgetId"  varchar             NOT NULL,
         "condition" json                NOT NULL,
         "createdAt" datetime            NOT NULL DEFAULT (datetime('now')),
         "updatedAt" datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_metric"
       (
         "id"              varchar PRIMARY KEY NOT NULL,
         "pluginId"        varchar             NOT NULL,
         "type"            varchar             NOT NULL,
         "name"            varchar             NOT NULL,
         "refreshInterval" integer             NOT NULL DEFAULT (59),
         "isNotifiable"    boolean             NOT NULL DEFAULT (0),
         "createdAt"       datetime            NOT NULL DEFAULT (datetime('now')),
         CONSTRAINT "fk_metric_plugin_id" FOREIGN KEY ("pluginId") REFERENCES "plugin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
       )`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_metric"("id", "pluginId", "type", "name", "refreshInterval", "isNotifiable", "createdAt")
       SELECT "id", "pluginId", "type", "name", "refreshInterval", "isNotifiable", "createdAt"
       FROM "metric"`
    );
    await queryRunner.query(`DROP TABLE "metric"`);
    await queryRunner.query(`ALTER TABLE "temporary_metric" RENAME TO "metric"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_credential"
       (
         "id"        varchar PRIMARY KEY NOT NULL,
         "type"      varchar             NOT NULL,
         "value"     varchar             NOT NULL,
         "pluginId"  varchar             NOT NULL,
         "createdAt" datetime            NOT NULL DEFAULT (datetime('now')),
         CONSTRAINT "FK_acb956869280165df27c2b25dc8" FOREIGN KEY ("pluginId") REFERENCES "plugin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
       )`
    );
    await queryRunner.query(`INSERT INTO "temporary_credential"("id", "type", "value", "pluginId")
                             SELECT "id", "type", "value", "pluginId"
                             FROM "credential"`);
    await queryRunner.query(`DROP TABLE "credential"`);
    await queryRunner.query(`ALTER TABLE "temporary_credential" RENAME TO "credential"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_widget"
       (
         "id"           varchar PRIMARY KEY NOT NULL,
         "name"         varchar             NOT NULL,
         "description"  varchar,
         "pluginId"     varchar             NOT NULL,
         "credentialId" varchar             NOT NULL,
         "metricId"     varchar             NOT NULL,
         "resourceId"   varchar,
         "isActive"     boolean             NOT NULL DEFAULT (1),
         "createdAt"    datetime            NOT NULL DEFAULT (datetime('now')),
         CONSTRAINT "fk_plugin_id" FOREIGN KEY ("pluginId") REFERENCES "plugin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
         CONSTRAINT "fk_credential_id" FOREIGN KEY ("credentialId") REFERENCES "credential" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
         CONSTRAINT "fk_metric_id" FOREIGN KEY ("metricId") REFERENCES "metric" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
       )`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_widget"("id", "name", "description", "pluginId", "credentialId", "metricId", "resourceId", "isActive")
       SELECT "id",
              "name",
              "description",
              "pluginId",
              "credentialId",
              "metricId",
              "resourceId",
              "isActive"
       FROM "widget"`
    );
    await queryRunner.query(`DROP TABLE "widget"`);
    await queryRunner.query(`ALTER TABLE "temporary_widget" RENAME TO "widget"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_alert"
       (
         "id"        varchar PRIMARY KEY NOT NULL,
         "label"     varchar             NOT NULL,
         "triggered" boolean             NOT NULL DEFAULT (0),
         "isActive"  boolean             NOT NULL DEFAULT (1),
         "widgetId"  varchar             NOT NULL,
         "condition" json                NOT NULL,
         "createdAt" datetime            NOT NULL DEFAULT (datetime('now')),
         "updatedAt" datetime            NOT NULL DEFAULT (datetime('now')),
         CONSTRAINT "FK_06a86dacd0e4ee35dd81de706bc" FOREIGN KEY ("widgetId") REFERENCES "widget" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
       )`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_alert"("id", "label", "triggered", "isActive", "widgetId", "condition", "createdAt", "updatedAt")
       SELECT "id",
              "label",
              "triggered",
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
         "id"        varchar PRIMARY KEY NOT NULL,
         "label"     varchar             NOT NULL,
         "triggered" boolean             NOT NULL DEFAULT (0),
         "isActive"  boolean             NOT NULL DEFAULT (1),
         "widgetId"  varchar             NOT NULL,
         "condition" json                NOT NULL,
         "createdAt" datetime            NOT NULL DEFAULT (datetime('now')),
         "updatedAt" datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `INSERT INTO "alert"("id", "label", "triggered", "isActive", "widgetId", "condition", "createdAt")
       SELECT "id", "label", "triggered", "isActive", "widgetId", "condition", "createdAt"
       FROM "temporary_alert"`
    );
    await queryRunner.query(`DROP TABLE "temporary_alert"`);
    await queryRunner.query(`ALTER TABLE "widget" RENAME TO "temporary_widget"`);
    await queryRunner.query(
      `CREATE TABLE "widget"
       (
         "id"           varchar PRIMARY KEY NOT NULL,
         "name"         varchar             NOT NULL,
         "description"  varchar,
         "pluginId"     varchar             NOT NULL,
         "credentialId" varchar             NOT NULL,
         "metricId"     varchar             NOT NULL,
         "resourceId"   varchar,
         "isActive"     boolean             NOT NULL DEFAULT (1),
         "createdAt"    datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `INSERT INTO "widget"("id", "name", "description", "pluginId", "credentialId", "metricId", "resourceId", "isActive")
       SELECT "id",
              "name",
              "description",
              "pluginId",
              "credentialId",
              "metricId",
              "resourceId",
              "isActive"
       FROM "temporary_widget"`
    );
    await queryRunner.query(`DROP TABLE "temporary_widget"`);
    await queryRunner.query(`ALTER TABLE "credential" RENAME TO "temporary_credential"`);
    await queryRunner.query(`CREATE TABLE "credential"
                             (
                               "id"       varchar PRIMARY KEY NOT NULL,
                               "type"     varchar             NOT NULL,
                               "value"    varchar             NOT NULL,
                               "pluginId" varchar             NOT NULL,
                               createdAt  datetime            NOT NULL DEFAULT (datetime('now'))
                             )`);
    await queryRunner.query(`INSERT INTO "credential"("id", "type", "value", "pluginId")
                             SELECT "id", "type", "value", "pluginId"
                             FROM "temporary_credential"`);
    await queryRunner.query(`DROP TABLE "temporary_credential"`);
    await queryRunner.query(`ALTER TABLE "metric" RENAME TO "temporary_metric"`);
    await queryRunner.query(
      `CREATE TABLE "metric"
       (
         "id"              varchar PRIMARY KEY NOT NULL,
         "pluginId"        varchar             NOT NULL,
         "type"            varchar             NOT NULL,
         "name"            varchar             NOT NULL,
         "refreshInterval" integer             NOT NULL DEFAULT (59),
         "isNotifiable"    boolean             NOT NULL DEFAULT (0),
         "createdAt"       datetime            NOT NULL DEFAULT (datetime('now'))
       )`
    );
    await queryRunner.query(
      `INSERT INTO "metric"("id", "pluginId", "type", "name", "refreshInterval", "isNotifiable", "createdAt")
       SELECT "id", "pluginId", "type", "name", "refreshInterval", "isNotifiable", "createdAt"
       FROM "temporary_metric"`
    );
    await queryRunner.query(`DROP TABLE "temporary_metric"`);
    await queryRunner.query(`DROP TABLE "alert"`);
    await queryRunner.query(`DROP TABLE "widget"`);
    await queryRunner.query(`DROP TABLE "credential"`);
    await queryRunner.query(`DROP TABLE "plugin"`);
    await queryRunner.query(`DROP TABLE "metric"`);
  }
}
