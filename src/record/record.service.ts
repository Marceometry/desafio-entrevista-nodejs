import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AddRecordEntryDto } from './dto/add-record-entry.dto'
import { AddRecordExitDto } from './dto/add-record-exit.dto'
import { Record } from './entities/record.entity'
import { GetRecordsByEnterpriseDto } from './dto/get-records-by-enterprise.dto'

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  recordEntry({ vehicle, enterprise, timestamp }: AddRecordEntryDto) {
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
}
