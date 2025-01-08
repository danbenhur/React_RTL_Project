import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <AddTaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} />
    </div>
  );
};

export default App;
