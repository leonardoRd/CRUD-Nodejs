import axios from "./axios";

const API = 'http://localhost:4000/api'

export const getTasksRequest = () => axios.get(`/task`);

export const getTaskRequest = id => axios.get(`/task/${id}`);

export const createTaskRequest = task => axios.post(`/task`, task);

export const updateTaskRequest = (id, task) => axios.put(`/task/${id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`)

