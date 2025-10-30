import { Prisma } from '@prisma/client';

/**
 * Middleware to automatically serialize BigInt values in Prisma responses
 * to strings (to avoid "Do not know how to serialize a BigInt" errors).
 */
export const serializeBigIntMiddleware: Prisma.Middleware = async (params:any, next) => {
  const result = await next(params);

  // Helper to recursively convert BigInt values to strings
  const transform = (obj: any): any => {
    if (typeof obj === 'bigint') return obj.toString();
    if (Array.isArray(obj)) return obj.map(transform);
    if (obj !== null && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, transform(value)])
      );
    }
    return obj;
  };

  return transform(result);
};
