import { z } from 'zod';

export const bookingSchema = z.object({
  reservationtitle: z.string(),
  startdate: z.date(),
  startdatehour: z.date(),
  enddate: z.date(),
  enddatehour: z.date(),
  roomcar: z.string(),
  description: z.string()
});
