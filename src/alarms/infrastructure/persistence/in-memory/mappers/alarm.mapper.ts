import { Alarm } from "src/alarms/domain/alarm";
import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-severity";
import { AlarmEntity } from "../entities/alarm.entity";
import { AlarmItem } from "src/alarms/domain/alarm-item";
import { AlarmItemEntity } from "../entities/alarm-item.entity";

export class AlarmMapper {
    static toDomain(alarmEntity: AlarmEntity): Alarm {
        const alarmServerity = new AlarmSeverity(alarmEntity.severity as 'critical' | 'high' | 'medium' | 'low')
        const alarmModel = new Alarm(alarmEntity.id);
        alarmModel.name = alarmEntity.name;
        alarmModel.isAcknowledged = alarmEntity.isAcknowledged
        alarmModel.severity = alarmServerity;
        alarmModel.triggeredAt = alarmEntity.triggeredAt
        alarmModel.items = alarmEntity.items.map((item) => new AlarmItem(item.id, item.name, item.type))
        return alarmModel;
    }

    static toPersistence(alarm: Alarm): AlarmEntity {
        const entity = new AlarmEntity();
        entity.id = alarm.id;
        entity.name = alarm.name;
        entity.severity = alarm.severity.value
        entity.isAcknowledged = alarm.isAcknowledged;
        entity.triggeredAt = alarm.triggeredAt;
        entity.items = alarm.items.map((item) => {
            const itemEntity = new AlarmItemEntity();
            itemEntity.id = item.id;
            itemEntity.name = item.name;
            item.type = item.type
            return itemEntity
        })
        return entity;
    }

}