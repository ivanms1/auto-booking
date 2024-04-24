import React from 'react';
import styles from './Create.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@/validations/bookingSchema';
//import { useQueries, useQuery } from '@tanstack/react-query';
//import { bookingQueryKeys } from '@/services/Create/request';
type Inputs = {
  reservationtitle: string,
  startdate: Date,
  startdatehour: Date,
  enddate: Date,
  enddatehour: Date,
  roomcar: string,
  description: string
}

function CreateBookings() {
  const { register, handleSubmit} = useForm<Inputs>({
    resolver: zodResolver(bookingSchema),
  })
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Create a Booking</h1>
      <div className={styles.line}></div>
      <div className={styles.mainBox}>
        <p className={styles.formTitle}>Booking Form</p>
        <div className={styles.line2}></div>
        <form className={styles.form} onSubmit={handleSubmit(data => {console.log(data);
        })}>
        <div className={styles.input1}>
          <label className={styles.formP}>Reservation Title</label>
          <Input className={styles.inputForm}  type='text' placeholder='Reservation Title (Person, Ministry, Activity)' id='reservationtitle' {...register("reservationtitle")} />
        </div>
        <div className={styles.input1}>
          <label className={styles.formP}>Start date</label>
          <Input className={styles.inputForm2} type='date' id='startdate' {...register('startdate')}/>
          <Input className={styles.inputForm2} type='time' id='startdatehour' {...register('startdatehour')}/>
        </div>
        <div className={styles.input1}>
          <label className={styles.formP}>End date</label>
          <Input className={styles.inputForm2} type='date' id='enddate' {...register('enddate')}/>
          <Input className={styles.inputForm2} type='time' id='enddatehour' {...register('enddatehour')}/>
        </div>
        <div className={styles.input1}>
          <label className={styles.formP}>Add Room or Car</label>
          <Input className={styles.inputForm} type='text' placeholder='Room or Car' id='roomcar' {...register('roomcar')}/>
        </div>
        <div className={styles.input1}>
          <label className={styles.formP}>Description</label>
          <Input className={styles.inputForm} type='text' placeholder='Some description about reservation' id='description' {...register('description')}/>
        </div>
        <Button className={styles.submitButton} type='submit'>Submit</Button>
        </form>
        
      </div>
    </div>
  );
}

export default CreateBookings;
