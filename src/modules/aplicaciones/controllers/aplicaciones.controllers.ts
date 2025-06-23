import { Controller, Post, Body, Get, Param, Patch, BadRequestException } from "@nestjs/common";
import { AplicacionesService } from "../services/aplicaciones.services";
import { ApplicationStatus } from "../entities/aplicaciones.entities";

@Controller("aplicaciones")
export class AplicacionesController {
  constructor(private readonly aplicacionesService: AplicacionesService) {}

  @Post()
  async create(@Body() body: { jobId: number; workerId: number }) {
    return this.aplicacionesService.create(body);
  }

  @Get()
  async findAll() {
    return this.aplicacionesService.findAll();
  }

  @Get("trabajo/:jobId")
  async findByJob(@Param("jobId") jobId: number) {
    return this.aplicacionesService.findByJob(Number(jobId));
  }

  @Get("usuario/:workerId")
  async findByWorker(@Param("workerId") workerId: number) {
    return this.aplicacionesService.findByWorker(Number(workerId));
  }

  @Patch(":id")
  async updateStatus(
    @Param("id") id: number,
    @Body() body: { status: string },
  ) {
    const status = body.status as ApplicationStatus;

    if (!Object.values(ApplicationStatus).includes(status)) {
      throw new BadRequestException("Estado inválido");
    }

    return this.aplicacionesService.updateStatus(Number(id), status);
  }
}
