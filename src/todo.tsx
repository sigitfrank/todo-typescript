export interface TodosInterface {
    todos: {
        id: number
        todo: string
        isFinished: boolean
    }[]
}

export interface TodoInterface {
    id?: number
    todo: string
    isFinished: boolean
}

const todos: TodosInterface['todos'] = [
    {
        id: 1,
        todo: 'Learn TypeScript',
        isFinished: false
    }
]

export default todos