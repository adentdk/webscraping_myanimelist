import client from "./config";
import * as cheerio from "cheerio";
import db from '@src/db/models';
import { getSlug } from '@src/utils/slug';

const {Genre} = db;

export default async function getGenres() {
  console.log('fetching page')
  const response = await client.get('/anime.php');
  console.log('fetch page complete')

  const htmlPage = response.data

  const genreList = [];

  const $ = cheerio.load(htmlPage);

  console.log('extracting data')

  $('#content > div.anime-manga-search.pb24 > div:nth-child(2) > div.genre-list-col').each((a, genreCol) => {
    $(genreCol).find('div.genre-list.al').each((b, genreDiv) => {
      const rawGenreText = $(genreDiv).text();

      const genreText = rawGenreText.slice(0, rawGenreText.indexOf(' ('));

      genreList.push(genreText)
    })
  })

  return Promise.resolve(genreList)
}

(async () => {
  const genreList = await getGenres();

  const genreData = genreList.map(genre => ({
    name: genre,
    slug: getSlug(genre)
  }));

  // const bulkCreateOrUpdate = await Genre.bulkCreate(genreData, {
  //   updateOnDuplicate: ['slug'],
  // })

  console.log(genreData)

})()