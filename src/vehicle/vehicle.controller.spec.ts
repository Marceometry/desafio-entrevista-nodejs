import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmTestConfig } from '../typeorm/typeorm.config'
import { VehicleController } from './vehicle.controller'
import { VehicleService } from './vehicle.service'
import { Vehicle } from './entities/vehicle.entity'
import { CreateVehicleDto } from './dto/create-vehicle.dto'

export const createVehicleMock: CreateVehicleDto = {
  brand: 'Teste',
  color: 'black',
  model: 'v1',
  plate: '999',
  type: 'car',
}

export const vehicleMock: Vehicle = {
  id: 1,
  records: [],
  ...createVehicleMock,
}

describe('VehicleController', () => {
  let controller: VehicleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmTestConfig),
        TypeOrmModule.forFeature([Vehicle]),
      ],
      controllers: [VehicleController],
      providers: [VehicleService],
    }).compile()

    controller = module.get<VehicleController>(VehicleController)
  })

  it('should create, update, read and delete all vehicles', async () => {
    const createdVehicle = await controller.create(createVehicleMock)
    const id = String(createdVehicle.id)

    const brand = 'Teste 1'
    await controller.update(id, { brand })

    const list = await controller.findAll()
    expect(list.find((item) => item.id === createdVehicle.id)).toHaveProperty(
      'brand',
      brand,
    )

    await controller.remove(id)

    const vehicle = await controller.findOne(id)
    expect(vehicle).toBeNull()
  })
})
