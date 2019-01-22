"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
class RequestWithBuffer {
    constructor() {
        this.results = [];
    }
    async get(options, bufferIntervalInMilliseconds) {
        if (!this.results.some((entry) => entry.options === options) ||
            this.lastRequestTimestamp === undefined ||
            new Date() > new Date(Number(this.lastRequestTimestamp.getTime()) + bufferIntervalInMilliseconds)) {
            // console.log(`return new data for ${options}`)
            const result = {
                data: await request.get(options),
                options,
            };
            this.results.push(result);
        }
        else {
            // console.log("no need to call API")
        }
        return this.results.filter((result) => result.options === options)[0];
    }
}
exports.RequestWithBuffer = RequestWithBuffer;
