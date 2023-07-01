import { Module } from '@nestjs/common'
import { EnterpriseModule } from './enterprise/enterprise.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmConfigModule } from './typeorm/typeorm.module'

@Module({
  imports: [TypeOrmConfigModule, EnterpriseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
