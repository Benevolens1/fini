import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FromUserProposedTaskDto } from './fromUserProposedTask.dto';
import { FromServerCreatedTaskDto } from './fromServerCreatedTask.dto';
import { TasksService } from './tasks.service';

@WebSocketGateway({ namespace: 'tasks' })
export class TasksGateway {

  joinBid: string;

  @WebSocketServer() server: Server;

  constructor(
    private tasksService: TasksService
  ) {
    this.joinBid = "";
  }


  @SubscribeMessage('boardId')
  handleFirstMessage(
    @MessageBody() boardId: string,
    @ConnectedSocket() client
  ) {
    this.joinBid = boardId;
    client.join(this.joinBid);
  }


  @SubscribeMessage('createTask')
  async handleCreateTask(
    @MessageBody() fromUserProposedTaskDto: FromUserProposedTaskDto
  ): Promise<void> {
    let task = await this.tasksService.createTask(fromUserProposedTaskDto, this.joinBid);
    this.server.to(this.joinBid).emit('createTask', task);
  }

  @SubscribeMessage('updateTask')
  handleUpdateTask(
    @MessageBody() fromServerCreatedTaskDto: FromServerCreatedTaskDto
  ) {
    this.tasksService.updateTask(fromServerCreatedTaskDto, this.joinBid)
      .then(() => this.server.to(this.joinBid).emit('updateTask', fromServerCreatedTaskDto));
  }

  @SubscribeMessage('deleteTask')
  handleDeleteTask(
    @MessageBody() taskId: string
  ) {
    this.tasksService.deleteTask(taskId, this.joinBid)
      .then(() => this.server.to(this.joinBid).emit('deleteTask', taskId));
  }
}
