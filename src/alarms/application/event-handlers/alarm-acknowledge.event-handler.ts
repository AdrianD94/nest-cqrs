import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-event";
import { AcknowledgeAlarmEvent } from "src/alarms/domain/events/acknowledge-alarm.event";
import e from "express";

@EventsHandler(AcknowledgeAlarmEvent)
export class AcknowledgeAlarmEventEventHandler implements IEventHandler<SerializedEventPayload<AcknowledgeAlarmEvent>> {
    private readonly logger = new Logger(AcknowledgeAlarmEventEventHandler.name)

    constructor(private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository) {

    }

    async handle(event: SerializedEventPayload<AcknowledgeAlarmEvent>) {
        this.logger.debug(`Alarm created event: ${JSON.stringify(event)}`)
        await this.upsertMaterializedAlarmRepository.upsert({ id: event.alarmId, isAwknowledged: true })
    }
}