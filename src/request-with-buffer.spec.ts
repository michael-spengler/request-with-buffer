import { ConfigurationReader } from "configuration-reader"
import * as path from "path"
import { RequestWithBuffer } from "./request-with-buffer"

let requestWithBuffer: RequestWithBuffer
const bufferIntervalInMilliSeconds: number = 2000

const configurationReader: ConfigurationReader =
    new ConfigurationReader(path.join(__dirname, "../.env"))
const apiKey: string = configurationReader.get("APIKey")
const testURL: string = `http://rest.coinapi.io/v1/exchangerate/EUR?apikey=${apiKey}`

describe("RequestWithBuffer", () => {
    beforeEach(async () => {
        requestWithBuffer =
            new RequestWithBuffer()
    })

    it("regular get request", async () => {
        const options: any = {
            url: testURL,
        }
        expect(await requestWithBuffer.get(options, 0))
            .toBeDefined()
    })

    it("two subsequent requests outside buffer interval", async () => {
        const options: any = {
            url: testURL,
        }

        const requestResult: any = await requestWithBuffer.get(options, bufferIntervalInMilliSeconds)

        const requestResult2: any = await requestWithBuffer.get(options, 0)
        expect(requestResult)
            .toEqual(requestResult2)

    })

    it("Checks Interval Correctly", async () => {
        expect(RequestWithBuffer.isWithinInterval(bufferIntervalInMilliSeconds, new Date()))
            .toBe(false)
        expect(RequestWithBuffer.isWithinInterval(0, new Date()))
            .toBe(true)
    })

})
