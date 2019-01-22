"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_reader_1 = require("configuration-reader");
const path = require("path");
const request_with_buffer_1 = require("./request-with-buffer");
let requestWithBuffer;
const bufferIntervalInMilliSeconds = 2000;
const configurationReader = new configuration_reader_1.ConfigurationReader(path.join(__dirname, "../.env"));
const apiKey = configurationReader.get("APIKey");
const testURL = `http://rest.coinapi.io/v1/exchangerate/EUR?apikey=${apiKey}`;
describe("RequestWithBuffer", () => {
    beforeEach(async () => {
        requestWithBuffer =
            new request_with_buffer_1.RequestWithBuffer();
    });
    it("regular get request", async () => {
        const options = {
            url: testURL,
        };
        expect(await requestWithBuffer.get(options, 0))
            .toBeDefined();
    });
    it("two subsequent requests outside buffer interval", async () => {
        const options = {
            url: testURL,
        };
        const requestResult = await requestWithBuffer.get(options, bufferIntervalInMilliSeconds);
        const requestResult2 = await requestWithBuffer.get(options, 0);
        expect(requestResult)
            .toEqual(requestResult2);
    });
    it("Checks Interval Correctly", async () => {
        expect(request_with_buffer_1.RequestWithBuffer.isWithinInterval(bufferIntervalInMilliSeconds, new Date()))
            .toBe(false);
        expect(request_with_buffer_1.RequestWithBuffer.isWithinInterval(0, new Date()))
            .toBe(true);
    });
});
