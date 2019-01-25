import { IResult } from "./types"
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

    private bufferedResults: IResult[]

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

        const bufferedResult: IResult =
            this.bufferedResults.filter((result: IResult) => result.options === options)[0]

        if (bufferedResult === undefined ||
            !RequestService.isWithinInterval(bufferIntervalInMilliseconds, bufferedResult.lastRequestDate)) {
            const result: IResult = {
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

    public clearBuffer(): void {
        this.bufferedResults = []
    }

    public getCompleteBufferContent(): IResult[] {
        return this.bufferedResults
    }

}
