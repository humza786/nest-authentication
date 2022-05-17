import { InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask (createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, description } = createTaskDto
    const task = this.create({ name, description })
    await this.save(task)
    return task
  }

  async getAllTasks (): Promise<Task[]> {
    return await this.find()
  }

  async getTask (id: string): Promise<Task> {
    return await this.findOne(id)
  }

  async updateTask (id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.findOne(id)
      return await this.save({ ...task, ...updateTaskDto })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async deleteTask (id: string): Promise<void> {
    await this.delete(id)
  }
}
