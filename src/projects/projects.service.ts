import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UsersService } from '../users/users.service';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  getProjects(userId: string) {
    return this.projectsRepository.find({ where: { user: { id: userId } } });
  }

  async addProject(createProjectDto: CreateProjectDto, userId: string) {
    const { name, description } = createProjectDto;

    const user = await this.usersService.getUser(userId);
    const project = this.projectsRepository.create({
      name,
      description,
      user,
    });

    return this.projectsRepository.save(project);
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (project === null) {
      throw new BadRequestException(`Project with id ${id} not found.`);
    }

    Object.assign(project, updateProjectDto);

    return this.projectsRepository.save(project);
  }
}
