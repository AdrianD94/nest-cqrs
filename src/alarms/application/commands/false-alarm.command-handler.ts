import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AcknowledgeAlarmCommand } from "./acknowledge-alarm.command";
import { Logger } from "@nestjs/common";
import { AggregateRehydrator } from "src/shared/aggregate-rehydrator";
import { Alarm } from "src/alarms/domain/alarm";
import { FalseAlarmCommand } from "./false-alarm.command";

@CommandHandler(FalseAlarmCommand)
export class FalseAlarmCommandHandler implements ICommandHandler<FalseAlarmCommand> {
    private readonly logger = new Logger(FalseAlarmCommandHandler.name);

    constructor(private readonly aggregateRehydrator: AggregateRehydrator) {

    }

    async execute(command: AcknowledgeAlarmCommand) {
        const alarm = await this.aggregateRehydrator.rehydrate(command.alarmId, Alarm)
        alarm.falseAlarm();
        alarm.commit();
        return alarm;
    }
}