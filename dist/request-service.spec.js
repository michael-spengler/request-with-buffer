"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_reader_1 = require("configuration-reader");
const path = require("path");
const request_service_1 = require("./request-service");
let requestService;
const bufferIntervalInMilliSeconds = 60 * 60 * 1000; // hourly
const configurationReader = new configuration_reader_1.ConfigurationReader(path.join(__dirname, "../.env"));
const apiKey = configurationReader.get("APIKey");
const testURL = `https://rest.coinapi.io/v1/exchangerate/EUR?apikey=${apiKey}`;
describe("RequestService", () => {
    beforeEach(async () => {
        requestService =
            request_service_1.RequestService.getInstance();
    });
    it("regular get request", async () => {
        const options = {
            url: testURL,
        };
        expect(await requestService.get(options, 0))
            .toBeDefined();
    });
    it("two subsequent requests - delivering buffered data", async () => {
        const options = {
            url: testURL,
        };
        const requestResult = await requestService.get(options, bufferIntervalInMilliSeconds);
        const requestResult2 = await requestService.get(options, bufferIntervalInMilliSeconds);
        expect(requestResult)
            .toEqual(requestResult2);
    });
    it("Checks Interval Correctly", async () => {
        expect(request_service_1.RequestService.isWithinInterval(bufferIntervalInMilliSeconds, new Date()))
            .toBe(true);
        const aVeryShortMomentInTime = 0.000000000001;
        expect(request_service_1.RequestService.isWithinInterval(aVeryShortMomentInTime, new Date()))
            .toBe(false);
    });
    it("deletes buffer", async () => {
        requestService.deleteBuffer();
        expect(requestService.getCompleteBufferContent())
            .toEqual([]);
    });
    it("deletes specific buffer entry", async () => {
        try {
            requestService.deleteBufferEntry({ url: "notInBuffer" });
            fail("hmm - please let me think about it");
        }
        catch (error) {
            // works as designed
        }
        const optionsISS = { url: "http://api.open-notify.org/iss-now.json" };
        const optionsAstronauts = { url: "http://api.open-notify.org/astros.json" };
        await requestService.get(optionsISS, bufferIntervalInMilliSeconds);
        await requestService.get(optionsAstronauts, bufferIntervalInMilliSeconds);
        try {
            requestService.deleteBufferEntry(optionsISS);
        }
        catch (error) {
            fail(error.message);
        }
        expect(requestService.getCompleteBufferContent().length)
            .toEqual(1);
    });
});
