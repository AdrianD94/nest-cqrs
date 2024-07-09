import { Alarm } from "src/alarms/domain/alarm";
import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-severity";
import { AlarmEntity } from "../entities/alarm.entity";

export class AlarmMapper {
    static toDomain(alarmEntity: AlarmEntity): Alarm {
        const alarmServerity = new AlarmSeverity(alarmEntity.severity as 'critical' | 'high' | 'medium' | 'low')
        const alarmModel = new Alarm(alarmEntity.id, alarmEntity.name, alarmServerity);

        return alarmModel;
    }

    static toPersistence(alarm: Alarm): AlarmEntity {
        const entity = new AlarmEntity();
        entity.id = alarm.id;
        entity.name = alarm.name;
        entity.severity = alarm.alarmSeverity.value
        return entity;
    }

}