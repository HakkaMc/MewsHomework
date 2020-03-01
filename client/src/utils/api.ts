import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MOVIE_DB_URL, MOVIE_DB_KEY } from "../constants";
import { SearchMoviesApiResponse } from "../custom";
import { Movie } from "../reducers/Movies/model";

const instance: AxiosInstance = axios.create({
	baseURL: MOVIE_DB_URL,
	timeout: 10000
});

instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const updatedConfig: AxiosRequestConfig = { ...config };
		if (!updatedConfig.params) updatedConfig.params = {};
		updatedConfig.params["api_key"] = MOVIE_DB_KEY;

		return updatedConfig;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

export const searchMoviesApi = (
	payload: any
): Promise<AxiosResponse<SearchMoviesApiResponse>> =>
	instance.get("/search/movie", { params: payload });

export const getMovieDetailApi = (
	movieId: number
): Promise<AxiosResponse<Movie>> => instance.get(`/movie/${movieId}`);

export default instance;
