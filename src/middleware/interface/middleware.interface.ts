export interface IResponse {
  status: 'Success' | 'Error';
  statusCode: number;
  message: string;
  data?: unknown;
  error?: unknown;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
