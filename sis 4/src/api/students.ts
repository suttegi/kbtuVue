import { api } from './client';
import type { Page, Stats, Student, Task } from '@/types/student';

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

export async function getStats(): Promise<Stats> {
  const [users, todos] = await Promise.all([
    api.get<{ users: Pick<Student, 'id' | 'age' | 'university'>[] }>('/users', {
      params: { limit: 0, select: 'age,university' },
    }),
    getTasks(),
  ]);
  const list = users.data.users;
  const ages = list.reduce((sum, s) => sum + s.age, 0);
  return {
    students: list.length,
    averageAge: list.length ? Math.round(ages / list.length) : 0,
    universities: new Set(list.map((s) => s.university)).size,
    tasks: todos.length,
    completed: todos.filter((t) => t.completed).length,
  };
}
