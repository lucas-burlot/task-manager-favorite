/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "urgent";

export interface Urgent {
  id: number;
  taskId: number;
  userId: number;
}

export interface FetchUrgentRequest {
  userId: number;
}

export interface FetchUrgentResponse {
  urgent: Urgent[];
}

export interface CreateUrgentRequest {
  taskId: number;
  userId: number;
}

export interface CreateUrgentResponse {
  urgent: Urgent | undefined;
}

export interface DeleteUrgentRequest {
  id: number;
}

export interface DeleteUrgentResponse {
  urgent: Urgent | undefined;
}

export const URGENT_PACKAGE_NAME = "urgent";

export interface UrgentServiceClient {
  fetchUrgent(request: FetchUrgentRequest, metadata?: Metadata): Observable<FetchUrgentResponse>;

  createUrgent(request: CreateUrgentRequest, metadata?: Metadata): Observable<CreateUrgentResponse>;

  deleteUrgent(request: DeleteUrgentRequest, metadata?: Metadata): Observable<DeleteUrgentResponse>;
}

export interface UrgentServiceController {
  fetchUrgent(
    request: FetchUrgentRequest,
    metadata?: Metadata,
  ): Promise<FetchUrgentResponse> | Observable<FetchUrgentResponse> | FetchUrgentResponse;

  createUrgent(
    request: CreateUrgentRequest,
    metadata?: Metadata,
  ): Promise<CreateUrgentResponse> | Observable<CreateUrgentResponse> | CreateUrgentResponse;

  deleteUrgent(
    request: DeleteUrgentRequest,
    metadata?: Metadata,
  ): Promise<DeleteUrgentResponse> | Observable<DeleteUrgentResponse> | DeleteUrgentResponse;
}

export function UrgentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchUrgent", "createUrgent", "deleteUrgent"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UrgentService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UrgentService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const URGENT_SERVICE_NAME = "urgent";
