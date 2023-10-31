import axios from "axios";

export const autoComplete = async (searchTerm) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/autocomplete?searchString=${encodeURIComponent(searchTerm)}`;
  const suggestions = await axios.get(url);
  return suggestions.data;
};

export const getSearchResults = async (searchTerm) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/search?searchString=${encodeURIComponent(searchTerm)} `;
  const search = await axios.get(url);
  return search.data;
};
