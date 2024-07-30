import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaskpeopleService } from './taskpeople.service';
import { TaskPersonDto } from "./taskpersonDto.dto";

@WebSocketGateway({ namespace: 'taskpeople' })
export class TaskpeopleGateway {

  joinBid: string;

  @WebSocketServer() server: Server;

  constructor(
    private taskpeopleService: TaskpeopleService
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

  @SubscribeMessage('createTaskPerson')
  async handleCreatePerson(
    @MessageBody() taskPersonDto: TaskPersonDto
  ) {
    const taskId = taskPersonDto.taskId;
    const personId = taskPersonDto.personId;
    let taskPerson = await this.taskpeopleService.createTaskPerson(
      taskId,
      personId,
      this.joinBid
    );
    this.server.to(this.joinBid).emit('createTaskPerson', {taskId, personId});
  }

  @SubscribeMessage('deleteTaskPerson')
  async handleDeletePerson(
    @MessageBody() taskPerson: TaskPersonDto
  ) {
    await this.taskpeopleService.removeTaskPerson(taskPerson.taskId, taskPerson.personId, this.joinBid);
    this.server.to(this.joinBid).emit('deleteTaskPerson', taskPerson);
  }

}
