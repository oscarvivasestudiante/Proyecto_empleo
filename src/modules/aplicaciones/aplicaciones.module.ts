import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AplicacionesController } from "./controllers/aplicaciones.controllers";
import { AplicacionesService } from "./services/aplicaciones.services";
import { Application } from "./entities/aplicaciones.entities";
import { Job } from "../trabajos/entities/trabajos.entities";
import { User } from "../../auth/entities/auth.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Job, User])
  ],
  controllers: [AplicacionesController],
  providers: [AplicacionesService],
  exports: [AplicacionesService],
})
export class AplicacionesModule {}