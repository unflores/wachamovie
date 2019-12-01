interface MovieData {
  resolution: string
  year: number
}

function getYear(name: string) {
  const match = name.match(/(19|20)[0-9]{2}/)
  return match && parseInt(match[0])
}

function getResolution(name: string) {
  const match = name.match(/[0-9]{3,4}p/)
  return match && match[0]
}

/**
 * Get various data from filename
 */

export default (filename: string) => {
  const data: MovieData = { resolution: undefined, year: undefined }
  data.resolution = getResolution(filename)
  data.year = getYear(filename)
  return data;
}
