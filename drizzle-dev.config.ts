import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/utils/drizzle.ts',
	dialect: 'postgresql',
	driver: 'pglite',
	dbCredentials: {
		url: './data/db/'
	}
});
