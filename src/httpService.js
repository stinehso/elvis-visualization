import axios from 'axios';
// import { getQueryString } from './../../../vas-common-js/util/communication';

const apiRoot = 'https://metadata.kreftregisteret.no/rest/v1';

// const config = require('./config.json');


const httpRepository = axios.create({
  baseURL: apiRoot,
});

export const httpService = {
  listVariables() {
    return httpRepository({
      method: 'get',
      url: '/variables',
    });
  },
  searchVariables(keyword) {
    return httpRepository({
      method: 'get',
      url: `/variables/:search?keyword=${keyword}`,
    });
  },
  getVariableById(id) {
    return httpRepository({
      method: 'get',
      url: `/variables/${id}`,
    });
  },
};
