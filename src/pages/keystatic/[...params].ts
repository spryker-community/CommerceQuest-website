import { makeHandler } from '@keystatic/astro/api';
import config from '../../../keystatic.config';

export const prerender = false;
export const all = makeHandler({
  config,
});
