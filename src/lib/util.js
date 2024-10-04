import appConfig from "lib/appConfig";

/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text) {
  if (typeof text !== 'string') {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }

  let decoded = text;

  const entities = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export function removeExtraSpaces(text) {
  if (typeof text !== 'string') return;
  return text.replace(/\s+/g, ' ').trim();
}

export function replaceUrlInContent(text = undefined) {

  if (text !== undefined && text !== null) {
    for (let i = 0; i < appConfig.wpDomain.length; i++) {
      text = text.replace(new RegExp(appConfig.wpDomain[i], 'g'), appConfig.nextDomain)
    }
  }

  return text;
}