import { IBufferEntry } from "./types"
const request: any =
    require("request-promise")

export class RequestService {

    private static instance: RequestService

    public static getInstance(): RequestService {
        if (RequestService.instance === undefined) {
            RequestService.instance = new RequestService()
        }

        return RequestService.instance
    }

    private bufferedResults: IBufferEntry[]

    // private constructor to ensure singleton concept
    private constructor() {
        this.bufferedResults = []
    }

    public static isWithinInterval(milliseconds: number, referenceDate: Date): boolean {

        return (new Date(Number(referenceDate.getTime()) + milliseconds).getTime() > new Date().getTime()) ?
            true :
            false
    }

    public async get(options: any, bufferIntervalInMilliseconds: number): Promise<any> {

        const bufferedResult: IBufferEntry =
            this.bufferedResults.filter((result: IBufferEntry) => result.options === options)[0]

        if (bufferedResult === undefined ||
            !RequestService.isWithinInterval(bufferIntervalInMilliseconds, bufferedResult.lastRequestDate)) {
            const result: IBufferEntry = {
                data: await request.get(options),
                lastRequestDate: new Date(),
                options,
            }
            this.bufferedResults.push(result)

            return result
        } else {

            return bufferedResult
        }
    }

    public deleteBuffer(): void {
        this.bufferedResults = []
    }

    public deleteBufferEntry(options: any): void {
        const bufferEntry: IBufferEntry =
            this.bufferedResults.filter((result: IBufferEntry) => result.options === options)[0]

        const indexOfEntryWhichShallBeDeleted: number =
            this.bufferedResults.indexOf(bufferEntry)

        if (indexOfEntryWhichShallBeDeleted === -1) {
            throw new Error("You tried to delete a buffer entry which was not in the buffer.")
        } else {
            this.bufferedResults.splice(indexOfEntryWhichShallBeDeleted, 1)
        }

    }

    public getCompleteBufferContent(): IBufferEntry[] {
        return this.bufferedResults
    }

}
