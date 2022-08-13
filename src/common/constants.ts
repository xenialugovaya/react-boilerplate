import { config } from './config';

/**
 * Путь до апи сервера
 */
export const API_URL =
  config.environment !== 'production' ? 'https://localhost:5000' : '';

/**
 * Адреса страниц
 */
export const URLS = {
  /** Главная */
  MAIN: '/',
};
