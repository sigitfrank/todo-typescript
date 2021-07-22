import React, { useState } from 'react';
import todos, { TodosInterface, TodoInterface } from './todo';



function App() {
  const [todosState, setTodosState] = useState<TodosInterface['todos']>(todos)
  const [todo, setTodo] = useState<TodoInterface>({ todo: '', isFinished: false })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => setTodo({ ...todo, [e.target.name]: e.target.value })
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!todo.todo) return alert('Todo cannot be empty')
    setTodosState([...todosState, {
      id: todosState.length + 1,
      ...todo,
    }])
  }

  const handleFinished = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.dataset.id
    if (!id) return
    const getTodo = todosState.find(todo => todo.id === +id)
    const filteredTodo = todosState.filter(todo => todo.id !== +id)
    if (!getTodo) return
    getTodo.isFinished = !getTodo.isFinished
    setTodosState([...filteredTodo, getTodo])
  }

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = e.currentTarget.dataset.id
    if (!id) return
    setTodosState(todosState.filter(todo => todo.id !== +id))
  }
  const renderList = (): JSX.Element[] => {
    return todosState && todosState.map(todo => (
      <li key={todo.id}>
        <span className="me-4" data-id={todo.id} onClick={(e) => handleDelete(e)}>{todo.todo}</span>
        <input type="checkbox" checked={todo.isFinished ? true : false} data-id={todo.id} name="isFinished" onChange={handleFinished} />
      </li>
    ))
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="mb-3">
              <label htmlFor="todo" className="form-label">Todo</label>
              <input type="text" className="form-control" id="todo" name="todo" onChange={onChangeHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <div className="row row justify-content-center">
        <div className="col-md-5">
          <ul className="mt-5">
            {renderList()}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App;
