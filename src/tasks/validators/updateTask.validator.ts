import { checkSchema } from "express-validator";

export const upateTaskValidator = checkSchema({
	_id: {
		in: ['body'],
		notEmpty: true,
		errorMessage: "Valid document id  is Required",
		isMongoId: true
	},
	title: {
		in: ['body'],//,"query",
		optional: true,
		errorMessage: "Title is Required",
		isString: true,//string
		isLength: { options: { max: 100 }, errorMessage: "Title must be less than 100 characters" },
		trim: true, //trim removes whitespace from the beginning and end of a string.
	},
	description: {
		in: ['body'],
		optional: true,
		errorMessage: "Description is Required",
		isString: true,//string
		trim: true
	},
	status: {
		in: ['body'],
		optional: true,
		isIn: {
			options: [['todo', 'inProgress', 'completed']]
		}
	},
	priority: {
		in: ['body'],
		optional: true,
		isIn: {
			options: [['high', 'normal', 'low']]
		}
	},
	dueDate: {
		in: ['body'],
		optional: true,
		isISO8601: true
	}
}
);