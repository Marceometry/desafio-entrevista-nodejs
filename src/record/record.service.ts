import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { resetMinutesAndSeconds } from '../utils/date'
import { EnterpriseService } from '../enterprise/enterprise.service'
import { VehicleService } from '../vehicle/vehicle.service'
import { AddRecordEntryDto } from './dto/add-record-entry.dto'
import { AddRecordExitDto } from './dto/add-record-exit.dto'
import { Record } from './entities/record.entity'
import { GetRecordsByEnterpriseDto } from './dto/get-records-by-enterprise.dto'

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    private enterprisesService: EnterpriseService,
    private vehiclesService: VehicleService,
  ) {}

  findAll() {
    return this.recordsRepository.find()
  }

  async recordEntry({ vehicle, enterprise, timestamp }: AddRecordEntryDto) {
    const { type } = await this.vehiclesService.findOne(vehicle)

    const { carParkingSpots, motorbikeParkingSpots } =
      await this.enterprisesService.findOne(enterprise)

    const { entries, exits } = await this.getSummary({
      enterpriseId: enterprise,
    })

    const spots = type === 'car' ? carParkingSpots : motorbikeParkingSpots
    const occupiedSpots = entries - exits
    const hasEmptySpots = occupiedSpots < spots

    if (!hasEmptySpots) {
      throw new BadRequestException('Não há vagas disponíveis')
    }
    const data = { vehicle, enterprise, entry_timestamp: timestamp }
    return this.recordsRepository.save(data)
  }

  recordExit({ id, timestamp }: AddRecordExitDto) {
    return this.recordsRepository.update(id, { exit_timestamp: timestamp })
  }

  findByEnterprise({ enterpriseId }: GetRecordsByEnterpriseDto) {
    return this.recordsRepository
      .createQueryBuilder('record')
      .where('enterpriseId = :id', { id: enterpriseId })
      .getMany()
  }

  async getSummary(getRecordsByEnterpriseDto: GetRecordsByEnterpriseDto) {
    const records = await this.findByEnterprise(getRecordsByEnterpriseDto)
    return records.reduce(
      (acc, record) => ({
        entries: acc.entries + 1,
        exits: record.exit_timestamp ? acc.exits + 1 : acc.exits,
      }),
      { entries: 0, exits: 0 },
    )
  }

  async getSummaryByHour(getRecordsByEnterpriseDto: GetRecordsByEnterpriseDto) {
    const records = await this.findByEnterprise(getRecordsByEnterpriseDto)

    const summary = records.reduce((acc, record) => {
      const entryTime = resetMinutesAndSeconds(record.entry_timestamp)
      if (!acc[entryTime]) {
        acc[entryTime] = {
          hour: entryTime,
          entries: 0,
          exits: 0,
        }
      }
      acc[entryTime].entries++

      if (record.exit_timestamp) {
        const exitTime = resetMinutesAndSeconds(record.exit_timestamp)
        if (!acc[exitTime]) {
          acc[exitTime] = {
            hour: exitTime,
            entries: 0,
            exits: 0,
          }
        }
        acc[exitTime].exits++
      }

      return acc
    }, {})

    return Object.values(summary).sort((a: any, b: any) => {
      return new Date(a.hour).getTime() - new Date(b.hour).getTime()
    }) as Array<{ hour: Date; entries: number; exits: number }>
  }
}
