import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
// const page = 1;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        //get popular movies
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                if( genreIdOrCategoryName && typeof genreIdOrCategoryName ==="string"){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                if( genreIdOrCategoryName && typeof genreIdOrCategoryName ==="number"){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                if( searchQuery){
                    console.log(searchQuery);

                    return `search/movie?query=${searchQuery}&api_key=${tmdbApiKey}&page=${page}`
                }

                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
            }
        }),

        //get movie
        getMovie: builder.query({
            query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),

        //get genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),

        //get specific movie list
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),

        // Get Actor
        getActor: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
        }),

        //get movie by actor
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),

        // Get User Specific Lists
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
        }),
    })
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetMoviesByActorIdQuery,
    useGetActorQuery,
    useGetListQuery
} = tmdbApi;