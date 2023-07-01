import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    return this.vehiclesRepository.save(createVehicleDto)
  }

  findAll() {
    return this.vehiclesRepository.find()
  }

  findOne(id: number) {
    return this.vehiclesRepository.findOneBy({ id })
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesRepository.update(id, updateVehicleDto)
  }

  remove(id: number) {
    return this.vehiclesRepository.delete(id)
  }
}
