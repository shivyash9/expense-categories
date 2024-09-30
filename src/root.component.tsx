import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseCategoriesList from './components/ExpenseCategoriesList';
import ExpenseCategoriesForm from './components/ExpenseCategoriesForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/expense-categories" element={<ExpenseCategoriesList />} />
        <Route path="/expense-categories/new" element={<ExpenseCategoriesForm />} />
        <Route path="/expense-categories/edit/:id" element={<ExpenseCategoriesForm />} />
      </Routes>
    </Router>
  );
};

export default App;
