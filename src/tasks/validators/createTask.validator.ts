import { checkSchema } from "express-validator";

export const createTaskvalidator = checkSchema({
	title: {
		in: ['body'],//,"query",
		notEmpty: true,
		errorMessage: "Title is Required",
		isString: true,//string
		isLength: { options: { max: 100 }, errorMessage: "Title must be less than 100 characters" }, trim: true, //trim removes whitespace from the beginning and end of a string.
	},
	description: {
		in: ['body'],
		notEmpty: true,
		errorMessage: "Description is Required",
		trim: true
	},
	status: {
		in: ['body'],
		notEmpty: true,
		isIn: {
			options: [['todo', 'inProgress', 'completed']]
		}
	},
	priority: {
		in: ['body'],
		notEmpty: true,
		isIn: {
			options: [['high', 'normal', 'low']]
		}
	},
	dueDate: {
		in: ['body'],
		notEmpty: true,
		isISO8601: true
	}
}
);