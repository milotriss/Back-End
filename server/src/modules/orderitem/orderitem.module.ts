import { Module } from '@nestjs/common';
import { OrderitemController } from './orderitem.controller';
import { OrderitemService } from './orderitem.service';

@Module({
  controllers: [OrderitemController],
  providers: [OrderitemService]
})
export class OrderitemModule {}
