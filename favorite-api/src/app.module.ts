import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteService } from './favorite/favorite.service';

@Module({
  imports: [],
  controllers: [AppController, FavoriteController],
  providers: [AppService, FavoriteService],
})
export class AppModule {}
