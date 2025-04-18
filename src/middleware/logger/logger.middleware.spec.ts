import { LoggerMiddleware } from './logger.middleware';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    loggerMiddleware = new LoggerMiddleware();

    req = {
      method: 'GET',
      originalUrl: '/test',
    } as Request;
    res = {} as Response;
    next = jest.fn();
  });

  it('should be defined', () => {
    expect(loggerMiddleware).toBeDefined();
  });

  it('should log the request', () => {
    const logSpy = jest.spyOn(Logger.prototype, 'log'); // 監聽 Logger 實例的 log 方法
    loggerMiddleware.use(req, res, next);
    expect(logSpy).toHaveBeenCalledWith(
      'Request... Method:GET Url:/test', // 確保訊息與 LoggerMiddleware 中的訊息一致
    );
    expect(next).toHaveBeenCalled();
    logSpy.mockRestore(); // 測試結束後恢復原始方法
  });
});
