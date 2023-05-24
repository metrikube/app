// import { Injectable } from "@nestjs/common";
// import {
//   ObjectLiteral,
//   EntityManager,
//   QueryRunner,
//   DeepPartial,
//   SaveOptions,
//   RemoveOptions,
//   UpdateResult,
//   DeleteResult,
//   FindManyOptions,
//   FindOneOptions,
//   EntitySchema,
//   DataSource,
//   EntityTarget,
//   FindOptionsWhere,
//   ObjectId
// } from 'typeorm';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
//
// @Injectable()
// export class BaseRepository<Entity extends ObjectLiteral> {
//   readonly manager: EntityManager;
//   readonly queryRunner?: QueryRunner;
//   readonly entitySchema: EntitySchema<Entity>;
//
//   constructor(connection: DataSource, entity: EntitySchema<Entity>) {
//     this.queryRunner = connection.createQueryRunner();
//     this.manager = this.queryRunner.manager;
//     this.entitySchema = entity;
//   }
//
//   hasId(entity: Entity): boolean {
//     return this.manager.hasId(entity);
//   }
//
//   getId(entity: Entity): Entity {
//     return this.manager.getId(entity);
//   }
//
//   save<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false },): Promise<T[]>;
//   save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions,): Promise<(T & Entity)[]>;
//   save<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>;
//   save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>;
//   save<T extends Entity>(entityOrEntities: T | T[], options?: SaveOptions): Promise<T | T[]> {
//     return this.manager.save<T | T[], T | T[]>(
//       this.entitySchema as EntityTarget<T>,
//       entityOrEntities as T | T[],
//       options
//     );
//   }
//
//   remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;
//   remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;
//   remove(entityOrEntities: Entity | Entity[], options?: RemoveOptions,): Promise<Entity | Entity[]> {
//     return this.manager.remove(
//       this.entitySchema,
//       entityOrEntities,
//       options,
//     );
//   }
//
//   update(criteria: | string | string[] | number | number[] | Date | Date[], partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
//     return this.manager.update(
//       this.entitySchema,
//       criteria,
//       partialEntity,
//     );
//   }
//
//   delete(criteria: | string | string[] | number | number[] | Date | Date[]): Promise<DeleteResult> {
//     return this.manager.delete(this.entitySchema, criteria);
//   }
//
//
//   count(options?: FindManyOptions<Entity>): Promise<number>;
//   count(conditions?: FindManyOptions<Entity>): Promise<number>;
//   count(optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,): Promise<number> {
//     return this.manager.count(
//       this.entitySchema,
//       optionsOrConditions,
//     );
//   }
//
//   find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
//   find(conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
//   find(optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,): Promise<Entity[]> {
//     return this.manager.find(
//       this.entitySchema,
//       optionsOrConditions,
//     );
//   }
//
//   findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;
//   findAndCount(conditions?: FindOptionsWhere<Entity>,): Promise<[Entity[], number]>;
//   findAndCount(optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,): Promise<[Entity[], number]> {
//     return this.manager.findAndCount(
//       this.entitySchema,
//       optionsOrConditions,
//     );
//   }
//
//   findOne(id?: string | number | Date | ObjectId, options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
//   findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
//   findOne(conditions?: FindOptionsWhere<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
//   findOne(optionsOrConditions?: string | number | Date | ObjectId | FindOptionsWhere<Entity> | FindOneOptions<Entity>): Promise<Entity | undefined> {
//     return this.manager.findOne(this.entitySchema, optionsOrConditions as any);
//   }
//
//   query<T>(query: string, parameters?: any[]): Promise<T> {
//     return this.manager.query<T>(query, parameters);
//   }
//
//   async transaction<T>(operation: () => Promise<T>): Promise<T> {
//     await this.queryRunner.connect();
//     await this.queryRunner.startTransaction();
//
//     try {
//       const result = await operation();
//
//       await this.queryRunner.commitTransaction();
//       return result;
//     } catch (err) {
//       await this.queryRunner.rollbackTransaction();
//     } finally {
//       await this.queryRunner.release();
//     }
//   }
// }
