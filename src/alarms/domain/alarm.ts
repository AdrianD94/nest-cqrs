import { VersionedAggregateRoot } from "src/shared/domain/aggregate-root";
import { AlarmItem } from "./alarm-item";
import { AlarmSeverity } from "./value-objects/alarm-severity";
import { AcknowledgeAlarmEvent } from "./events/acknowledge-alarm.event";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-event";
import { AlarmCreatedEvent } from "./events/alarm-created.event";
import { FalseAlarmEvent } from "./events/false-alarm.event";

export class Alarm extends VersionedAggregateRoot {
    public name: string;
    public severity: AlarmSeverity;
    public triggeredAt: Date;
    public isAcknowledged = false;
    public items = new Array<AlarmItem>();
    constructor(public id: string) { super() }

    public acknowledge() {
        this.apply(new AcknowledgeAlarmEvent(this.id))
    }

    public falseAlarm() {
        this.apply(new FalseAlarmEvent(this.id))
    }

    public addAlarmItem(item: AlarmItem) {
        this.items.push(item);
    }

    [`on${AlarmCreatedEvent.name}`](event: SerializedEventPayload<AlarmCreatedEvent>) {
        this.name = event.alarm.name,
            this.severity = new AlarmSeverity(event.alarm.severity),
            this.triggeredAt = new Date(event.alarm.triggeredAt),
            this.isAcknowledged = event.alarm.isAcknowledged,
            this.items = event.alarm.items.map((item) => new AlarmItem(item.id, item.name, item.type))
    }

    [`on${AcknowledgeAlarmEvent.name}`](event: SerializedEventPayload<AcknowledgeAlarmEvent>) {
        if (this.isAcknowledged) {
            throw new Error('alarm alread acknowledged');

        }
        this.isAcknowledged = true
    }

    [`on${FalseAlarmEvent.name}`](event: SerializedEventPayload<FalseAlarmEvent>) {
        this.isAcknowledged = false;
    }
}