import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteService } from './favorite/favorite.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, FavoriteController],
  providers: [AppService, FavoriteService, PrismaService],
})
export class AppModule {}
