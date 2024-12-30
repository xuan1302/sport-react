import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import './style.css';

const GlobalLoading = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="global-loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalLoading;