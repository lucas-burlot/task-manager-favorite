import { Controller } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  DeleteFavoriteRequest,
  DeleteFavoriteResponse,
  FetchFavoriteRequest,
  FetchFavoriteResponse,
} from 'src/stubs/favorite/favorite';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @GrpcMethod('FavoriteService', 'FetchFavorites')
  async FetchFavorite(
    request: FetchFavoriteRequest,
  ): Promise<FetchFavoriteResponse> {
    const favorites = await this.favoriteService.fetch(request.userId);
    if (favorites.length === 0) {
      throw new RpcException('No favorites found for the specified user');
    }
    return { favorites: [favorites] };
  }

  @GrpcMethod('FavoriteService', 'CreateFavorite')
  async CreateFavorite(
    request: CreateFavoriteRequest,
  ): Promise<CreateFavoriteResponse> {
    const favorite = await this.favoriteService.create(
      request.userId,
      request.taskId,
    );
    if (!favorite) {
      throw new RpcException('No favorite found for the specified id');
    }
    return { favorites: favorite };
  }

  @GrpcMethod('FavoriteService', 'DeleteFavorite')
  async DeleteFavorite(
    request: DeleteFavoriteRequest,
  ): Promise<DeleteFavoriteResponse> {
    const favorite = await this.favoriteService.delete(request.id);
    if (!favorite) {
      throw new RpcException('No favorite found for the specified id');
    }
    return { favorites: favorite };
  }
}
