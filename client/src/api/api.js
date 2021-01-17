import {HttpClient} from './httpClient' 

const API = 'http://localhost:3000/'
const TODO_API = `${API}todo`

//Create
const createTodo = data => {
    return HttpClient.post(`${TODO_API}/create`, data)
}

//Read
const getTodo = () => {
    return HttpClient.get(`${TODO_API}/list`)
}

//Update
const updateTodo = data => {
    return HttpClient.put(`${TODO_API}/update`, data)
}

//Delete
const removeTodo = data => {
    return HttpClient.delete(`${TODO_API}/delete/${data._id}`)
}

const TodoApi = {createTodo, getTodo, updateTodo, removeTodo}
export {TodoApi}