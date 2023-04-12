/**
 * check if process is running, true: will kill it, false: it not run
 * @param pid process id
 * @returns boolean
 */
export const checkRunning = (pid: number) => {
  try {
    /* 
     * Refer: https://nodejs.org/api/process.html#signal-events
     * 0 can be sent to test for the existence of a process, it has no effect if the process exists, but will throw an error if the process does not exist.
    */
    return process.kill(pid, 0)
  } catch (e) {
    return false
  }
}
