import { ConfigurationReader } from "configuration-reader"
import * as path from "path"
import { RequestService } from "./request-service"

let requestService: RequestService
const bufferIntervalInMilliSeconds: number = 60 * 60 * 1000 // hourly

const configurationReader: ConfigurationReader =
    new ConfigurationReader(path.join(__dirname, "../.env"))
const apiKey: string = configurationReader.get("APIKey")
const testURL: string = `https://rest.coinapi.io/v1/exchangerate/EUR?apikey=${apiKey}`

describe("RequestService", () => {
    beforeEach(async () => {
        requestService =
            RequestService.getInstance()
    })

    it("regular get request", async () => {
        const options: any = {
            url: testURL,
        }
        expect(await requestService.get(options, 0))
            .toBeDefined()
    })

    it("two subsequent requests - delivering buffered data", async () => {
        const options: any = {
            url: testURL,
        }

        const requestResult: any = await requestService.get(options, bufferIntervalInMilliSeconds)

        const requestResult2: any = await requestService.get(options, bufferIntervalInMilliSeconds)

        expect(requestResult)
            .toEqual(requestResult2)

    })

    it("Checks Interval Correctly", async () => {
        expect(RequestService.isWithinInterval(bufferIntervalInMilliSeconds, new Date()))
            .toBe(true)
        const aVeryShortMomentInTime: number = 0.000000000001
        expect(RequestService.isWithinInterval(aVeryShortMomentInTime, new Date()))
            .toBe(false)
    })

    it("deletes buffer", async () => {
        requestService.deleteBuffer()
        expect(requestService.getCompleteBufferContent())
            .toEqual([])
    })

    it("deletes specific buffer entry", async () => {
        try {
            requestService.deleteBufferEntry({ url: "notInBuffer" })
            fail("hmm - please let me think about it")
        } catch (error) {
            // works as designed
        }

        const optionsISS: any = { url: "http://api.open-notify.org/iss-now.json" }
        const optionsAstronauts: any = { url: "http://api.open-notify.org/astros.json" }

        await requestService.get(optionsISS, bufferIntervalInMilliSeconds)
        await requestService.get(optionsAstronauts, bufferIntervalInMilliSeconds)

        try {
            requestService.deleteBufferEntry(optionsISS)
        } catch (error) {
            fail(error.message)
        }

        expect(requestService.getCompleteBufferContent().length)
            .toEqual(1)
    })

})
