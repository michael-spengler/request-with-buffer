"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
class RequestService {
    static getInstance() {
        if (RequestService.instance === undefined) {
            RequestService.instance = new RequestService();
        }
        return RequestService.instance;
    }
    // private constructor to ensure singleton concept
    constructor() {
        this.bufferedResults = [];
    }
    static isWithinInterval(milliseconds, referenceDate) {
        return (new Date(Number(referenceDate.getTime()) + milliseconds).getTime() > new Date().getTime()) ?
            true :
            false;
    }
    async get(options, bufferIntervalInMilliseconds) {
        const bufferedResult = this.bufferedResults.filter((result) => result.options === options)[0];
        if (bufferedResult === undefined ||
            !RequestService.isWithinInterval(bufferIntervalInMilliseconds, bufferedResult.lastRequestDate)) {
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
    deleteBuffer() {
        this.bufferedResults = [];
    }
    deleteBufferEntry(options) {
        const bufferEntry = this.bufferedResults.filter((result) => result.options === options)[0];
        const indexOfEntryWhichShallBeDeleted = this.bufferedResults.indexOf(bufferEntry);
        if (indexOfEntryWhichShallBeDeleted === -1) {
            throw new Error("You tried to delete a buffer entry which was not in the buffer.");
        }
        else {
            this.bufferedResults.splice(indexOfEntryWhichShallBeDeleted, 1);
        }
    }
    getCompleteBufferContent() {
        return this.bufferedResults;
    }
}
exports.RequestService = RequestService;
