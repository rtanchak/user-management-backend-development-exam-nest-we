import { Controller, Get, Patch, Query, Param, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUsersStatusesDto } from './dto/update-usersStatuses.dto';
import {
  QUERY_PARAM_LIMIT,
  QUERY_PARAM_OFFSET,
  QUERY_PARAM_NAME,
  QUERY_PARAM_EMAIL,
} from '../constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query(QUERY_PARAM_LIMIT) limit: number, @Query(QUERY_PARAM_OFFSET) offset: number) {
    return this.userService.findAllWithPagination(limit, offset);
  }

  @Get('filter')
  async getUsersByFilters(
    @Query(QUERY_PARAM_NAME) name?: string,
    @Query(QUERY_PARAM_EMAIL) email?: string,
  ) {
    if (name) {
      return this.userService.findByName(name);
    } else if (email) {
      return this.userService.findByEmail(email);
    } else {
      return 'Please provide a valid query parameter (name or email).';
    }
  }

  @Patch('/update-users-statuses')
  async updateUsersStatuses(@Body() updateUsersStatusesDto: UpdateUsersStatusesDto) {
    return this.userService.updateUsersStatuses(updateUsersStatusesDto);
  }
}
