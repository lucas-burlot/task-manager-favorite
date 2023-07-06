import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrgentController } from './urgent/urgent.controller';
import { UrgentService } from './urgent/urgent.service';
import { PrismaService } from './prisma.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './config/grpc.config';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig)],
  controllers: [AppController, UrgentController],
  providers: [AppService, UrgentService, PrismaService],
})
export class AppModule {}
