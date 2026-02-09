import { model, Model, Schema } from 'mongoose';
import { Itask } from '../interfaces/task.interface';

const taskSchema: Schema<Itask> = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    status: {
      type: 'string',
      required: true,
      enum: ['todo', 'inProgress', 'completed'],
      default: 'todo',
    },
    priority: {
      type: 'string',
      required: true,
      enum: ['low', 'normal', 'high'],
      default: 'normal',
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const Task: Model<Itask> = model('Task', taskSchema);
