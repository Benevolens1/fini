import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { BoardsModule } from '../boards/boards.module';
import { AdminController } from './admin.controller';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
  imports: [BoardsModule, CredentialsModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
