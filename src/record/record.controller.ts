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

  @Get()
  findAll() {
    return this.recordService.findAll()
  }

  @Post('entry')
  async recordEntry(@Body() addRecordEntryDto: AddRecordEntryDto) {
    try {
      return this.recordService.recordEntry(addRecordEntryDto)
    } catch (error) {
      return error
    }
  }

  @Post('exit')
  recordExit(@Body() addRecordExitDto: AddRecordExitDto) {
    return this.recordService.recordExit(addRecordExitDto)
  }

  @Get('summary')
  getSummary(@Body() getRecordsByEnterpriseDto: GetRecordsByEnterpriseDto) {
    return this.recordService.getSummary(getRecordsByEnterpriseDto)
  }

  @Get('summary/hour')
  getSummaryByHour(
    @Body() getRecordsByEnterpriseDto: GetRecordsByEnterpriseDto,
  ) {
    return this.recordService.getSummaryByHour(getRecordsByEnterpriseDto)
  }
}
