import { IRecord } from "../../../Record/domain/models/IRecord"

export interface IBank {
    id: number
    name: string
    bankCode: number
    records: IRecord[]
}