import { IBank } from "src/server/modules/Bank/domain/models/IBank";
import { IRecord } from "src/server/modules/Record/domain/models/IRecord";
import IRecordRepository from "src/server/modules/Record/domain/repositories/IRecordRepository";

export default class FakeRecordRepository implements IRecordRepository {
    private records: IRecord[] = [];

    async CreateRecord(
        type: string,
        codeResponse: number,
        status: string,
        timeRequest: number,
        payload: object,
        bank: IBank,
        detailing: string,
        responseStatus: string
    ): Promise<IRecord> {
        const newRecord: IRecord = {
            id: this.records.length + 1,
            type,
            codeResponse,
            status,
            timeRequest,
            payloadResponse: payload,
            bank: bank,
            detailing,
            responseStatus,
            dateCreated: new Date(),
        };

        this.records.push(newRecord);
        return newRecord;
    }

    async ListRecordsBetween(
        bankId: number,
        type: string,
        start: { year: number; month: number; day: number; hour: number; minute: number; second: number; },
        end: { year: number; month: number; day: number; hour: number; minute: number; second: number; },
        status?: string
    ): Promise<IRecord[] | null> {
        const startDate = new Date(start.year, start.month - 1, start.day, start.hour, start.minute, start.second);
        const endDate = new Date(end.year, end.month - 1, end.day, end.hour, end.minute, end.second);

        const filtered = this.records.filter(record =>
            record.bank.id === bankId &&
            record.type === type &&
            (!status || record.status === status) &&
            record.dateCreated >= startDate &&
            record.dateCreated <= endDate


        );
        return filtered.length ? filtered : null;
    }

    async ListRecordsByStatus(
        bankId: number,
        type: string,
        limit: number,
        status: string | undefined
    ): Promise<IRecord[] | null> {
        const filtered = this.records
            .filter(record =>
                record.bank.id === bankId &&
                record.type === type &&
                (!status || record.status === status)
            )
            .slice(0, limit);

        return filtered.length ? filtered : null;
    }
}
