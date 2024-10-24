import React from 'react';
import styles from './ToDoItem.module.css'; // Импорт стилей

interface ToDoItemProps {
  id: number;
  text: string;
  completed: boolean;
  toggleCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  text,
  completed,
  toggleCompletion,
  deleteTask
}) => {
  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        className={styles.todoItem__checkbox}
        checked={completed}
        onChange={() => toggleCompletion(id)}
      />
      <span className={`${styles.todoItem__text} ${completed ? styles.todoItem__text_completed : ''}`}>
        {text}
      </span>
      <button className={styles.todoItem__delete_button} onClick={() => deleteTask(id)}>
        Удалить
      </button>
    </li>
  );
};

export default ToDoItem;