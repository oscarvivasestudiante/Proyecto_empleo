import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TrabajosModule } from './modules/trabajos/trabajos.module';
import { AplicacionesModule } from './modules/aplicaciones/aplicaciones.module'; // <-- Importa el módulo de aplicaciones


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Usa tu archivo de variables
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, // <- usa el mismo nombre que en tu .env
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule, // Agrega el módulo de autenticación aquí
    TrabajosModule, // <-- Agrega esto
    AplicacionesModule, // <-- Agrega aquí el módulo de aplicaciones
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
