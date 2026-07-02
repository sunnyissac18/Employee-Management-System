package com.sunny.ems.mapper;

import com.sunny.ems.dto.EmployeeDto;
import com.sunny.ems.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFullName(),
                employee.getRole(),
                employee.getEmail()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFullName(),
                employeeDto.getRole(),
                employeeDto.getEmail()

        );
    }
}
