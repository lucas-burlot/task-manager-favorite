import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UrgentService {
  constructor(private prisma: PrismaService) {}

  fetch(user_id: number): Promise<any> {
    return this.prisma.urgent.findMany({
      where: {
        user_id: user_id,
      },
    });
  }

  async create(user_id: number, task_id: number): Promise<any> {
    const urgent = await this.prisma.urgent.create({
      data: {
        user_id: user_id,
        task_id: task_id,
      },
    });
    return urgent;
  }

  delete(urgent_id: number): Promise<any> {
    const urgent = this.prisma.urgent.findUnique({
      where: { id: urgent_id },
    });
    if (!urgent) {
      throw new Error(`urgent with id ${urgent_id} not found`);
    }
    return this.prisma.urgent.delete({
      where: {
        id: urgent_id,
      },
    });
  }
}
