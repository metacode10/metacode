import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();
const ormConfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // 데이터베이스 동기화
};

export default ormConfig;
