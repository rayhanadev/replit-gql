import { GraphQL } from '../dist/index.mjs';
import CurrentUser from './queries/CurrentUser.graphql';

const { REPLIT_TOKEN } = process.env;
const client = GraphQL(REPLIT_TOKEN);

test('Query CurrentUser (Query + Auth).', async () => {
	const { data } = await client.query({ query: CurrentUser });
	expect(data).toHaveProperty('currentUser.id', 4045907);
});
