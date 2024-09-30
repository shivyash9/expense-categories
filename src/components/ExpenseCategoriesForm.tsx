import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ExpenseCategoriesForm.css';

const ExpenseCategoriesForm: React.FC = () => {
  const [name, setName] = useState<string>(''); 
  const [description, setDescription] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  useEffect(() => {
    if (id) {
      fetchExpenseCategory(id); 
    }
  }, [id]);

  const fetchExpenseCategory = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/expense_categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (err) {
      setError('Failed to fetch expense category.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { name, description };
      if (id) {
        await axios.patch(`http://localhost:3000/api/expense_categories/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:3000/api/expense_categories', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/expense-categories'); 
    } catch (err) {
      setError('Failed to submit expense category.');
    }
  };

  return (
    <div className="expense-category-form-container">
      <h2>{id ? 'Edit Expense Category' : 'Add New Expense Category'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="expense-category-form">
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Category' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseCategoriesForm;
