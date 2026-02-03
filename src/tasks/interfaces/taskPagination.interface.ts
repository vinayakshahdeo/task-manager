export interface ITaskpagination {
	limit: number;
	page: number;
	order: 'asc' | 'desc';
}