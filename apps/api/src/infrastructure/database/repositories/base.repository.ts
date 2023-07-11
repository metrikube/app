import { DataSource, DeleteResult, EntityManager, EntityTarget, FindManyOptions, FindOptionsWhere, InsertResult, ObjectLiteral, QueryRunner, RemoveOptions } from 'typeorm'
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult'

export class BaseRepository<Entity extends ObjectLiteral> {
  readonly manager: EntityManager
  readonly queryRunner?: QueryRunner
  readonly entity: EntityTarget<Entity>

  constructor(connection: DataSource, entity: EntityTarget<Entity>) {
    this.queryRunner = connection.createQueryRunner()
    this.manager = this.queryRunner.manager
    this.entity = entity
  }

  create(entity: any): Entity {
    return this.manager.create(this.entity, entity)
  }

  save(entity): Promise<Entity> {
    return this.manager.save(this.entity, entity, { listeners: true })
  }

  find(optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this.manager.find(this.entity, optionsOrConditions)
  }

  findOne(optionsOrConditions: FindOneOptions<Entity> | FindOptionsWhere<Entity>): Promise<Entity | undefined> {
    return this.manager.findOne(this.entity, optionsOrConditions)
  }

  remove(entityOrEntities: Entity | Entity[], options?: RemoveOptions): Promise<Entity | Entity[]> {
    return this.manager.remove(this.entity, entityOrEntities, options)
  }

  insert(entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]): Promise<InsertResult> {
    return this.manager.insert(this.entity, this.create(entity))
  }

  update(criteria: FindOptionsWhere<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
    return this.manager.update(this.entity, criteria, partialEntity)
  }

  delete(criteria: FindOptionsWhere<Entity>): Promise<DeleteResult> {
    return this.manager.delete(this.entity, criteria)
  }

  count(optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>): Promise<number> {
    return this.manager.count(this.entity, optionsOrConditions)
  }

  findOneOrFail(optionsOrConditions?: FindOneOptions<Entity> | FindOptionsWhere<Entity>): Promise<Entity> {
    return this.manager.findOneOrFail(this.entity, optionsOrConditions)
  }

  query(query: string, parameters?: any[]): Promise<any> {
    return this.manager.query(query, parameters)
  }

  async transaction<T>(operation: () => Promise<T>): Promise<T> {
    await this.queryRunner.connect()
    await this.queryRunner.startTransaction()

    try {
      const result = await operation()
      await this.queryRunner.commitTransaction()
      return result
    } catch (err) {
      await this.queryRunner.rollbackTransaction()
    } finally {
      await this.queryRunner.release()
    }
  }
}
