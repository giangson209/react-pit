export interface LogBufferRecord {
  /**
   * Method to execute.
   */
  methodRef: Function;

  /**
   * Arguments to pass to the method.
   */
  arguments: unknown[];
}
export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'info';
export interface LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]): any;

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]): any;

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): any;

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): any;

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): any;

  /**
   * Write a 'info' level log.
   */
  info?(message: any, ...optionalParams: any[]): any;

  /**
   * Set log levels.
   * @param levels log levels
   */
  setLogLevels(levels: LogLevel[]): any;
}
