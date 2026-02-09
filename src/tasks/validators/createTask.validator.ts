import { checkSchema } from 'express-validator';

export const createTaskValidator = checkSchema({
  title: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Title is required',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'Title must be less than 100 characters',
    },
  },
  description: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Description is required',
    },
    isString: {
      errorMessage: 'Description must be a string',
    },
    isLength: {
      options: { max: 1000 },
      errorMessage: 'Description must be less than 1000 characters',
    },
  },
  status: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Status is required',
    },
    isIn: {
      options: [['todo', 'inProgress', 'completed']],
      errorMessage: 'Status must be one of: todo, inProgress, completed',
    },
  },
  priority: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Priority is required',
    },
    isIn: {
      options: [['high', 'normal', 'low']],
      errorMessage: 'Priority must be one of: high, normal, low',
    },
  },
  dueDate: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Due date is required',
    },
    isISO8601: {
      errorMessage: 'Due date must be a valid date (ISO 8601 format)',
    },
  },
});
