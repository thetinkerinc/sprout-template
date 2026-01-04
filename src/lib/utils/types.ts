import * as k from 'kysely';

import type { DB, PostTable } from '@thetinkerinc/sprout/db';

export type Db = k.Kysely<DB>;
export type Tx = k.Transaction<DB>;
export type Post = k.Selectable<PostTable>;
