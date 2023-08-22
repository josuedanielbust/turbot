import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { tasks as TaskModel } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  async findAll(): Promise<TaskModel[]> {
    return this.service.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskModel | null> {
    return this.service.findOne({ id: +id });
  }

  @Post()
  async create(@Body() body: {
    title: string,
    completed?: boolean,
  }): Promise<TaskModel> {
    return this.service.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: {
      title?: string,
      completed?: boolean,
    }
  ): Promise<TaskModel | null> {
    return this.service.update({
      where: { id: +id },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TaskModel | null> {
    return this.service.remove({ id: +id });
  }
}
