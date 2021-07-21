export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export function setMovies(value) {
	console.log('setMovies action called');
	return { type: SET_MOVIES, value };
}

export function setFilter(value) {
	console.log('setFilter action called');
	return { type: SET_FILTER, value };
}
