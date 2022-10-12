import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeal } from "../../Interface";

export const apiSlice = createApi({
  reducerPath: `dealApi`,
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  /* 1) create a tag for the cache so that we invalidate it within our mutations 
  so that our data can be refetched */
  tagTypes: ["Deals"],
  endpoints: (builder) => ({
    getAllDeals: builder.query<IDeal[], null>({
      query: () => `/deal`,
      // 2) add in the providesTags
      providesTags: [`Deals`],
    }),
    addUpvote: builder.mutation({
      query: (id) => ({
        url: `/deal/upvote/${id}`,
        method: `PATCH`,
      }),
      invalidatesTags: [`Deals`],
    }),
    addDownvote: builder.mutation({
      query: (id) => ({
        url: `/deal/downvote/${id}`,
        method: `PATCH`,
      }),
      invalidatesTags: [`Deals`],
    }),
  }),
});

export const {
  useGetAllDealsQuery,
  useAddUpvoteMutation,
  useAddDownvoteMutation,
} = apiSlice;

/* 
Notes 
declare the generic arguments of your builder.query() call 
- they should be builder.query<ReturnValueHere, ArgumentTypeHere>. 
If there is no argument, use void

*/
