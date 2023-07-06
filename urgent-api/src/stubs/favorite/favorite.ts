/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "favorite";

export interface Favorite {
  id: number;
  taskId: number;
  userId: number;
}

export interface FetchFavoriteRequest {
  userId: number;
}

export interface FetchFavoriteResponse {
  favorites: Favorite[];
}

export interface CreateFavoriteRequest {
  taskId: number;
  userId: number;
}

export interface CreateFavoriteResponse {
  favorites: Favorite | undefined;
}

export interface DeleteFavoriteRequest {
  id: number;
}

export interface DeleteFavoriteResponse {
  favorites: Favorite | undefined;
}

export const FAVORITE_PACKAGE_NAME = "favorite";

export interface FavoriteServiceClient {
  fetchFavorites(request: FetchFavoriteRequest, metadata?: Metadata): Observable<FetchFavoriteResponse>;

  createFavorite(request: CreateFavoriteRequest, metadata?: Metadata): Observable<CreateFavoriteResponse>;

  deleteFavorite(request: DeleteFavoriteRequest, metadata?: Metadata): Observable<DeleteFavoriteResponse>;
}

export interface FavoriteServiceController {
  fetchFavorites(
    request: FetchFavoriteRequest,
    metadata?: Metadata,
  ): Promise<FetchFavoriteResponse> | Observable<FetchFavoriteResponse> | FetchFavoriteResponse;

  createFavorite(
    request: CreateFavoriteRequest,
    metadata?: Metadata,
  ): Promise<CreateFavoriteResponse> | Observable<CreateFavoriteResponse> | CreateFavoriteResponse;

  deleteFavorite(
    request: DeleteFavoriteRequest,
    metadata?: Metadata,
  ): Promise<DeleteFavoriteResponse> | Observable<DeleteFavoriteResponse> | DeleteFavoriteResponse;
}

export function FavoriteServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchFavorites", "createFavorite", "deleteFavorite"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FavoriteService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FavoriteService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FAVORITE_SERVICE_NAME = "favorite";
