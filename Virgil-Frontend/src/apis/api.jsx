import axios from "axios";

export const autoComplete = async (searchTerm) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/autocomplete?searchString=${encodeURIComponent(searchTerm)}`;
  console.log(url);
  const suggestions = await axios.get(url);
  return suggestions.data;
};

export const getSearchResults = async (searchTerm) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/search?searchString=${encodeURIComponent(searchTerm)} `;
  console.log("search-> ", url);
  const search = await axios.get(url);
  return search.data;
};
