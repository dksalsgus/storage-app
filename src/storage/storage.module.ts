import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageRepository } from './storage.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StorageRepository])],
  providers: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
