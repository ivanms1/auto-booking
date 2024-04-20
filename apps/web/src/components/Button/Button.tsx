import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode,
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'dark' | 'danger' | 'warning' | 'light',
  className?: string,
  outline?: boolean,
  size?: 'md' | 'lg'
}

function Button({ children, variant = 'primary', outline = false, size = 'md', className }: ButtonProps) {

  return <button className={classNames(styles.button, styles[variant], styles[size], {[styles.outline]: outline}, className)}>{children}</button>;
}

export default Button;
