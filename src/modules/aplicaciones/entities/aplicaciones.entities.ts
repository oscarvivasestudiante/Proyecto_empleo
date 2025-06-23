import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from "typeorm";
import { Job } from "../../trabajos/entities/trabajos.entities";
import { User } from "../../../auth/entities/auth.entity";

export enum ApplicationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, { eager: true })
  job: Job;

  @ManyToOne(() => User, { eager: true })
  worker: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;
}
