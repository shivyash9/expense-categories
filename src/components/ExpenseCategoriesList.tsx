import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ExpenseCategoriesList.css';

const ExpenseCategoriesList: React.FC = () => {
  const [expenseCategories, setExpenseCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchExpenseCategories();
  }, []);

  const fetchExpenseCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expense_categories', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenseCategories(response.data);
    } catch (err) {
      setError('Failed to fetch expense categories.');
    }
  };

  const handleDeleteExpenseCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/expense_categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchExpenseCategories(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete expense category.');
    }
  };

  return (
    <div className="expense-category-container">
      <h2>Expense Category Management</h2>
      {error && <p className="error">{error}</p>}
      <Link to="/expense-categories/new" className="btn btn-primary">Add New Expense Category</Link>
      <table className="expense-category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link to={`/expense-categories/edit/${category.id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDeleteExpenseCategory(category.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseCategoriesList;
