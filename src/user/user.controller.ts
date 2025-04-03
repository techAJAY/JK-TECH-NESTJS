import { Controller, Put, Param, Body, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseBody } from 'src/utills/commonTypes';
import { RolesGuard } from '../auth/role.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Controller('users')
// @UseGuards(RolesGuard)
export class UserController {
  UserService: any;
  constructor(private userService: UserService) {}


  @Get()
  async findAllUsers(): Promise<ResponseBody> {
    const data: any = await this.userService.findAllUsers();
    //NOTE - push final data
    const result: ResponseBody = {
      statusCode: 200,
      message: 'FOUND_DATA',
      data,
    };
    return result;
  }

  @Put(':id/role')
  @UseGuards(JwtStrategy, RolesGuard)
  //@SetMetadata('role', ['admin']) // Only allow 'admin' role
  updateRole(@Param('id') id: number, @Body() roleDto: { role: string }) {
    return this.userService.updateRole(id, roleDto.role);
  }
}


