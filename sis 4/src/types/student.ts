export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
  university: string;
  birthDate: string;
}

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface Page<T> {
  items: T[];
  total: number;
}

export interface Stats {
  students: number;
  averageAge: number;
  universities: number;
  tasks: number;
  completed: number;
}
