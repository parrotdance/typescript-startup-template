import { Stream } from 'stream'

export enum DATA_TYPE {
  JSON = 'json'
}

type ReadStreamOption = {
  readAs?: DATA_TYPE
}
type ReadStreamAsJson = { readAs: DATA_TYPE.JSON } & ReadStreamOption

export function readAllDataFromStream(source: Stream, option: ReadStreamAsJson): Promise<Record<string, unknown>>
export function readAllDataFromStream(source: Stream, option: ReadStreamOption): Promise<unknown>
export function readAllDataFromStream(source: Stream, option: ReadStreamOption = {}) {
  return new Promise((resolve, reject) => {
    const { readAs } = option
    let data = ''
    source.on('data', (chunk) => {
      data += chunk
    })
    source.on('end', () => {
      try {
        switch (readAs) {
          case DATA_TYPE.JSON:
            resolve(JSON.parse(data) as Record<string, unknown>)
            break
          default:
            resolve(JSON.parse(data) as unknown)
        }
      } catch (err) {
        reject(err)
      }
    })
    source.on('error', (err: Error) => {
      reject(err)
    })
  })
}
