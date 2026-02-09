import { checkSchema } from 'express-validator';

export const upateTaskValidator = checkSchema({
  _id: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Task ID is required',
    },
    isMongoId: {
      errorMessage: 'Valid MongoDB ObjectId is required',
    },
  },
  title: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'Title must be a string',
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'Title must be less than 100 characters',
    },
    trim: true,
  },
  description: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'Description must be a string',
    },
    isLength: {
      options: { max: 1000 },
      errorMessage: 'Description must be less than 1000 characters',
    },
    trim: true,
  },
  status: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isIn: {
      options: [['todo', 'inProgress', 'completed']],
      errorMessage: 'Status must be one of: todo, inProgress, completed',
    },
  },
  priority: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isIn: {
      options: [['high', 'normal', 'low']],
      errorMessage: 'Priority must be one of: high, normal, low',
    },
  },
  dueDate: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isISO8601: {
      errorMessage: 'Due date must be a valid date (ISO 8601 format)',
    },
  },
});
