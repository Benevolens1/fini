import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { SubtasksService } from './subtasks.service';

@WebSocketGateway({namespace: 'subtasks'})
export class SubtasksGateway {

  joinBid: string;

  @WebSocketServer() server: Server;

  constructor(
    private subtasksService: SubtasksService
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

  @SubscribeMessage('createSubtask')
  async handleCreateSubtask(
    @MessageBody() subtask
  ) {
    let savedSubtask = await this.subtasksService.createSubtask(subtask, this.joinBid);
    this.server.to(this.joinBid).emit('createSubtask', savedSubtask);
    console.log('createSubtask :', subtask);
  }

  @SubscribeMessage('updateSubtask')
  async handleUpdateSubtask(
    @MessageBody() subtask
  ) {
    await this.subtasksService.updateSubtask(subtask, this.joinBid);
    this.server.to(this.joinBid).emit('updateSubtask', subtask);
  }

  @SubscribeMessage('deleteSubtask')
  async handleDeleteSubtask(
    @MessageBody() taskId
  ) {
    await this.subtasksService.deleteSubtask(taskId, this.joinBid);
    this.server.to(this.joinBid).emit('deleteSubtask', taskId);
  }

}
