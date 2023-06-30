import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EnterpriseService } from './enterprise.service'
import { CreateEnterpriseDto } from './dto/create-enterprise.dto'
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto'

@ApiTags('Empresas')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto)
  }

  @Get()
  findAll() {
    return this.enterpriseService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterpriseService.update(+id, updateEnterpriseDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enterpriseService.remove(+id)
  }
}
