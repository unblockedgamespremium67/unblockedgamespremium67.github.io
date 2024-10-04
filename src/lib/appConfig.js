let wpDomain = [];
if (process.env.WORDPRESS_DOMAIN) {
  let strDomains = process.env.WORDPRESS_DOMAIN;
  wpDomain =  strDomains.split(';');
}
const nextDomain = process.env.NEXT_DOMAIN ? process.env.NEXT_DOMAIN : '';

const appConfig = {
  wpDomain: wpDomain,
  nextDomain: nextDomain,
}

export default appConfig;