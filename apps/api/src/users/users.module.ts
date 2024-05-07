import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
