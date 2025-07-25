import { IBank } from "../../../Bank/domain/models/IBank";
import { IRecord } from "../models/IRecord";

export default interface IRecordRepository {
    ListRecordsBetween(
        bankId: number,
        type: string,
        start: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
        },
        end: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
        },
        status?: string
    ): Promise<IRecord[] | null>;

    ListRecordsByStatus(
        bankId: number,
        type: string,
        limit: number,
        status: string | undefined
    ): Promise<IRecord[] | null>;
    CreateRecord(
        type: string,
        CodeResponse: number,
        status: string,
        timeRequest: number,
        payload: object,
        bankId: IBank,
        detailing: string,
        responseStatus: string
    ): Promise<IRecord>

}