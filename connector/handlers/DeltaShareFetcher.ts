import { Fetcher, FetchUtils, FetchOptions } from '@tableau/taco-toolkit/handlers'

export default class DataFetcher extends Fetcher {
  async *fetch({ handlerInput }: FetchOptions) {
    const { urls } = handlerInput.data
    const promises = urls.map((url) => FetchUtils.loadParquetData(url))
    await Promise.all(promises)
    yield
  }
}
