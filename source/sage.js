/**
 * 
 * @param {object} options
 * @param {string} options.url 
 * @param {string} options.fetchPolicy 
 */
export function Sage(options) {
  _Sage.options = options;

  return {
    want: want,
    forget: forget,
    retrieve: retrieve,
    refresh: refresh
  };
}

const _Sage = {
  options: {},
  queries: {}
};

/**
 * 
 * @param {string} queryName 
 * @param {object} query 
 * @param {object} [options] 
 */
function want(queryName, query, options) {
  _Sage.queries[queryName] = { query: query, options: options };
}

/**
 * 
 * @param {string} queryName 
 */
function forget(queryName) {
  delete _Sage.queries[queryName];
}

function retrieve() {

}

/**
 * 
 * @param {string} [queryName] 
 */
function refresh(queryName) {

}