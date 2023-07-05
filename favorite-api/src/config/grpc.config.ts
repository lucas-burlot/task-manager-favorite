/* eslint-disable prettier/prettier */
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { FAVORITE_SERVICE_NAME } from 'src/stubs/favorite/favorite';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: FAVORITE_SERVICE_NAME,
    protoPath: join(__dirname, '../proto/favorite/favorite.proto'),
  },
}) as GrpcOptions;
