import fetch from '@replit/node-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

import type { RequestInfo, RequestInit } from '@replit/node-fetch';
import type { NormalizedCacheObject } from '@apollo/client';

export const GraphQL = (token: string): ApolloClient<NormalizedCacheObject> => {
	const customFetch = (uri: RequestInfo, options: RequestInit) => {
		options.headers = {
			...options.headers,
			'User-Agent': 'Mozilla/5.0',
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			Referrer: 'https://replit.com/',
			Cookie: token ? `connect.sid=${encodeURIComponent(token)};` : '',
		};

		return fetch(uri, options);
	};

	const link = new HttpLink({
		uri: 'https://replit.com/graphql',
		// @ts-ignore: node-fetch@2.x has enough compat
		fetch: customFetch,
	});

	const client = new ApolloClient({
		link,
		cache: new InMemoryCache(),
		name: '@rayhanadev/replit-gql',
		version: '1.0.0',
		queryDeduplication: false,
	});

	return client;
};


// interface GraphQLResponse {
// 	data?: any;
// 	errors?: any;
// }

// export class GraphQL {
// 	private headers: Record<string, string>;
// 	protected queries: Record<string, string>;

// 	constructor(token: string, queries: Record<string, string>) {
// 		this.headers = {
// 			'User-Agent': 'Mozilla/5.0',
// 			'Content-Type': 'application/json',
// 			'X-Requested-With': 'XMLHttpRequest',
// 			Referrer: 'https://replit.com/',
// 			Cookie: token ? `connect.sid=${encodeURIComponent(token)};` : '',
// 		};

// 		this.queries = queries;
// 	}

// 	async request(query: string, variables?: Record<string, any>) {
// 		const res = (await fetch('https://replit.com/graphql', {
// 			method: 'POST',
// 			headers: this.headers,
// 			body: JSON.stringify({
// 				query: this.queries[query],
// 				variables: JSON.stringify(variables),
// 			}),
// 		}).then((res) => res.json())) as GraphQLResponse;

// 		const { data, errors } = res;

// 		if (errors) throw new Error('Replit GraphQL Error.');
// 		return data;
// 	}
// }
