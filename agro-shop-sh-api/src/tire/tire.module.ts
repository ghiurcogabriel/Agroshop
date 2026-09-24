import { Module } from '@nestjs/common';
import { TireService } from './tire.service';
import { TireController } from './tire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tire } from './entities/tire.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from '../category/category.controller';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { AuthModule } from '../auth/auth.module';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tire, Category, User]),
    ConfigModule,
    AuthModule,
  ],
  controllers: [TireController, CategoryController],
  providers: [TireService, CategoryService, AdminAuthGuard],
})
export class TireModule {}
