import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Enterprise } from '../enterprise/entities/enterprise.entity'
import { Vehicle } from '../vehicle/entities/vehicle.entity'
import { Record } from '../record/entities/record.entity'

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  autoLoadEntities: true,
})

export const typeOrmTestConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [Enterprise, Vehicle, Record],
}
