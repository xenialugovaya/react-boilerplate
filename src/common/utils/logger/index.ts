/* eslint-disable no-console */

type LoggerType = (data: unknown) => void;

export const logger: LoggerType = (data) => console.log(data);

export const errorLogger: LoggerType = (error) => console.error(error);
