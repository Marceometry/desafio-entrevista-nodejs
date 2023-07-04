import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmTestConfig } from '../typeorm/typeorm.config'
import { EnterpriseController } from './enterprise.controller'
import { EnterpriseService } from './enterprise.service'
import { Enterprise } from './entities/enterprise.entity'
import { CreateEnterpriseDto } from './dto/create-enterprise.dto'

export const createEnterpriseMock: CreateEnterpriseDto = {
  name: 'Teste',
  cnpj: '000',
  phone: '999',
  address: 'Avenida 1',
  carParkingSpots: 1,
  motorbikeParkingSpots: 1,
}

export const enterpriseMock: Enterprise = {
  id: 1,
  records: [],
  ...createEnterpriseMock,
}

describe('EnterpriseController', () => {
  let controller: EnterpriseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmTestConfig),
        TypeOrmModule.forFeature([Enterprise]),
      ],
      controllers: [EnterpriseController],
      providers: [EnterpriseService],
    }).compile()

    controller = module.get<EnterpriseController>(EnterpriseController)
  })

  it('should create, update, read and delete all enterprises', async () => {
    const createdEnterprise = await controller.create(createEnterpriseMock)
    const id = String(createdEnterprise.id)

    const name = 'Teste 1'
    await controller.update(id, { name })

    const list = await controller.findAll()
    expect(
      list.find((item) => item.id === createdEnterprise.id),
    ).toHaveProperty('name', name)

    await controller.remove(id)

    const enterprise = await controller.findOne(id)
    expect(enterprise).toBeNull()
  })
})
