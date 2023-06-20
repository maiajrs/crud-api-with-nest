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
  async showOne(@Param() params) {
    return {
      params,
    };
  }

  @Get()
  async showAll() {
    return {
      users: [],
    };
  }

  @Put(':id')
  async update(@Body() { name, email, password }: UpdateUser, @Param() params) {
    return {
      name,
      email,
      password,
      params,
    };
  }

  @Patch(':id')
  async partialUpdate(@Body() body: UpdatePartialUser, @Param() params) {
    return {
      ...body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return {
      id,
    };
  }
}
