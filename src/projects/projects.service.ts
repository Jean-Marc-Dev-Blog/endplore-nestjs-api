import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  getProjects(userId: string) {
    return this.projectsRepository.find({ where: { user: { id: userId } } });
  }

  addProject() {
    return 'CREATE PROJECT';
  }
}
