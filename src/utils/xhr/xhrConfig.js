/**
 * @type {import("./hook").Params}
 */
export const defaultOptions = {
  method: "GET",
  useBaseUrl: true,
  body: {},
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  queryParams: {},
  params: {},
  useToken: true,
  responseType: "json",
  redirectUnauthorized: true,
  showErrorSnackbar: false,
  showSucessSnackbar: false,
};
