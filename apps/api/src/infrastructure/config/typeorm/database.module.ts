import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Plugin } from "../../database/entities/plugin.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Plugin],
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
}
