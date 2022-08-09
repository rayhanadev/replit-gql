import { GraphQL } from '../dist/index.mjs';
import Repl from './queries/Repl.graphql';

const { REPLIT_ID } = process.env;
const client = GraphQL();

test('Query Repl (Query).', async () => {
	const { data } = await client.query({
		query: Repl,
		variables: { id: REPLIT_ID }
	});

	expect(data).toHaveProperty('repl.slug', 'NodeJS-Repl');
});
