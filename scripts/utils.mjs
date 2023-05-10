import { exec } from 'node:child_process';
/**
 * @typedef {Object} ExecResponse
 * @property {ExecException?} error
 * @property {string} stdout std out response
 * @property {string} stderr std err response
 */

/**
 *
 * @param {string} cmd exec cmd
 * @returns {Promise<ExecResponse>}
 */
export async function asyncExec(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return reject({
          error,
          stdout,
          stderr,
        });
      }
      return resolve({
        stdout,
        stderr,
      });
    });
  });
}
