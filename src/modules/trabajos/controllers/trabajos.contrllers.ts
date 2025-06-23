import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JobsService } from '../services/trabajos.services';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { Express } from 'express'; // <-- Agrega esto arriba

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/jobs',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createJobDto: CreateJobDto
  ) {
    if (file) {
      createJobDto.imageUrl = `/uploads/jobs/${file.filename}`;
    }
    // Conversión aquí:
    if (createJobDto.employerId) {
      createJobDto.employerId = Number(createJobDto.employerId);
    }
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}