import React from 'react';
import styles from './Input.module.css'

function Input ({ placeholder }: { placeholder: string }) {
  
  return (
    <input className={styles.input} placeholder={placeholder} />
  )
}



export default Input