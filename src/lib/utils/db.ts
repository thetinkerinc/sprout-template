import * as k from 'kysely';

declare module '@thetinkerinc/sprout/db' {
	interface DB {
		posts: PostTable;
	}

	export interface PostTable {
		id: k.Generated<string>;
		title: string;
		body: string;
	}
}
