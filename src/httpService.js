import axios from "axios";

const apiRoot = "https://metadata.kreftregisteret.no/rest/v1";

const httpRepository = axios.create({
  baseURL: apiRoot,
});

export const httpService = {
  listVariables() {
    return httpRepository({
      method: "get",
      url: "/variables",
    });
  },
  searchVariables(keyword) {
    return httpRepository({
      method: "get",
      url: `/variables/:search?keyword=${keyword}`,
    });
  },
  getVariableById(id) {
    return httpRepository({
      method: "get",
      url: `/variables/${id}`,
    });
  },
};
