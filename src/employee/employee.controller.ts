import { EmployeeService } from './employee.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEmployeeDto, EditEmployeeDto } from './dto';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id', ParseIntPipe) empId: number) {
    return this.employeeService.getEmployeeById(empId);
  }

  @Post('create')
  createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @Patch('edit/:id')
  editEmployee(
    @Param('id', ParseIntPipe) empId: number,
    @Body() dto: EditEmployeeDto,
  ) {
    return this.employeeService.editEmployee(empId, dto);
  }

  @Post('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEmployee(@Param('id', ParseIntPipe) empId: number) {
    return this.employeeService.deleteEmployee(empId);
  }
}
