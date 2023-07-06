import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnterpriseModule } from '../enterprise/enterprise.module'
import { VehicleModule } from '../vehicle/vehicle.module'
import { RecordService } from './record.service'
import { RecordController } from './record.controller'
import { Record } from './entities/record.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    EnterpriseModule,
    VehicleModule,
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
