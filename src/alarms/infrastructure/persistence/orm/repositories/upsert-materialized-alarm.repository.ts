import { Injectable } from "@nestjs/common";
import { FindAlarmsRepository } from "src/alarms/application/ports/find-alarms.repository";
import { InjectModel } from "@nestjs/mongoose";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";
import { Model } from "mongoose";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { UpsertMaterializedAlarmRepository } from "src/alarms/application/ports/upsert-materialized-alarm.repository";

@Injectable()
export class OrmUpsertMaterializedAlarmRepository implements UpsertMaterializedAlarmRepository {
    constructor(@InjectModel(MaterializedAlarmView.name) private readonly alarmModel: Model<MaterializedAlarmView>) {

    }
    async upsert(alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>): Promise<void> {
        await this.alarmModel.findOneAndUpdate({ id: alarm.id }, alarm, { upsert: true })
    }
}