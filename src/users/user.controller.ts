import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.userService.findAllWithPagination(limit, offset);
  }
  @Get('filter/by-name')
  async getUsersByName(@Query('name') name: string) {
    // Add logic to filter users by name from the UserService
    return this.userService.findByName(name);
  }

  @Get('filter/by-email')
  async getUsersByEmail(@Query('email') email: string) {
    // Add logic to filter users by email from the UserService
    return this.userService.findByEmail(email);
  }
}
