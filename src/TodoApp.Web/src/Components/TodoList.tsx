/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { PlusOutlined, CheckCircleOutlined, UnorderedListOutlined, InboxOutlined } from '@ant-design/icons';
import { Input, Button, Card, Tabs, List, Typography, Space, notification } from 'antd';
import covergexLog from '../assets/coveragexlogo.png';
import './TodoList.css';

const { TextArea } = Input;
const { TabPane } = Tabs;

interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt?: Date;
}

const TASKS_LIMIT = 5;

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [, setActiveTab] = useState<string>('pending');

    const fetchTasks = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5160/api/Tasks');
            const data = await response.json();
            // Sort tasks by creation date in descending order
            const sortedData = Array.isArray(data)
                ? data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
                : [];
            setTasks(sortedData);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to fetch tasks. Please try again later.',
                placement: 'topRight',
                duration: 4,
            });
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (): Promise<void> => {
        if (!title.trim() || !description.trim()) {
            notification.warning({
                message: 'Warning',
                description: 'Please enter both task title and description.',
                placement: 'topRight',
                duration: 3,
            });
            return;
        }

        setLoading(true);
        try {
            await fetch('http://localhost:5160/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    createdAt: new Date()
                }),
            });
            setTitle('');
            setDescription('');
            notification.success({
                message: 'Success',
                description: 'Task added successfully!',
                placement: 'topRight',
                duration: 3,
                icon: <PlusOutlined style={{ color: '#52c41a' }} />,
            });

            setTimeout(() => fetchTasks(), 500);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to add task. Please try again.',
                placement: 'topRight',
                duration: 4,
            });
        }
        setLoading(false);
    };


    const handleComplete = async (id: number): Promise<void> => {
        try {
            await fetch(`http://localhost:5160/api/tasks/${id}/complete`, { method: 'PUT' });
            fetchTasks();
            notification.success({
                message: 'Task Completed',
                description: 'Task has been marked as completed!',
                placement: 'topRight',
                duration: 3,
                icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to complete task. Please try again.',
                placement: 'topRight',
                duration: 4,
            });
        }
    };

    // Get only the 5 most recent tasks for each category
    const pendingTasks = tasks
        .filter(task => !task.isCompleted)
        .slice(0, TASKS_LIMIT);

    const completedTasks = tasks
        .filter(task => task.isCompleted)
        .slice(0, TASKS_LIMIT);

    return (
        <div className="todo-container">
            <div className="logo-container">
                <img src={covergexLog} alt="covergex logo" className="logo-image" />
                <h1 className="app-title">To-Do App</h1>
            </div>
            <div className="count-cards-container">
                <Card className={`count-card count-card-pending`}>
                    <Typography.Title level={1} className="count-value">
                        {pendingTasks.length}
                    </Typography.Title>
                    <Typography.Text className="count-label">Recent Pending</Typography.Text>
                </Card>

                <Card className={`count-card count-card-completed`}>
                    <Typography.Title level={1} className="count-value">
                        {completedTasks.length}
                    </Typography.Title>
                    <Typography.Text className="count-label">Recent Completed</Typography.Text>
                </Card>
            </div>

            <Card
                title={<Space><PlusOutlined /> Add New Task</Space>}
                className="add-task-card"
            >
                <Input
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="task-input"
                />
                <TextArea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="task-input"
                />
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    block
                    className="add-task-button"
                >
                    Add Task
                </Button>
            </Card>

            <Tabs defaultActiveKey="pending" onChange={setActiveTab} className="tabs-container">
                <TabPane
                    tab={
                        <Space>
                            <UnorderedListOutlined /> Recent Pending Tasks
                            <Typography.Text type="secondary">({TASKS_LIMIT} most recent)</Typography.Text>
                        </Space>
                    }
                    key="pending"
                >
                    <List
                        bordered
                        className="task-list"
                        dataSource={pendingTasks}
                        renderItem={(task) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="primary"
                                        onClick={() => handleComplete(task.id)}
                                        className="complete-button"
                                    >
                                        <CheckCircleOutlined />Complete
                                    </Button>,
                                ]}
                            >
                                <div className="task-item">
                                    <Typography.Text className='task-title'>{task.title}</Typography.Text>
                                    <Typography.Text>{task.description}</Typography.Text>
                                </div>
                            </List.Item>
                        )}
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <InboxOutlined /> Recent Completed Tasks
                            <Typography.Text type="secondary">({TASKS_LIMIT} most recent)</Typography.Text>
                        </Space>
                    }
                    key="completed"
                >
                    <List
                        bordered
                        className="task-list"
                        dataSource={completedTasks}
                        renderItem={(task) => (
                            <List.Item>
                                <Typography.Text delete>{task.title}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TodoList;