/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

interface CreateTaskDto {
    title: string;
    description: string;
}

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchTasks = async () => {
        const response = await axios.get<Task[]>('/api/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: CreateTaskDto = { title, description };
        await axios.post('/api/tasks', newTask);
        setTitle('');
        setDescription('');
        fetchTasks();
    };

    const handleComplete = async (id: string) => {
        await axios.put(`/api/tasks/${id}/complete`);
        fetchTasks();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Todo List</h1>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task description"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Task
                </button>
            </form>

            <div className="grid gap-4">
                {/* {tasks.map((task) => (
                    <div key={task.id} className="border p-4 rounded">
                        <h2 className="text-xl font-semibold">{task.title}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <button
                            onClick={() => handleComplete(task.id)}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Done
                        </button>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default TodoList;