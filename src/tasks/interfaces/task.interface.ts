
type ItaskStatus = 'todo' | 'inProgress' | 'completed';
type Itaskpriority = 'low' | 'normal' | 'high';

export interface Itask {
	title: string,
	description: string;
	status: ItaskStatus;
	priority: Itaskpriority;
	dueDate: Date;
}