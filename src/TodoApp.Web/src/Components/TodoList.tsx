/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { PlusOutlined, CheckCircleOutlined, UnorderedListOutlined, InboxOutlined } from '@ant-design/icons';
import { Input, Button, Card, Tabs, List, Typography, message, Space } from 'antd';

const { TextArea } = Input;
const { TabPane } = Tabs;

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setActiveTab] = useState('pending');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5160/api/Tasks');
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error('Failed to fetch tasks');
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      setTitle('');
      setDescription('');
      fetchTasks();
      message.success('Task added successfully');
    } catch (error) {
      message.error('Failed to add task');
    }
    setLoading(false);
  };

  const handleComplete = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}/complete`, { method: 'PUT' });
      fetchTasks();
      message.success('Task marked as completed');
    } catch (error) {
      message.error('Failed to complete task');
    }
  };

  const pendingTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px' }}>
      <Card
        title={<Space><PlusOutlined /> Add New Task</Space>}
        style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
      >
        <Input 
          placeholder="Task title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ marginBottom: '10px' }}
        />
        <TextArea 
          placeholder="Task description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows={3} 
          style={{ marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleSubmit} loading={loading} block>
          Add Task
        </Button>
      </Card>

      <Tabs defaultActiveKey="pending" onChange={setActiveTab} style={{ marginTop: '20px' }}>
        <TabPane 
          tab={<Space><UnorderedListOutlined /> Pending Tasks</Space>} 
          key="pending"
        >
          <List
            bordered
            dataSource={pendingTasks}
            renderItem={(task) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleComplete(task.id)}><CheckCircleOutlined />Complete</Button>
                ]} 
              > 
                <Typography.Text>{task.title}</Typography.Text>
              </List.Item>
            )}
          />
        </TabPane>
        
        <TabPane 
          tab={<Space><InboxOutlined /> Completed</Space>} 
          key="completed"
        >
          <List
            bordered
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
