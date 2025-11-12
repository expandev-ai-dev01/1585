/**
 * @summary
 * Database utility functions for SQL Server operations
 *
 * @module utils/database
 */

import sql from 'mssql';
import { config } from '@/config';

/**
 * @enum ExpectedReturn
 * @description Expected return types from database operations
 */
export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 */
export interface IRecordSet<T = any> {
  recordset: T[];
  rowsAffected: number[];
}

let pool: sql.ConnectionPool | null = null;

/**
 * @summary
 * Gets or creates database connection pool
 *
 * @function getPool
 * @module utils/database
 *
 * @returns {Promise<sql.ConnectionPool>} Database connection pool
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect({
      server: config.database.server,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
    });
  }
  return pool;
}

/**
 * @summary
 * Executes database stored procedure
 *
 * @function dbRequest
 * @module utils/database
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {sql.Transaction} [transaction] - Optional transaction
 * @param {string[]} [resultSetNames] - Optional result set names
 *
 * @returns {Promise<any>} Query results
 *
 * @throws {Error} Database operation error
 */
export async function dbRequest(
  routine: string,
  parameters: any,
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  const pool = await getPool();
  const request = transaction ? new sql.Request(transaction) : pool.request();

  // Add parameters to request
  Object.keys(parameters).forEach((key) => {
    request.input(key, parameters[key]);
  });

  const result = await request.execute(routine);

  switch (expectedReturn) {
    case ExpectedReturn.Single:
      return result.recordset[0];
    case ExpectedReturn.Multi:
      if (resultSetNames && resultSetNames.length > 0) {
        const namedResults: any = {};
        resultSetNames.forEach((name, index) => {
          namedResults[name] = result.recordsets[index];
        });
        return namedResults;
      }
      return result.recordsets;
    case ExpectedReturn.None:
      return result.rowsAffected;
    default:
      return result;
  }
}

/**
 * @summary
 * Begins database transaction
 *
 * @function beginTransaction
 * @module utils/database
 *
 * @returns {Promise<sql.Transaction>} Transaction object
 */
export async function beginTransaction(): Promise<sql.Transaction> {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  return transaction;
}

/**
 * @summary
 * Commits database transaction
 *
 * @function commitTransaction
 * @module utils/database
 *
 * @param {sql.Transaction} transaction - Transaction to commit
 *
 * @returns {Promise<void>}
 */
export async function commitTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary
 * Rolls back database transaction
 *
 * @function rollbackTransaction
 * @module utils/database
 *
 * @param {sql.Transaction} transaction - Transaction to rollback
 *
 * @returns {Promise<void>}
 */
export async function rollbackTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.rollback();
}
