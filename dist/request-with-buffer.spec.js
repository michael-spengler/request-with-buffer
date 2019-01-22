"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_reader_1 = require("configuration-reader");
const path = require("path");
const request_with_buffer_1 = require("./request-with-buffer");
let requestWithBuffer;
const bufferIntervalInMilliSeconds = 1000;
const configurationReader = new configuration_reader_1.ConfigurationReader(path.join(__dirname, "../.env"));
const apiKey = configurationReader.get("APIKey");
const testURL = `http://rest.coinapi.io/v1/exchangerate/EUR?apikey=${apiKey}`;
describe("RequestWithBuffer", () => {
    beforeEach(async () => {
        requestWithBuffer =
            new request_with_buffer_1.RequestWithBuffer();
    });
    it("get within interval", async () => {
        expect(await requestWithBuffer.get({ url: testURL }, bufferIntervalInMilliSeconds))
            .toBeDefined();
    });
});
