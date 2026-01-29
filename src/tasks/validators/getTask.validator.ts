import { checkSchema } from "express-validator";

export const getTasksValidator = checkSchema({
	limit: {
		in: ['query'],
		optional: true,
		isInt: {
			options: { min: 1 }
		},
		toInt: true	//converts the value to an integer
	},
	page: {
		in: ['query'],
		optional: true,
		isInt: {
			options: { min: 1 }
		},
		toInt: true	//converts the value to an integer
	},
	order: {
		in: ['query'],
		optional: true,
		isIn: {
			options: [['asc', 'desc']]
		}
	}
});