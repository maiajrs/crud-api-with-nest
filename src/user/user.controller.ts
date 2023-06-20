import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UpdatePartialUser } from './dto/patch-update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password }: CreateUserDTO) {
    const user = await this.userService.create({ name, email, password });
    return {
      user,
    };
  }

  @Get(':id')
  async showOne(@Param('id') id: string) {
    const user = await this.userService.showOne(id);
    return {
      user,
    };
  }

  @Get()
  async showAll() {
    const users = await this.userService.showAll();
    return {
      users,
    };
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdateUser,
    @Param('id') id: string,
  ) {
    const user = await this.userService.update(id, { name, email, password });
    return { user };
  }

  @Patch(':id')
  async partialUpdate(
    @Body() { name, email, password }: UpdatePartialUser,
    @Param('id') id: string,
  ) {
    const user = await this.userService.partialUpdate(id, {
      name,
      email,
      password,
    });

    return {
      user,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
