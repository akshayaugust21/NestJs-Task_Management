import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { StatusValidatorPipe } from './pipes/status-validator-pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) taskFilter: GetTaskFilterDto
    ): Task[] {
        if (Object.keys(taskFilter).length) {
            return this.tasksService.getTaskByFilter(taskFilter);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string
    ): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: string
    ): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status', StatusValidatorPipe) status: TaskStatus
    ): Task {
        return this.tasksService.updateTask(id, status);
    }
}
