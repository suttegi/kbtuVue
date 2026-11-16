export interface Task {
    id: number
    title: string
    description: string
    createdAt: string
    completed: boolean
    priority: Priority
    deadline: string
}

export type Priority = 'low' | 'medium' | 'high'