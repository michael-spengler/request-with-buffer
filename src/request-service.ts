import { IResult } from "./types"
const request: any =
    require("request-promise")

export class RequestService {

    private readonly bufferedResults: IResult[] = []

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
}
