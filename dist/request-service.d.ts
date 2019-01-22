export declare class RequestService {
    private readonly bufferedResults;
    static isWithinInterval(milliseconds: number, referenceDate: Date): boolean;
    get(options: any, bufferIntervalInMilliseconds: number): Promise<any>;
}
