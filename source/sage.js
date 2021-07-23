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
    retrieve: retrieve,
    refresh: refresh
  };
}

const _Sage = {
  options: {}
};

/**
 * 
 * @param {string} queryName 
 * @param {object} query 
 * @param {object} [options] 
 */
function want(queryName, query, options) {

}

function retrieve() {

}

/**
 * 
 * @param {string} [queryName] 
 */
function refresh(queryName) {

}