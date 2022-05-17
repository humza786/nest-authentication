import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'
import { TasksRepository } from './tasks.repository'

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  create (createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  findAll (): Promise<Task[]> {
    return this.tasksRepository.getAllTasks()
  }

  findOne (id: string): Promise<Task> {
    return this.tasksRepository.getTask(id)
  }

  update (id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.updateTask(id, updateTaskDto)
  }

  remove (id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id)
  }
}
