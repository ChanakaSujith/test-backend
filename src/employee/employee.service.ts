import { CreateEmployeeDto, EditEmployeeDto } from './dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  getEmployees() {
    return this.prisma.employee.findMany({
      where: {},
    });
  }

  getEmployeeById(employeeId: number) {
    return this.prisma.employee.findFirst({
      where: {
        id: employeeId,
      },
    });
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const employee_exist = await this.prisma.employee.findUnique({
      where: { email: dto.email },
    });
    if (employee_exist) throw new ForbiddenException('Email Already Exist');

    const employee = await this.prisma.employee.create({
      data: {
        no_val: dto.no_val,
        ...dto,
      },
    });

    return employee;
  }

  async editEmployee(employeeId: number, dto: EditEmployeeDto) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) throw new ForbiddenException('Access to resource denied');

    return this.prisma.employee.update({
      where: { id: employeeId },
      data: {
        ...dto,
      },
    });
  }

  async deleteEmployee(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) throw new ForbiddenException('Access to resource denied');

    await this.prisma.employee.delete({ where: { id: employeeId } });
  }
}
