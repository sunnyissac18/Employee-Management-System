package com.sunny.ems.service;

import com.sunny.ems.dto.EmployeeDto;
import com.sunny.ems.entity.Employee;
import com.sunny.ems.exception.ResourceNotFoundException;
import com.sunny.ems.mapper.EmployeeMapper;
import com.sunny.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee= employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {

        Employee employee=employeeRepository.findById(employeeId)
                .orElseThrow(()->
                new ResourceNotFoundException("Employee doesn't exist with given Id"+employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees= employeeRepository.findAll();
        return employees.stream().map((employee )-> EmployeeMapper.mapToEmployeeDto(employee) )
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto getEmployeeByEmail(String email) {

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User with given email not found"));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee=employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee doesn't exist with given Id "+employeeId));
        employee.setFullName(updatedEmployee.getFullName());
        employee.setRole(updatedEmployee.getRole());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updatedEmployeeObj= employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee doesn't exist with given Id "+employeeId));

        employeeRepository.deleteById(employeeId);
    }


}
