import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/trabajos.entities';
import { JobsService } from './services/trabajos.services';
import { JobsController } from './controllers/trabajos.contrllers';
import { User } from '../../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class TrabajosModule {}