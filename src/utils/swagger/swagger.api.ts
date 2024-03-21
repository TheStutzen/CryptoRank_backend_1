import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

export function ApiDistributeCoins() {
  return applyDecorators(
    ApiOperation({
      description: 'Распределить монеты',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          coinsAvailable: {
            type: 'object',
            additionalProperties: { type: 'number' },
          },
          requests: { type: 'array', items: { type: 'string' } },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'Вернётся массив с монетами' }),
    ApiResponse({ status: 400, description: 'Некорректный запрос' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiConvertCurrency() {
  return applyDecorators(
    ApiOperation({
      description: 'Конвертировать валюту',
    }),
    ApiQuery({ name: 'from', required: true, type: String }),
    ApiQuery({ name: 'to', required: true, type: String }),
    ApiQuery({ name: 'amount', required: true, type: Number }),
    ApiResponse({ status: 200, description: 'Успешное выполнение' }),
    ApiResponse({ status: 400, description: 'Некорректный запрос' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}
