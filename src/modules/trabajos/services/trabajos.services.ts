import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entities/trabajos.entities';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { User } from '../../../auth/entities/auth.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const employer = await this.userRepository.findOneBy({ id: createJobDto.employerId });
    if (!employer) throw new Error('Employer not found');
    const job = this.jobRepository.create({
      title: createJobDto.title,
      description: createJobDto.description,
      employer, // aquí va el objeto User
      imageUrl: createJobDto.imageUrl, // <-- agrega esto
    });
    return this.jobRepository.save(job);
  }

  findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ['employer'] });
  }

  findOne(id: number): Promise<Job | null> {
    return this.jobRepository.findOne({ where: { id }, relations: ['employer'] });
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job | null> {
    await this.jobRepository.update(id, updateJobDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}