import React from 'react';
import styles from './Input.module.css';

export function Input({
  label,
  error,
  helpText,
  type = 'text',
  className = '',
  ...props
}) {
  const inputClass = [
    styles.input,
    error && styles['input--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input type={type} className={inputClass} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
      {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
}

export function Select({
  label,
  error,
  options = [],
  placeholder,
  className = '',
  ...props
}) {
  const selectClass = [
    styles.input,
    styles.select,
    error && styles['input--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={selectClass} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.icon && `${opt.icon} `}{opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helpText,
  className = '',
  ...props
}) {
  const textareaClass = [
    styles.input,
    styles.textarea,
    error && styles['input--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={textareaClass} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
      {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
}
