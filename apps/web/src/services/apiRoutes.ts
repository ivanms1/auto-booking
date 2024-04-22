export const API_ROUTES = {
  cars: {
    list: '/cars',
    detail: '/cars/:id',
    create: '/cars',
    update: '/cars/:id',
    delete: '/cars/:id',
  },
  rooms: {
    list: '/rooms',
    detail: '/rooms/:id',
    create: '/rooms',
    update: '/rooms/:id',
    delete: '/rooms/:id',
  },
  bookings: {
    list: '/bookings',
    detail: '/bookings/:id',
    create: '/bookings',
    update: '/bookings/:id',
    delete: '/bookings/:id',
  },
  users: {
    list: '/users',
    detail: '/users/:id',
    create: '/users',
    update: '/users/:id',
    delete: '/users/:id',
  },
} as const;
