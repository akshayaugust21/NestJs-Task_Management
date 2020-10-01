import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskByFilter(taskFilter: GetTaskFilterDto): Task[] {
        const { status, search } = taskFilter;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = this.tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search)
            );
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException("Task with the id not found");
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuid()
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        const newTasks = this.tasks.filter(task => task.id !== found.id);
        this.tasks = newTasks;
    }

    updateTask(id: string, taskStatus: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = taskStatus;
        return task;
    }
}
