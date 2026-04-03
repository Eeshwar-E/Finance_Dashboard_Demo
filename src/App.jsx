import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout';
import { ToastContainer } from './components/common';
import { DashboardView, TransactionsView, InsightsView } from './views';
import { TransactionForm } from './components/transactions';
import { Modal, showToast } from './components/common';
import { useApp } from './context/AppContext';

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard');
  const { state, dispatch } = useApp();

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleSubmit = (data) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: data });
    showToast(dispatch, 'success', 'Added', 'New transaction added successfully');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={handleNavigate} />;
      case 'transactions':
        return <TransactionsView />;
      case 'insights':
        return <InsightsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={handleNavigate}>
      {renderView()}
      
      <Modal
        isOpen={state.modalOpen}
        onClose={handleCloseModal}
        title="Add Transaction"
      >
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
      
      <ToastContainer />
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
