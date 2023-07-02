import { Module } from '@nestjs/common'
import { TypeOrmConfigModule } from './typeorm/typeorm.module'
import { EnterpriseModule } from './enterprise/enterprise.module'
import { VehicleModule } from './vehicle/vehicle.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { RecordModule } from './record/record.module'

@Module({
  imports: [
    TypeOrmConfigModule,
    AuthModule,
    EnterpriseModule,
    VehicleModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
