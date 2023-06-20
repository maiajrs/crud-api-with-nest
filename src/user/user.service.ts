import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UpdatePartialUser } from './dto/patch-update-user.dto';
import { timeStamp } from 'console';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDTO) {
    return this.prisma.user.create({ data: { name, email, password } });
  }

  async showOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async showAll() {
    return this.prisma.user.findMany();
  }

  async update(id: string, { name, email, password }: UpdateUser) {
    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
      },
      where: {
        id,
      },
    });
  }

  async partialUpdate(
    id: string,
    { name, email, password }: UpdatePartialUser,
  ) {
    return this.prisma.user.update({
      data: { name, email, password },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.checkIfUserExists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async checkIfUserExists(id: string) {
    if (!this.showOne(id)) {
      throw new NotFoundException(`O usuário de id: ${id} não foi encontrado`);
    }
  }
}
