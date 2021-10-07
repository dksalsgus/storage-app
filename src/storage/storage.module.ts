import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageRepository } from './storage.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([StorageRepository]), AuthModule],
  providers: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
