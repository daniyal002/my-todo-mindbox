import React, { useState } from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import styles from './ToDoList.module.css'; // Импорт стилей

interface ToDoItem {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [activeTab, setActiveTab] = useState<'notCompleted' | 'completed'>('notCompleted');

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, text: newTaskText, completed: false },
    ]);
    setNewTaskText(""); // Очищаем поле ввода после добавления
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.addTask}>
      <input
        type="text"
        className={styles.input}
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Введите задачу"
      />
      <button className={styles.button} onClick={addTask}>Добавить задачу</button>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabsNoComplited} ${activeTab === 'notCompleted' ? styles.active : ''}`}
          onClick={() => setActiveTab('notCompleted')}
          data-parent={tasks.filter(task => task.completed === false).length}
        >
          Задачи
        </button>
        <button
          className={`${styles.tabsComplited} ${activeTab === 'completed' ? styles.active : ''}`}
          onClick={() => setActiveTab('completed')}
          data-parent={tasks.filter(task => task.completed === true).length}

        >
          Завершенные задачи
        </button>
      </div>

      <h2>{activeTab === 'notCompleted' ? 'Задачи' : 'Завершенные задачи'}</h2>
      <ul>
        {tasks
          .filter(task => activeTab === 'notCompleted' ? !task.completed : task.completed)
          .map((task) => (
            <ToDoItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              toggleCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          ))}
      </ul>

      <footer className={styles.footer}>
        <p>Всего задач: {tasks.length}</p>
        <p>Незавершенных задач: {tasks.filter(task => task.completed  === false).length}</p>
        <p>Завершенных задач: {tasks.filter(task => task.completed  === true).length}</p>


      </footer>
    </div>
  );
};

export default ToDoList;