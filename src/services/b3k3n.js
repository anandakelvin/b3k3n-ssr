import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const b3k3nApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api",
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => `/fee-assessment-categories`,
		}),
		getBooksByCategoryIdAndPageIndex: builder.query({
			query: ({ categoryId, pageIndex, pageSize }) => {
				return `/fee-assessment-books?categoryId=${categoryId}&page=${pageIndex}&size=${pageSize}`;
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetCategoriesQuery,
	useGetBooksByCategoryIdAndPageIndexQuery,
	util: { getRunningOperationPromises },
} = b3k3nApi;

export const { getCategories, getBooksByCategoryIdAndPageIndex } =
	b3k3nApi.endpoints;
