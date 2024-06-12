import { JSDOM } from 'jsdom';

const cache = {};

function getLinks(html) {
  if (cache[html]) {
      return cache[html];
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const result = new Set([...document.querySelectorAll('a[href]')].map(el => {
    return el.getAttribute('href');
  }));

  cache[html] = result;
  return result;
}

export default function backlinks(eleventyConfig) {
  eleventyConfig.addAsyncFilter('links_to', async function(collection, target) {
    return collection.filter(item => getLinks(item.content).has(target));
  });
}
