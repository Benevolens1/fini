import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Credential } from './credential.model';

@Module({
  imports: [SequelizeModule.forFeature([Credential])],
  providers: [CredentialsService],
  exports: [CredentialsService]
})
export class CredentialsModule {}
