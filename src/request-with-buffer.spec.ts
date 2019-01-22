import { ConfigurationReader } from "configuration-reader"
import * as path from "path"
import { RequestWithBuffer } from "./request-with-buffer"

let requestWithBuffer: RequestWithBuffer
const bufferIntervalInMilliSeconds: number = 1000

const configurationReader: ConfigurationReader =
    new ConfigurationReader(path.join(__dirname, "../.env"))
const apiKey: string = configurationReader.get("APIKey")
const testURL: string = `http://rest.coinapi.io/v1/exchangerate/EUR?apikey=${apiKey}`

describe("RequestWithBuffer", () => {
    beforeEach(async () => {
        requestWithBuffer =
            new RequestWithBuffer()
    })

    it("get within interval", async () => {
        expect(await requestWithBuffer.get({ url: testURL }, bufferIntervalInMilliSeconds))
            .toBeDefined()
    })
})
