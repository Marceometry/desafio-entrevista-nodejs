import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmTestConfig } from '../typeorm/typeorm.config'
import { createEnterpriseMock } from '../enterprise/enterprise.controller.spec'
import { createVehicleMock } from '../vehicle/vehicle.controller.spec'
import { EnterpriseService } from '../enterprise/enterprise.service'
import { VehicleService } from '../vehicle/vehicle.service'
import { Enterprise } from '../enterprise/entities/enterprise.entity'
import { Vehicle } from '../vehicle/entities/vehicle.entity'
import { RecordController } from './record.controller'
import { RecordService } from './record.service'
import { Record } from './entities/record.entity'

describe('RecordController', () => {
  let controller: RecordController
  let enterprise: Enterprise = null
  let vehicle: Vehicle = null

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmTestConfig),
        TypeOrmModule.forFeature([Enterprise, Vehicle, Record]),
      ],
      controllers: [RecordController],
      providers: [EnterpriseService, VehicleService, RecordService],
    }).compile()

    controller = module.get<RecordController>(RecordController)

    const enterpriseService = module.get<EnterpriseService>(EnterpriseService)
    const vehicleService = module.get<VehicleService>(VehicleService)

    enterprise = await enterpriseService.create(createEnterpriseMock)
    vehicle = await vehicleService.create(createVehicleMock)
  })

  it('should add, update and find new entry', async () => {
    const enterpriseId = enterprise.id
    const entry = await controller.recordEntry({
      enterprise: enterpriseId,
      vehicle: vehicle.id,
      timestamp: new Date(),
    })

    await controller.recordExit({
      id: entry.id,
      timestamp: new Date(),
    })

    const summary = await controller.getSummary({ enterpriseId })

    expect(summary.entries).toBe(1)
    expect(summary.exits).toBe(1)

    const summaryByHour = await controller.getSummaryByHour({ enterpriseId })
    expect(summaryByHour[0].entries).toBe(1)
    expect(summaryByHour[0].exits).toBe(1)
  })
})
