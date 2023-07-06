import { Controller } from '@nestjs/common';
import { UrgentService } from './urgent.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateUrgentRequest,
  CreateUrgentResponse,
  DeleteUrgentRequest,
  DeleteUrgentResponse,
  FetchUrgentRequest,
  FetchUrgentResponse,
} from 'src/stubs/urgent/urgent';

@Controller('urgent')
export class UrgentController {
  constructor(private urgentService: UrgentService) {}

  @GrpcMethod('UrgentService', 'FetchUrgent')
  async FetchUrgent(request: FetchUrgentRequest): Promise<FetchUrgentResponse> {
    const urgents = await this.urgentService.fetch(request.userId);
    if (urgents.length === 0) {
      throw new RpcException('No urgents found for the specified user');
    }

    const urgentsArray = urgents.map((urgent) => {
      return {
        id: urgent.id,
        userId: urgent.user_id,
        taskId: urgent.task_id,
      };
    });
    return {
      urgent: urgentsArray,
    };
  }

  @GrpcMethod('UrgentService', 'CreateUrgent')
  async CreateUrgent(
    request: CreateUrgentRequest,
  ): Promise<CreateUrgentResponse> {
    const urgents = await this.urgentService.fetch(request.userId);
    const urgentFind = urgents.find(
      (urgent) =>
        urgent.task_id === request.taskId && urgent.user_id === request.userId,
    );
    if (urgentFind) {
      throw new RpcException('Urgent already exists');
    }

    const urgent = await this.urgentService.create(
      request.userId,
      request.taskId,
    );
    if (!urgent) {
      throw new RpcException('No urgent found for the specified id');
    }
    return {
      urgent: {
        id: urgent.id,
        userId: urgent.user_id,
        taskId: urgent.task_id,
      },
    };
  }

  @GrpcMethod('UrgentService', 'DeleteUrgent')
  async DeleteUrgent(
    request: DeleteUrgentRequest,
  ): Promise<DeleteUrgentResponse> {
    const urgent = await this.urgentService.delete(request.id);
    if (!urgent) {
      throw new RpcException('No urgent found for the specified id');
    }
    return {
      urgent: {
        id: urgent.id,
        userId: urgent.user_id,
        taskId: urgent.task_id,
      },
    };
  }
}
