/* eslint-disable prettier/prettier */
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { URGENT_SERVICE_NAME } from 'src/stubs/urgent/urgent';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: URGENT_SERVICE_NAME,
    protoPath: join(__dirname, '../proto/urgent/urgent.proto'),
  },
}) as GrpcOptions;
