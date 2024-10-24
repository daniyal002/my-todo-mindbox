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
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={completed}
        onChange={() => toggleCompletion(id)}
      />
      <span className={`${styles.text} ${completed ? styles.completed : ''}`}>
        {text}
      </span>
      <button className={styles.deleteButton} onClick={() => deleteTask(id)}>
        Удалить
      </button>
    </li>
  );
};

export default ToDoItem;