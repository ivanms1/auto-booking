import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [PrismaModule, CloudinaryModule],
  exports: [UserService],
})
export class UsersModule {}
