import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects(@CurrentUser() user: User) {
    return this.projectsService.getProjects(user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  addProject(@Body() body: CreateProjectDto, @CurrentUser() user: User) {
    return this.projectsService.addProject(body, user.id);
  }

  @Patch('/:id')
  updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.updateProject(id, body);
  }

  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
