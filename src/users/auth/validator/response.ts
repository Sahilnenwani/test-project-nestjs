import { applyDecorators } from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AllowAny } from '../../../config/auth-guard';
import { Roles } from '../../../guards/roles.guard';

export const BAD_REQUEST = {
  description: '400 Bad Request, invalid request data',
  status: 400,
  schema: {
    properties: {
      statusCode: { type: 'integer' },
      message: { type: 'string' },
    },
  },
};

export const SERVER_ERROR = {
  description: '500 internal server error',
  status: 500,
  schema: {
    properties: {
      statusCode: { type: 'integer' },
      message: { type: 'string' },
    },
  },
};

export const SUCCESS_RESPONSE = {
  status: 200,
  description: 'Success Response',
  schema: {
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      data: { type: 'object' },
    },
  },
};

export const UNAUTHORIZED_RESPONSE = {
  description: '401 Unauthorized',
  status: 401,
  schema: {
    properties: {
      statusCode: { type: 'integer' },
      message: { type: 'string' },
    },
  },
};

export function ApiValidations(isAuth = true, roles = []) {
  if (isAuth && roles.length > 0) {
    return applyDecorators(
      ApiResponse(SUCCESS_RESPONSE),
      ApiBadRequestResponse(BAD_REQUEST),
      ApiCreatedResponse(SUCCESS_RESPONSE),
      ApiInternalServerErrorResponse(SERVER_ERROR),
      ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE),
      ApiBearerAuth('access-token'),
      Roles(roles),
    );
  } else if (isAuth) {
    return applyDecorators(
      ApiResponse(SUCCESS_RESPONSE),
      ApiBadRequestResponse(BAD_REQUEST),
      ApiCreatedResponse(SUCCESS_RESPONSE),
      ApiInternalServerErrorResponse(SERVER_ERROR),
      ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE),
      ApiBearerAuth('access-token'),
    );
  } else {
    return applyDecorators(
      ApiResponse(SUCCESS_RESPONSE),
      ApiBadRequestResponse(BAD_REQUEST),
      ApiInternalServerErrorResponse(SERVER_ERROR),
      AllowAny(),
    );
  }
}
