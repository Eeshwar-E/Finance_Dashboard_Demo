import React, { useState, useEffect } from 'react';
import { Input, Select, Textarea, Button } from '../common';
import { categories } from '../../data/mockData';
import styles from './TransactionForm.module.css';

const initialFormState = {
  type: 'expense',
  amount: '',
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
};

export function TransactionForm({ transaction, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [transaction]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const categoryOptions = categories.filter(
    (c) => c.value !== 'all' && (formData.type === 'income' ? ['Salary', 'Investments', 'Freelance', 'Other'].includes(c.value) : !['Salary', 'Investments', 'Freelance'].includes(c.value))
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          Transaction Type
        </label>
        <div className={styles.typeToggle}>
          <button
            type="button"
            className={`${styles.typeOption} ${
              formData.type === 'income' ? `${styles['typeOption--active']} ${styles['typeOption--income']}` : ''
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, type: 'income', category: '' }))}
          >
            <svg className={styles.typeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            Income
          </button>
          <button
            type="button"
            className={`${styles.typeOption} ${
              formData.type === 'expense' ? `${styles['typeOption--active']} ${styles['typeOption--expense']}` : ''
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, type: 'expense', category: '' }))}
          >
            <svg className={styles.typeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            Expense
          </button>
        </div>
      </div>

      <div className={styles.formRow}>
        <Input
          label="Amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          placeholder="Select category"
          error={errors.category}
        />
      </div>

      <Textarea
        label="Description"
        name="description"
        placeholder="Enter transaction description..."
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />

      <Input
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
      />

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {transaction ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
}
