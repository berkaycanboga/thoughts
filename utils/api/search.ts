import { api, urls } from "./api";

export const searchApiService = {
  getPost: async (searchTerm: string) => {
    return api.get(urls.search(searchTerm));
  },
};
