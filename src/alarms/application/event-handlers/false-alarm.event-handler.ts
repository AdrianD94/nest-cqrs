import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-event";
import { AcknowledgeAlarmEvent } from "src/alarms/domain/events/acknowledge-alarm.event";
import e from "express";
import { FalseAlarmEvent } from "src/alarms/domain/events/false-alarm.event";

@EventsHandler(FalseAlarmEvent)
export class FalseAlarmEventHandler implements IEventHandler<SerializedEventPayload<AcknowledgeAlarmEvent>> {
    private readonly logger = new Logger(FalseAlarmEventHandler.name)

    constructor(private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository) {

    }

    async handle(event: SerializedEventPayload<AcknowledgeAlarmEvent>) {
        this.logger.debug(`False alarm: ${JSON.stringify(event)}`)
        await this.upsertMaterializedAlarmRepository.upsert({ id: event.alarmId, isAwknowledged: false })
    }
}