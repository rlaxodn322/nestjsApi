import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.userService.login(body.username, body.password);
  }
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('id') id: number, @Body() newData: Partial<User>) {
    return this.userService.updateUser(id, newData);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
