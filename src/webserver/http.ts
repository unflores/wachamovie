import * as fs from 'fs'

interface FileChunkType {
  start: number
  end: number
  size: number
  fileSize: number
}

export const getHeaderChunk = (rangeHeader: string, file: string): FileChunkType => {
  if (!rangeHeader) {
    return undefined
  }

  const stat = fs.statSync(file)
  const fileSize = stat.size
  const parts = rangeHeader.replace(/bytes=/, "").split("-")
  const start = parseInt(parts[0], 10)
  const end = parts[1]
    ? parseInt(parts[1], 10)
    : fileSize - 1
  const chunksize = (end - start) + 1

  return {
    fileSize,
    start,
    end,
    size: chunksize
  }
}
