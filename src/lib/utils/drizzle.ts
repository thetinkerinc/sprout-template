import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { defineRelations } from 'drizzle-orm';
import * as pg from 'drizzle-orm/pg-core';
import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';

export * from 'drizzle-orm';

// Schema definition
export const posts = pg.pgTable('posts', {
	id: pg.uuid().primaryKey().defaultRandom().notNull(),
	content: pg.text().notNull()
});

export const schema = {
	posts
};

// Relation definitions
const relations = defineRelations({ posts }, () => ({
	posts: {}
}));

// Type definitions
export type Post = typeof posts.$inferSelect;

// Initialize db client
export const db = await initDb(relations);

async function initDb(relations: ReturnType<typeof defineRelations>) {
	let client;
	if (dev) {
		const drizzlePGlite = await import('drizzle-orm/pglite');
		const { PGlite } = await import('@electric-sql/pglite');
		client = new PGlite('./data/db');
		return drizzlePGlite.drizzle({ client, relations });
	} else {
		client = neon(DATABASE_URL);
		return drizzle({ client, relations });
	}
}
