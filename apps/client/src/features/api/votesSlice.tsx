import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVotes } from "../../Interface";

export const votesSlice = createApi({
  reducerPath: `votesApi`,
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  /* 1) create a tag for the cache so that we invalidate it within our mutations 
  so that our data can be refetched */
  tagTypes: ["Votes"],
  endpoints: (builder) => ({
    //* builder.query<ReturnValueHere, ArgumentTypeHere>,
    //* more notes below
    getAllVotes: builder.query<IVotes[], null>({
      query: () => `/votes`,
      // 2) add in the providesTags
      providesTags: [`Votes`],
    }),
    searchAllVotesByDealId: builder.query<IVotes[], { dealId: IVotes }>({
      query: (arg) => {
        const { dealId } = arg;
        return {
          url: `/votes`,
          params: { dealId },
        };
      },
      providesTags: [`Votes`],
    }),
    searchAllVotesByUserId: builder.query<IVotes[], { userId: string }>({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `/votes`,
          params: { userId },
        };
      },
      providesTags: [`Votes`],
    }),
    addUpvote: builder.mutation<IVotes[], { userId: string; dealId: string }>({
      query: ({ userId, dealId }) => ({
        url: `/votes/upvote/${userId}/${dealId}`,
        method: `POST`,
      }),
      // 3) invalidates tag would cause this "method" to invalidate the tag and allow repull of all data
      invalidatesTags: [`Votes`],
    }),
    addDownvote: builder.mutation<IVotes[], { userId: string; dealId: string }>(
      {
        query: ({ userId, dealId }) => ({
          url: `/votes/downvote/${userId}/${dealId}`,
          method: `POST`,
        }),
        invalidatesTags: [`Votes`],
      }
    ),
  }),
});

export const {
  useGetAllVotesQuery,
  useSearchAllVotesByUserIdQuery,
  useSearchAllVotesByDealIdQuery,
  useAddUpvoteMutation,
  useAddDownvoteMutation,
} = votesSlice;

/* 
Notes 
declare the generic arguments of your builder.query() call 
- they should be builder.query<ReturnValueHere, ArgumentTypeHere>. 
If there is no argument, use void
*/
