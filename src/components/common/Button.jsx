import React from 'react';
import styles from './Button.module.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    size !== 'md' && styles[`button--${size}`],
    loading && styles['button--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {icon && !loading && <span>{icon}</span>}
      {children}
    </button>
  );
}
