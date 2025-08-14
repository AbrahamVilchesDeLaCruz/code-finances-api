import { DataSource } from 'typeorm';
import * as process from 'process';
import * as path from 'path';
console.log('Initializing TypeORM DataSource...');
console.log(`DB_HOST: ${process.env.DB_HOST}`);
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.resolve(__dirname, '../../../**/infra/typeorm/*.entity.ts')],
  migrations: [
    path.resolve(__dirname, '../../../shared/infra/typeorm/migrations/*.ts'),
  ],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: false,
});

// example  in docker npm run migration:generate -- ./src/shared/infra/typeorm/migrations/NombreMigracion
