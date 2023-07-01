import { Module } from '@nestjs/common'
import { TypeOrmConfigModule } from './typeorm/typeorm.module'
import { EnterpriseModule } from './enterprise/enterprise.module'
import { VehicleModule } from './vehicle/vehicle.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [TypeOrmConfigModule, EnterpriseModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
