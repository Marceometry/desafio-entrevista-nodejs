import { Test, TestingModule } from '@nestjs/testing'
import { EnterpriseController } from './enterprise.controller'
import { EnterpriseService } from './enterprise.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Enterprise } from './entities/enterprise.entity'

describe('EnterpriseController', () => {
  let controller: EnterpriseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([Enterprise]),
      ],
      controllers: [EnterpriseController],
      providers: [EnterpriseService],
    }).compile()

    controller = module.get<EnterpriseController>(EnterpriseController)
  })

  it('should create, update, read and delete all enterprises', async () => {
    const createdEnterprise = await controller.create({
      name: 'Teste',
      cnpj: '000',
      address: 'string',
      phone: '999',
      motorbikeParkingSpots: 10,
      carParkingSpots: 5,
    })
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
