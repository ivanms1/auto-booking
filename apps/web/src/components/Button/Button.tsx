import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'dark' | 'danger' | 'warning' | 'light',
  outline?: boolean,
  size?: 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, variant = 'primary', outline = false, size = 'md', className, ...props }: ButtonProps) {

  return <button className={classNames(styles.button, styles[variant], styles[size], {[styles.outline]: outline}, className)} {...props}>{children}</button>;
}

export default Button;
