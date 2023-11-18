import axios from "axios";

/**
 * The `autoComplete` function is an asynchronous function that sends a GET request to an Mongo Realm API endpoint which is stored in
 * `VITE_API_URL` environment variable
 * to retrieve autocomplete suggestions based on a given search term.
 * @returns The function `autoComplete` is returning the data received from the API call.
 */
export const autoComplete = async (searchTerm) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/autocomplete?searchString=${encodeURIComponent(searchTerm)}`;
  const suggestions = await axios.get(url);
  return suggestions.data;
};

/**
 * The function `getSearchResults` is an asynchronous function that takes a `searchTerm` as input,
 * constructs a URL using the Mongo Realm API endpoint which is stored in `VITE_API_URL` environment variable, sends a GET request to the
 * constructed URL using axios, and returns the response data.
 * @returns The function `getSearchResults` is returning the data obtained from the API call.
 */
export const getSearchResults = async (searchTerm) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/search?searchString=${encodeURIComponent(searchTerm)} `;
  const search = await axios.get(url);
  return search.data;
};
