import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Импортируем расширение
import ToDoList from '../module/ToDo/ToDoList/ToDoList';

describe('ToDoList Component', () => {
  test('should add a task', () => {
    render(<ToDoList />);

    const input = screen.getByPlaceholderText('Введите задачу') as HTMLInputElement;
    const button = screen.getByText('Добавить задачу');

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(button);

    expect(screen.getByText('Новая задача')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('should toggle task completion', () => {
    render(<ToDoList />);

    const input = screen.getByPlaceholderText('Введите задачу');
    const button = screen.getByText('Добавить задачу');
    const buttonTabComplited = screen.getByText("Завершенные задачи")

    fireEvent.change(input, { target: { value: 'Задача для теста' } });
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(buttonTabComplited);

    expect(screen.getByText('Задача для теста')).toHaveClass('completed');
  });

  test('should delete a task', () => {
    render(<ToDoList />);

    const input = screen.getByPlaceholderText('Введите задачу');
    const button = screen.getByText('Добавить задачу');

    fireEvent.change(input, { target: { value: 'Задача для удаления' } });
    fireEvent.click(button);

    const deleteButton = screen.getByText('Удалить'); // Предполагаем, что вы добавили кнопку удаления в ToDoItem
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Задача для удаления')).not.toBeInTheDocument();
  });

  test('should display task counts', () => {
    render(<ToDoList />);

    const input = screen.getByPlaceholderText('Введите задачу');
    const button = screen.getByText('Добавить задачу');

    fireEvent.change(input, { target: { value: 'Первая задача' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'Вторая задача' } });
    fireEvent.click(button);

    expect(screen.getByText('Всего задач: 2')).toBeInTheDocument();
    expect(screen.getByText('Незавершенных задач: 2')).toBeInTheDocument();
    expect(screen.getByText('Завершенных задач: 0')).toBeInTheDocument();
  });
});