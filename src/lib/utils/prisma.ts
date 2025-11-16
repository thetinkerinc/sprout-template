import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';

import { PrismaClient } from '@prisma/client';

export type * from '@prisma/client';

let prisma: PrismaClient;

if (dev) {
	const pool = new pg.Pool({ connectionString: DATABASE_URL });
	const adapter = new PrismaPg(pool);
	prisma = new PrismaClient({ adapter });
} else {
	neonConfig.webSocketConstructor = WebSocket;
	neonConfig.poolQueryViaFetch = true;

	const adapter = new PrismaNeon({ connectionString: DATABASE_URL });
	prisma = new PrismaClient({ adapter });
}

export { prisma };
