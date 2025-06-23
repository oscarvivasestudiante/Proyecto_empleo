import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../../auth/entities/auth.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.jobs, { eager: true })
  employer: User;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}