// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import { DATABASE_URL, NODE_ENV } from '../config';

if (!DATABASE_URL) {
    throw new Error(
        'DATABASE_URL is not defined. Please check your environment file.',
    );
}

process.env.DATABASE_URL = DATABASE_URL;

export const prisma = new PrismaClient({
    log:
        NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error']
            : ['error'],
});

export default prisma;
