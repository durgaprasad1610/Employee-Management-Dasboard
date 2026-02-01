export type Employee = {
    id: string;
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    profileImage: string;
    state: string;
    isActive: boolean;
  };
  
  export type EmployeeFormData = {
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    profileImage: string;
    state: string;
    isActive: boolean;
  };
  