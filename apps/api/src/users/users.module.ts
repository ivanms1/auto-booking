import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UsersModule {}
