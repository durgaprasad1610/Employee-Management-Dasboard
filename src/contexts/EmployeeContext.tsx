import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Employee, EmployeeFormData } from '../types/employee';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: EmployeeFormData) => void;
  updateEmployee: (id: string, employee: EmployeeFormData) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

// Mock initial data - 35 employees
const initialEmployees: Employee[] = [
  { id: '1', fullName: 'John Doe', gender: 'Male', dateOfBirth: '1990-05-15', profileImage: 'https://i.pravatar.cc/150?img=12', state: 'California', isActive: true },
  { id: '2', fullName: 'Jane Smith', gender: 'Female', dateOfBirth: '1988-08-22', profileImage: 'https://i.pravatar.cc/150?img=5', state: 'New York', isActive: true },
  { id: '3', fullName: 'Michael Johnson', gender: 'Male', dateOfBirth: '1992-03-10', profileImage: 'https://i.pravatar.cc/150?img=33', state: 'Texas', isActive: false },
  { id: '4', fullName: 'Emily Davis', gender: 'Female', dateOfBirth: '1995-11-30', profileImage: 'https://i.pravatar.cc/150?img=9', state: 'Florida', isActive: true },
  { id: '5', fullName: 'Robert Wilson', gender: 'Male', dateOfBirth: '1987-07-18', profileImage: 'https://i.pravatar.cc/150?img=51', state: 'Illinois', isActive: true },
  { id: '6', fullName: 'Sarah Miller', gender: 'Female', dateOfBirth: '1993-02-28', profileImage: 'https://i.pravatar.cc/150?img=45', state: 'Washington', isActive: true },
  { id: '7', fullName: 'David Brown', gender: 'Male', dateOfBirth: '1989-09-12', profileImage: 'https://i.pravatar.cc/150?img=15', state: 'Oregon', isActive: true },
  { id: '8', fullName: 'Lisa Anderson', gender: 'Female', dateOfBirth: '1991-07-05', profileImage: 'https://i.pravatar.cc/150?img=10', state: 'Nevada', isActive: false },
  { id: '9', fullName: 'James Taylor', gender: 'Male', dateOfBirth: '1994-12-20', profileImage: 'https://i.pravatar.cc/150?img=60', state: 'Arizona', isActive: true },
  { id: '10', fullName: 'Patricia Moore', gender: 'Female', dateOfBirth: '1986-04-17', profileImage: 'https://i.pravatar.cc/150?img=32', state: 'Colorado', isActive: true },
  { id: '11', fullName: 'Christopher Lee', gender: 'Male', dateOfBirth: '1990-11-08', profileImage: 'https://i.pravatar.cc/150?img=13', state: 'Utah', isActive: true },
  { id: '12', fullName: 'Jennifer White', gender: 'Female', dateOfBirth: '1992-06-25', profileImage: 'https://i.pravatar.cc/150?img=20', state: 'New Mexico', isActive: true },
  { id: '13', fullName: 'Daniel Harris', gender: 'Male', dateOfBirth: '1988-03-14', profileImage: 'https://i.pravatar.cc/150?img=56', state: 'Idaho', isActive: false },
  { id: '14', fullName: 'Nancy Martin', gender: 'Female', dateOfBirth: '1995-10-30', profileImage: 'https://i.pravatar.cc/150?img=47', state: 'Montana', isActive: true },
  { id: '15', fullName: 'Matthew Thompson', gender: 'Male', dateOfBirth: '1991-01-22', profileImage: 'https://i.pravatar.cc/150?img=59', state: 'Wyoming', isActive: true },
  { id: '16', fullName: 'Karen Garcia', gender: 'Female', dateOfBirth: '1989-08-09', profileImage: 'https://i.pravatar.cc/150?img=24', state: 'North Dakota', isActive: true },
  { id: '17', fullName: 'Anthony Martinez', gender: 'Male', dateOfBirth: '1993-05-16', profileImage: 'https://i.pravatar.cc/150?img=68', state: 'South Dakota', isActive: true },
  { id: '18', fullName: 'Betty Robinson', gender: 'Female', dateOfBirth: '1987-12-03', profileImage: 'https://i.pravatar.cc/150?img=16', state: 'Nebraska', isActive: false },
  { id: '19', fullName: 'Mark Clark', gender: 'Male', dateOfBirth: '1994-09-27', profileImage: 'https://i.pravatar.cc/150?img=52', state: 'Kansas', isActive: true },
  { id: '20', fullName: 'Sandra Rodriguez', gender: 'Female', dateOfBirth: '1990-02-14', profileImage: 'https://i.pravatar.cc/150?img=44', state: 'Oklahoma', isActive: true },
  { id: '21', fullName: 'Paul Lewis', gender: 'Male', dateOfBirth: '1986-07-19', profileImage: 'https://i.pravatar.cc/150?img=54', state: 'Arkansas', isActive: true },
  { id: '22', fullName: 'Donna Walker', gender: 'Female', dateOfBirth: '1992-04-11', profileImage: 'https://i.pravatar.cc/150?img=28', state: 'Louisiana', isActive: true },
  { id: '23', fullName: 'Steven Hall', gender: 'Male', dateOfBirth: '1988-11-06', profileImage: 'https://i.pravatar.cc/150?img=70', state: 'Mississippi', isActive: false },
  { id: '24', fullName: 'Carol Allen', gender: 'Female', dateOfBirth: '1995-08-23', profileImage: 'https://i.pravatar.cc/150?img=25', state: 'Alabama', isActive: true },
  { id: '25', fullName: 'Kevin Young', gender: 'Male', dateOfBirth: '1991-05-30', profileImage: 'https://i.pravatar.cc/150?img=67', state: 'Tennessee', isActive: true },
  { id: '26', fullName: 'Michelle King', gender: 'Female', dateOfBirth: '1989-01-18', profileImage: 'https://i.pravatar.cc/150?img=38', state: 'Kentucky', isActive: true },
  { id: '27', fullName: 'Brian Wright', gender: 'Male', dateOfBirth: '1993-10-07', profileImage: 'https://i.pravatar.cc/150?img=71', state: 'Ohio', isActive: true },
  { id: '28', fullName: 'Laura Lopez', gender: 'Female', dateOfBirth: '1987-06-15', profileImage: 'https://i.pravatar.cc/150?img=29', state: 'Indiana', isActive: false },
  { id: '29', fullName: 'George Hill', gender: 'Male', dateOfBirth: '1994-03-02', profileImage: 'https://i.pravatar.cc/150?img=65', state: 'Michigan', isActive: true },
  { id: '30', fullName: 'Dorothy Scott', gender: 'Female', dateOfBirth: '1990-12-28', profileImage: 'https://i.pravatar.cc/150?img=41', state: 'Wisconsin', isActive: true },
  { id: '31', fullName: 'Edward Green', gender: 'Male', dateOfBirth: '1986-09-13', profileImage: 'https://i.pravatar.cc/150?img=69', state: 'Minnesota', isActive: true },
  { id: '32', fullName: 'Sharon Adams', gender: 'Female', dateOfBirth: '1992-07-21', profileImage: 'https://i.pravatar.cc/150?img=31', state: 'Iowa', isActive: true },
  { id: '33', fullName: 'Ronald Baker', gender: 'Male', dateOfBirth: '1988-04-09', profileImage: 'https://i.pravatar.cc/150?img=66', state: 'Missouri', isActive: false },
  { id: '34', fullName: 'Kimberly Nelson', gender: 'Female', dateOfBirth: '1995-01-26', profileImage: 'https://i.pravatar.cc/150?img=43', state: 'Georgia', isActive: true },
  { id: '35', fullName: 'Thomas Carter', gender: 'Male', dateOfBirth: '1991-11-14', profileImage: 'https://i.pravatar.cc/150?img=57', state: 'North Carolina', isActive: true },
];

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    
    // Force reload with 35 employees if we have old data with less than 35
    if (savedEmployees) {
      const parsed = JSON.parse(savedEmployees);
      if (parsed.length < 35) {
        // Old data detected, load fresh 35 employees
        console.log('Loading fresh 35 employees...');
        setEmployees(initialEmployees);
        localStorage.setItem('employees', JSON.stringify(initialEmployees));
      } else {
        setEmployees(parsed);
      }
    } else {
      setEmployees(initialEmployees);
      localStorage.setItem('employees', JSON.stringify(initialEmployees));
    }
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const addEmployee = (employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, employeeData: EmployeeFormData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...employeeData, id } : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const getEmployeeById = (id: string): Employee | undefined => {
    return employees.find((emp) => emp.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
