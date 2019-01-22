export declare class RequestWithBuffer {
    private readonly results;
    private readonly lastRequestTimestamp;
    get(options: any, bufferIntervalInMilliseconds: number): Promise<any>;
}
