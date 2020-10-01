import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    deadline: Date;
    
    @IsOptional()
    @IsIn(['COMPLETED', 'NEW', 'OVERDUE'])
    status: string;
}