export declare class RequestWithBuffer {
    private readonly bufferedResults;
    static isWithinInterval(milliseconds: number, referenceDate: Date): boolean;
    get(options: any, bufferIntervalInMilliseconds: number): Promise<any>;
}
