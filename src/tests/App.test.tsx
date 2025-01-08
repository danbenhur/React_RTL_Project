import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import React from 'react';

describe('App Component', () => {
  test('renders Task Manager heading', () => {
    render(<App />);
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
  });

  test('adds a new task', async () => {
    render(<App />);

    // Find the input and button elements
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add task/i);

    // Simulate typing and clicking the Add Task button
    await userEvent.type(input, 'Test Task');
    await userEvent.click(addButton);

    // Verify the task is added to the list
    const newTask = await screen.findByText(/Test Task/i); // Async to ensure the DOM is updated
    expect(newTask).toBeInTheDocument();
  });

  test('marks a task as completed', async () => {
    render(<App />);

    // Add a task first
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add task/i);

    await userEvent.type(input, 'Complete Me');
    await userEvent.click(addButton);

    // Mark the task as completed
    const completeButton = await screen.findByText(/Complete/i); // Wait for the Complete button
    await userEvent.click(completeButton);

    // Verify the task is marked as completed
    const completedTask = await screen.findByText(/Complete Me/i);
    expect(completedTask).toHaveStyle('text-decoration: line-through');
  });
});
