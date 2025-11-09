import axios from 'axios'

export const getRandomName = async () => {
  const url: string = 'https://api.randomdatatools.ru/?unescaped=false&params=FirstName'
  const { data } = await axios.get<{ FirstName: string }>(url)

  return data.FirstName.toLocaleLowerCase()
}
