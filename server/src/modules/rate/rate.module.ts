import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { RateRepository } from './rate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RateController],
  providers: [RateService,RateRepository]
})
export class RateModule {}
