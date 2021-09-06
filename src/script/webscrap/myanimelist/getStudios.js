import client from "./config";
import * as cheerio from "cheerio";
import db from '@src/db/models';
import { getSlug } from '@src/utils/slug';

const {Studio} = db;

export default async function getStudios() {
  console.log('fetching page')
  const response = await client.get('/anime/producer');
  console.log('fetch page complete')

  const htmlPage = response.data

  const studioList = [];

  const $ = cheerio.load(htmlPage);

  console.log('extracting data')

  $('#content > div.anime-manga-search.ml8.mr8.pt24.pb8 > div.genre-link.mb24').each((a, studioSection) => {
    $(studioSection).find('div.genre-list-col').each((b, studioCol) => {
      $(studioCol).find('div.genre-list.al').each((b, studioDiv) => {
        const rawstudioText = $(studioDiv).text();
  
        const studioText = rawstudioText.slice(0, rawstudioText.indexOf(' ('));
  
        studioList.push(studioText)
      })
    })
  })

  return Promise.resolve(studioList)
}

(async () => {
  const studioList = await getStudios();

  const studioData = studioList.map(studio => ({
    name: studio,
    slug: getSlug(studio)
  }));

  // const bulkCreateOrUpdate = await Studio.bulkCreate(studioData, {
  //   updateOnDuplicate: ['slug'],
  // })

  console.log(studioData)

})()