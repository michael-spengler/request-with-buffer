"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
class RequestWithBuffer {
    constructor() {
        this.bufferedResults = [];
    }
    static isWithinInterval(milliseconds, referenceDate) {
        return (new Date(Number(referenceDate.getTime()) + milliseconds).getTime() <= new Date().getTime()) ?
            true :
            false;
    }
    async get(options, bufferIntervalInMilliseconds) {
        const bufferedResult = this.bufferedResults.filter((result) => result.options === options)[0];
        if (bufferedResult === undefined ||
            !RequestWithBuffer.isWithinInterval(bufferIntervalInMilliseconds, bufferedResult.lastRequestDate)) {
            const result = {
                data: await request.get(options),
                lastRequestDate: new Date(),
                options,
            };
            this.bufferedResults.push(result);
            return result;
        }
        else {
            return bufferedResult;
        }
    }
}
exports.RequestWithBuffer = RequestWithBuffer;
