import { BASE_URL, API_KEY } from '../constants/cloudinary'

const generateURL = (folder, timestamp, signature) => {
  const params = new URLSearchParams({
    folder,
    timestamp,
    signature,
    api_key: API_KEY,
  })

  return BASE_URL + params.toString()
}

export default generateURL
