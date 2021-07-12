import { Controller, Get, Post, Body, Patch, Param, Delete, CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({ status: 200, description: 'List of users records.' })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Single user records.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(+id);
  }
}
