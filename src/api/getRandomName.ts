import axios from 'axios'
import type { ResponseAPIType } from '@/types/ResponseAPIType'

const apiUrl: string = 'https://api.randomdatatools.ru/?unescaped=false&params=FirstName';
export const getRandomName = async () => {
  const { data} = await axios.get<ResponseAPIType>(apiUrl);
  return data.FirstName 
}