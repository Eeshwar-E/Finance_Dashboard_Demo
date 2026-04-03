import React, { useState, useRef, useEffect } from 'react';
import styles from './Common.module.css';

export function Badge({ children, variant = 'primary' }) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${variant}`]}`}>
      {children}
    </span>
  );
}

export function Card({ children, hoverable = false, onClick, className = '' }) {
  return (
    <div
      className={`${styles.card} ${hoverable ? styles['card--hoverable'] : ''} ${onClick ? styles['card--clickable'] : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function Skeleton({ width, height, variant = 'rect', className = '' }) {
  return (
    <div
      className={`${styles.skeleton} ${variant === 'circle' ? styles['skeleton--circle'] : ''} ${className}`}
      style={{ width, height }}
    />
  );
}

export function EmptyState({ icon, title, text, action }) {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.emptyStateIcon}>{icon}</div>}
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateText}>{text}</p>
      {action}
    </div>
  );
}

export function ProgressBar({ value, max = 100, color = 'var(--color-primary)' }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function Dropdown({ trigger, items, align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={styles.dropdownMenu} style={{ [align]: 0 }}>
          {items.map((item, index) => (
            <button
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
