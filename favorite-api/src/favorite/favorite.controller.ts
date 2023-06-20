import { Controller } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateFavoriteRequest,
  DeleteFavoriteRequest,
  FetchFavoriteRequest,
  FetchFavoriteResponse,
} from 'src/stubs/favorite/favorite';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @GrpcMethod('FavoriteService', 'FetchFavorites')
  FetchFavorite(request: FetchFavoriteRequest): Promise<FetchFavoriteResponse> {
    const favorites = this.favoriteService.fetch(request.userId);
    return favorites;
  }

  @GrpcMethod('FavoriteService', 'CreateFavorite')
  CreateFavorite(
    request: CreateFavoriteRequest,
  ): Promise<CreateFavoriteRequest> {
    const favorite = this.favoriteService.create(
      request.userId,
      request.taskId,
    );
    return favorite;
  }

  @GrpcMethod('FavoriteService', 'DeleteFavorite')
  DeleteFavorite(
    request: DeleteFavoriteRequest,
  ): Promise<DeleteFavoriteRequest> {
    const favorite = this.favoriteService.delete(request.id);
    return favorite;
  }
}
