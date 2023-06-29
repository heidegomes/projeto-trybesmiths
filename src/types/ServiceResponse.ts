import { Token } from './Token';

type ServiceResponseErrorType = 'UNAUTHORIZED' | 'NOT_FOUND' | 'INVALID_DATA';
type ServiceResponseSuccessType = 'OK';

type SuccessStatusCode = 200;
type ErrorStatusCode = 400 | 404 | 401 | 403 | 500;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  message: string,
  statusCode: ErrorStatusCode
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccessType,
  message: T,
  statusCode: SuccessStatusCode
};

export type ServiceResponse = ServiceResponseError | ServiceResponseSuccess<Token>;