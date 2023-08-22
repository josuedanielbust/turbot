import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { tasks as Tasks, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.tasksWhereUniqueInput,
    where?: Prisma.tasksWhereInput,  
  }): Promise<Tasks[]> {
    const { skip, take, cursor, where } = params;
    return this.prisma.tasks.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async findOne(where: Prisma.tasksWhereUniqueInput): Promise<Tasks | null> {
    return this.prisma.tasks.findUnique({
      where,
    });
  }

  async create(data: Prisma.tasksCreateInput): Promise<Tasks> {
    return this.prisma.tasks.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.tasksWhereUniqueInput,
    data: Prisma.tasksUpdateInput,
  }): Promise<Tasks> {
    const { where, data } = params;
    return this.prisma.tasks.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.tasksWhereUniqueInput): Promise<Tasks> {
    return this.prisma.tasks.delete({
      where,
    });
  }
}
