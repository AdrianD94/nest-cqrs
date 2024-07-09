import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { AlarmRepository } from "../ports/alarm.repository";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "src/alarms/domain/alarm";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery, Alarm[]> {
    constructor(private readonly alarmRepository: AlarmRepository) { }
    private readonly logger = new Logger(GetAlarmsQueryHandler.name)
    async execute(): Promise<any> {
        this.logger.debug(`Processing "GetAlarmsQuery"`)

        return this.alarmRepository.findAll()
    }

}