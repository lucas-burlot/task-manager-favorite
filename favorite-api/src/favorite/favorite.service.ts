import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  fetch(user_id: number): Promise<any> {
    return this.prisma.favorite.findMany({
      where: {
        user_id: user_id,
      },
    });
  }

  async create(user_id: number, task_id: number): Promise<any> {
    const favorite = await this.prisma.favorite.create({
      data: {
        user_id: user_id,
        task_id: task_id,
      },
    });
    return favorite;
  }

  delete(favorite_id: number): Promise<any> {
    const favorite = this.prisma.favorite.findUnique({
      where: { id: favorite_id },
    });
    if (!favorite) {
      throw new Error(`favorite with id ${favorite_id} not found`);
    }
    return this.prisma.favorite.delete({
      where: {
        id: favorite_id,
      },
    });
  }
}
