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

    // Destructure the favorites array and return a new array of objects
    const favoritesArray = favorites.map((favorite) => {
      return {
        id: favorite.id,
        userId: favorite.user_id,
        taskId: favorite.task_id,
      };
    });
    return {
      favorites: favoritesArray,
    };
  }

  @GrpcMethod('FavoriteService', 'CreateFavorite')
  async CreateFavorite(
    request: CreateFavoriteRequest,
  ): Promise<CreateFavoriteResponse> {
    const fetchFavorite = await this.favoriteService.fetch(request.userId);
    const favoriteFind = fetchFavorite.find(
      (favorite) =>
        favorite.task_id === request.taskId &&
        favorite.user_id === request.userId,
    );
    if (favoriteFind) {
      throw new RpcException('Urgent already exists');
    }

    const favorite = await this.favoriteService.create(
      request.userId,
      request.taskId,
    );
    if (!favorite) {
      throw new RpcException('No favorite found for the specified id');
    }
    return {
      favorites: {
        id: favorite.id,
        userId: favorite.user_id,
        taskId: favorite.task_id,
      },
    };
  }

  @GrpcMethod('FavoriteService', 'DeleteFavorite')
  async DeleteFavorite(
    request: DeleteFavoriteRequest,
  ): Promise<DeleteFavoriteResponse> {
    const favorite = await this.favoriteService.delete(request.id);
    if (!favorite) {
      throw new RpcException('No favorite found for the specified id');
    }
    return {
      favorites: {
        id: favorite.id,
        userId: favorite.user_id,
        taskId: favorite.task_id,
      },
    };
  }
}
