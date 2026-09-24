import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Tire } from '../tire/entities/tire.entity';
import { User } from '../user/entities/user.entity';
import { Order } from '../order/entities/order.entity';
import { OrderItem } from '../order/entities/order-item.entity';
import { CreateMainTables1722610359205 } from '../data/migrations/1722610359205-CreateMainTables';
import { CreateOrderTables1722610359206 } from '../data/migrations/1722610359206-CreateOrderTables';
import { DropOrderEmailUnique1722610359207 } from '../data/migrations/1722610359207-DropOrderEmailUnique';
import { AddOrderNumberToOrders1722610359208 } from '../data/migrations/1722610359208-AddOrderNumberToOrders';

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const parseBoolean = (value: string | undefined, fallback = false): boolean => {
  if (!value) {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
};

export const getDataSourceOptions = (): DataSourceOptions => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseNumber(process.env.DATABASE_PORT, 3306),
    username: process.env.DATABASE_USER ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? '',
    database: process.env.DATABASE_NAME ?? 'agro-shop-sh',
    entities: [Category, Tire, User, Order, OrderItem],
    migrations: [
      CreateMainTables1722610359205,
      CreateOrderTables1722610359206,
      DropOrderEmailUnique1722610359207,
      AddOrderNumberToOrders1722610359208,
    ],
    logging: parseBoolean(process.env.DATABASE_LOGGING),
    synchronize: false,
    migrationsRun: parseBoolean(process.env.DATABASE_MIGRATIONS_RUN),
  };
};

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  return {
    ...getDataSourceOptions(),
    autoLoadEntities: false,
    retryAttempts: parseNumber(process.env.DATABASE_RETRY_ATTEMPTS, 10),
    retryDelay: parseNumber(process.env.DATABASE_RETRY_DELAY, 3000),
  };
};

export const AppDataSource = new DataSource(getDataSourceOptions());

export default AppDataSource;
