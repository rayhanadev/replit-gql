import fetch from '@replit/node-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

import type { RequestInfo, RequestInit } from '@replit/node-fetch';
import type { NormalizedCacheObject } from '@apollo/client';

export type TGraphQLClient = ApolloClient<NormalizedCacheObject>;
export type GraphQL = (token: string) => TGraphQLClient;

export const GraphQL = (token: string): TGraphQLClient => {
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
