import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application, ApplicationStatus } from "../entities/aplicaciones.entities";
import { CreateApplicationDto } from "../dto/aplicacicones.dto";
import { Job } from "../../trabajos/entities/trabajos.entities";
import { User } from "../../../auth/entities/auth.entity";

@Injectable()
export class AplicacionesService {
  constructor(
    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,

    @InjectRepository(Job)
    private jobRepo: Repository<Job>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateApplicationDto): Promise<Application> {
    const job = await this.jobRepo.findOneBy({ id: dto.jobId });
    const worker = await this.userRepo.findOneBy({ id: dto.workerId });

    if (!job || !worker) {
      throw new BadRequestException("Trabajo o usuario no encontrado");
    }

    const application = this.applicationRepo.create({
      job,
      worker,
      status: ApplicationStatus.PENDING,
    });

    return this.applicationRepo.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationRepo.find({
      relations: {
        job: true,
        worker: true,
      },
    });
  }

  async findByJob(jobId: number): Promise<Application[]> {
    return this.applicationRepo.find({
      where: { job: { id: jobId } },
      relations: {
        job: true,
        worker: true,
      },
    });
  }

  async findByWorker(workerId: number): Promise<Application[]> {
    return this.applicationRepo.find({
      where: { worker: { id: workerId } },
      relations: {
        job: true,
        worker: true,
      },
    });
  }

  async updateStatus(id: number, status: ApplicationStatus): Promise<Application> {
    const app = await this.applicationRepo.findOne({
      where: { id },
      relations: {
        job: true,
        worker: true,
      },
    });

    if (!app) {
      throw new NotFoundException("Aplicación no encontrada");
    }

    if (!Object.values(ApplicationStatus).includes(status)) {
      throw new BadRequestException("Estado inválido");
    }

    app.status = status;

    return this.applicationRepo.save(app);
  }
}
