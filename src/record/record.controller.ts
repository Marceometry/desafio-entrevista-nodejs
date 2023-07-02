import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RecordService } from './record.service'
import { AddRecordEntryDto } from './dto/add-record-entry.dto'
import { AddRecordExitDto } from './dto/add-record-exit.dto'
import { GetRecordsByEnterpriseDto } from './dto/get-records-by-enterprise.dto'

@ApiBearerAuth()
@ApiTags('Registros')
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('entry')
  recordEntry(@Body() addRecordEntryDto: AddRecordEntryDto) {
    return this.recordService.recordEntry(addRecordEntryDto)
  }

  @Post('exit')
  recordExit(@Body() addRecordExitDto: AddRecordExitDto) {
    return this.recordService.recordExit(addRecordExitDto)
  }

  @Get()
  findByEnterprise(
    @Body() getRecordsByEnterpriseDto: GetRecordsByEnterpriseDto,
  ) {
    return this.recordService.findByEnterprise(getRecordsByEnterpriseDto)
  }
}
