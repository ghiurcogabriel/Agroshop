import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { getTypeOrmModuleOptions } from './config/db.config';
import { UserModule } from './user/user.module';
import { TireModule } from './tire/tire.module';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './resource/users/users.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => getTypeOrmModuleOptions(),
    }),
    UserModule,
    TireModule,
    CategoryModule,
    UsersModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
