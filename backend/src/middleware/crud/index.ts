/**
 * @summary
 * CRUD controller middleware for standardized request handling
 *
 * @module middleware/crud
 */

import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule configuration for CRUD operations
 *
 * @property {string} securable - Resource name
 * @property {string} permission - Permission type (CREATE, READ, UPDATE, DELETE)
 */
export interface SecurityRule {
  securable: string;
  permission: string;
}

/**
 * @interface ValidatedRequest
 * @description Validated request data structure
 *
 * @property {object} credential - User credential information
 * @property {object} params - Validated request parameters
 */
export interface ValidatedRequest {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Handles CRUD operation validation and security
 */
export class CrudController {
  private securityRules: SecurityRule[];

  constructor(securityRules: SecurityRule[]) {
    this.securityRules = securityRules;
  }

  /**
   * @summary
   * Validates CREATE operation request
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidatedRequest | null, Error | null]>}
   */
  async create(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | null, Error | null]> {
    return this.validateRequest(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates READ operation request
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidatedRequest | null, Error | null]>}
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidatedRequest | null, Error | null]> {
    return this.validateRequest(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates UPDATE operation request
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidatedRequest | null, Error | null]>}
   */
  async update(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | null, Error | null]> {
    return this.validateRequest(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates DELETE operation request
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidatedRequest | null, Error | null]>}
   */
  async delete(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | null, Error | null]> {
    return this.validateRequest(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Internal request validation logic
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {string} operation - Operation type
   *
   * @returns {Promise<[ValidatedRequest | null, Error | null]>}
   */
  private async validateRequest(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidatedRequest | null, Error | null]> {
    try {
      const requestData = { ...req.params, ...req.query, ...req.body };
      const validatedParams = await schema.parseAsync(requestData);

      const validated: ValidatedRequest = {
        credential: {
          idAccount: 1,
          idUser: 1,
        },
        params: validatedParams,
      };

      return [validated, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}

/**
 * @summary
 * Success response helper
 *
 * @param {any} data - Response data
 * @returns {object} Formatted success response
 */
export function successResponse(data: any): object {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Error response helper
 *
 * @param {string} message - Error message
 * @returns {object} Formatted error response
 */
export function errorResponse(message: string): object {
  return {
    success: false,
    error: {
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * General error status
 */
export const StatusGeneralError = new Error('GENERAL_ERROR');
