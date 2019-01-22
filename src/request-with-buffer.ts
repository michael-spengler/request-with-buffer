import { IResult } from "./types"
const request: any =
    require("request-promise")

export class RequestWithBuffer {

    private readonly results: IResult[] = []
    private readonly lastRequestTimestamp: any

    public async get(options: any, bufferIntervalInMilliseconds: number): Promise<any> {

        if (!this.results.some((entry: IResult) => entry.options === options) ||
            this.lastRequestTimestamp === undefined ||
            new Date() > new Date(Number(this.lastRequestTimestamp.getTime()) + bufferIntervalInMilliseconds)) {
            // console.log(`return new data for ${options}`)
            const result: IResult = {
                data: await request.get(options),
                options,
            }
            this.results.push(result)
        } else {
            // console.log("no need to call API")
        }

        return this.results.filter((result: IResult) => result.options === options)[0]

    }
}
