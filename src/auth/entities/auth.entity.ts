import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany, // <-- Agrega esto
} from 'typeorm';
import { Job } from '../../modules/trabajos/entities/trabajos.entities'; // <-- Agrega esto

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password?: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['empleado'],
  })
  roles: string[];

  @OneToMany(() => Job, (job) => job.employer) // <-- Relación inversa
  jobs: Job[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
