export const API_ROUTES = {
  cars: {
    list: '/cars',
    detail: '/cars/:id',
    create: '/cars',
    update: '/cars/:id',
    delete: '/cars/:id',
  },
} as const;
