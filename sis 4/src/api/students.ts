import { api } from './client';
import type { Page, Student, Task } from '@/types/student';

const FIELDS = 'firstName,lastName,age,gender,email,phone,image,university,birthDate';

export async function getStudents(page: number, size: number, query = ''): Promise<Page<Student>> {
  const url = query ? '/users/search' : '/users';
  const { data } = await api.get<{ users: Student[]; total: number }>(url, {
    params: { q: query || undefined, limit: size, skip: (page - 1) * size, select: FIELDS },
  });
  return { items: data.users, total: data.total };
}

export async function getStudent(id: number): Promise<Student> {
  const { data } = await api.get<Student>(`/users/${id}`, { params: { select: FIELDS } });
  return data;
}

export async function getStudentTasks(id: number): Promise<Task[]> {
  const { data } = await api.get<{ todos: Task[] }>(`/users/${id}/todos`);
  return data.todos;
}

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<{ todos: Task[] }>('/todos', { params: { limit: 0 } });
  return data.todos;
}
