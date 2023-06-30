import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateEnterpriseDto } from './dto/create-enterprise.dto'
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto'
import { Enterprise } from './entities/enterprise.entity'

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private enterprisesRepository: Repository<Enterprise>,
  ) {}

  create(createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterprisesRepository.save(createEnterpriseDto)
  }

  findAll() {
    return this.enterprisesRepository.find()
  }

  findOne(id: number) {
    return this.enterprisesRepository.findOneBy({ id })
  }

  update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterprisesRepository.update(id, updateEnterpriseDto)
  }

  remove(id: number) {
    return this.enterprisesRepository.delete(id)
  }
}
