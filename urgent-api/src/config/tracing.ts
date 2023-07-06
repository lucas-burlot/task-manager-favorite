import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

registerInstrumentations({
  instrumentations: [new GrpcInstrumentation(), new WinstonInstrumentation()],
});
