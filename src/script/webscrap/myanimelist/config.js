import { axiosIntance } from "@src/utils/axios";
export const baseURL = 'https://myanimelist.net/'

const otakudesuClient = axiosIntance.create({
  baseURL,
})

export default otakudesuClient
