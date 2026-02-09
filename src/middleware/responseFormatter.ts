import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { IResponse } from './interface/middleware.interface';

interface MetaData {
  meta?: unknown;
  data?: unknown;
}

function hasMeta(obj: unknown): obj is MetaData {
  return obj !== null && typeof obj === 'object' && 'meta' in obj;
}

export function responseFormatter(_req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json.bind(res);

  res.json = function <T = unknown>(this: Response, data: T): Response {
    const statusCode = this.statusCode ?? StatusCodes.OK;
    const successCondition = statusCode >= 200 && statusCode < 300;

    const response: IResponse = {
      status: successCondition ? 'Success' : 'Error',
      statusCode,
      message: getReasonPhrase(statusCode),
    };

    if (successCondition) {
      if (hasMeta(data) && data.meta) {
        response.data = data.data;
      } else {
        response.data = data;
      }
    }

    if (statusCode >= 300) {
      response.error = data;
    }

    if (hasMeta(data) && data.meta) {
      response.meta = data.meta;
    }

    return originalJson.call(this, response);
  }.bind(res);

  next();
}
