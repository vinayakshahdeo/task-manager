import { model, Model, Schema } from "mongoose";
import { Itask } from "../interfaces/task.interface";

const taskSchema: Schema<Itask> = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		maxLength: [100, 'Title must be less than 100 characters'],
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		maxLength: [1000, 'Description must be less than 1000 characters'],
	},
	status: {
		type: 'string',
		required: true,
		enum: ['todo', 'inProgress', 'completed'],
		default: 'todo'
	},
	priority: {
		type: 'string',
		required: true,
		enum: ['low', 'normal', 'high'],
		default: 'normal'
	},
	dueDate: {
		type: Date,
		required: true
	},
}, { timestamps: true });

export const Task: Model<Itask> = model('Task', taskSchema);

