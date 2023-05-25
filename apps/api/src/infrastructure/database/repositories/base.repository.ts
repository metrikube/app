import { DataSource, EntityManager, EntityTarget, ObjectLiteral, QueryRunner } from 'typeorm';

export class BaseRepository<Entity extends ObjectLiteral> {
  readonly manager: EntityManager;
  readonly queryRunner?: QueryRunner;
  readonly entity: EntityTarget<Entity>;

  constructor(connection: DataSource, entity: EntityTarget<Entity>) {
    this.queryRunner = connection.createQueryRunner();
    this.manager = this.queryRunner.manager;
    this.entity = entity;
  }

  save(entity: Entity): Promise<Entity> {
    return this.manager.save(entity);
  }

  find(): Promise<Entity[]> {
    return this.manager.find(this.entity);
  }
}
