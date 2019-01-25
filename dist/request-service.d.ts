import { IBufferEntry } from "./types";
export declare class RequestService {
    private static instance;
    static getInstance(): RequestService;
    private bufferedResults;
    private constructor();
    static isWithinInterval(milliseconds: number, referenceDate: Date): boolean;
    get(options: any, bufferIntervalInMilliseconds: number): Promise<any>;
    deleteBuffer(): void;
    deleteBufferEntry(options: any): void;
    getCompleteBufferContent(): IBufferEntry[];
}
