import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtGuard)
  @Get()
  getProjects(@CurrentUser() user: User) {
    return this.projectsService.getProjects(user.id);
  }
}
