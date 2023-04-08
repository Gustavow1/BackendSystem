import { Body, Post, Get, Res, Headers, Put, Controller } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesDTO } from './process.dto';
import { Response } from 'express';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  async create(
    @Body() data: ProcessesDTO,
    @Headers('authorization') token: string,
    @Res() res: Response,
  ) {
    const query = await this.processesService.create(data, token);
    res.statusCode = query.status;
    res.json(query).send();
  }

  @Put('edit')
  async editProcess(
    @Headers('authorization') token: string,
    @Headers('processId') processId: string,
    @Body() data: ProcessesDTO,
    @Res() res: Response,
  ) {
    const query = await this.processesService.edit(token, processId, data)
    res.statusCode = query.status;
    res.json(query).send();
  }

  @Get()
  async indexAll() {
    return await this.processesService.indexAll();
  }

  @Post('close')
  async close(
    @Headers('authorization') token: string,
    @Headers('processId') processId: string,
    @Res() res: Response,
  ) {
    const query = await this.processesService.close(token, processId);
    res.statusCode = query.status;
    res.json(query).send();
  }
}
