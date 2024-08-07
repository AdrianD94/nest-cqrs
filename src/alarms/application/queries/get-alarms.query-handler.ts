import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { GetAlarmsQuery } from "./get-alarms.query";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]> {
    constructor(private readonly alarmRepository: FindAlarmsRepository) { }
    private readonly logger = new Logger(GetAlarmsQueryHandler.name)
    
    async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
        this.logger.debug(`Processing "GetAlarmsQuery"`)

        return this.alarmRepository.findAll()
    }

}