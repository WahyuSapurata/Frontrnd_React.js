/**
 *
 * @param {string} key
 * @param {object} value
 * @returns {Array}
 */
export function useSession() {
  function read() {
    return sessionStorage.getItem("auth");
  }
  function write(value) {
    sessionStorage.setItem("auth", value);
  }
  return [read, write];
}
