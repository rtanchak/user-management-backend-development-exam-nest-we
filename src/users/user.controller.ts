import { Controller, Get, Patch, Query, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUsersStatusesDto } from './dto/update-usersStatuses.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.userService.findAllWithPagination(limit, offset);
  }

  @Get('filter')
  async getUsersByFilters(
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    if (name) {
      return this.userService.findByName(name);
    } else if (email) {
      return this.userService.findByEmail(email);
    } else {
      return 'Please provide a valid query parameter (name or email).';
    }
  }

  //Add saparate patch route for status update, although it may be a part of user update
  @Patch('/update-users-statuses')
  async updateUsersStatuses(@Body() updateUsersStatusesDto: UpdateUsersStatusesDto) {
    return this.userService.updateUsersStatuses(updateUsersStatusesDto);
  }
}
