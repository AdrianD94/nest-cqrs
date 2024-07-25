import { Injectable } from "@nestjs/common";
import { FindAlarmsRepository } from "src/alarms/application/ports/find-alarms.repository";
import { InjectModel } from "@nestjs/mongoose";
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from "../schemas/materialized-alarm-view.schema";
import { Model } from "mongoose";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
    constructor(@InjectModel(MaterializedAlarmView.name) private readonly alarmModel: Model<MaterializedAlarmView>) {

    }
   async findAll(): Promise<AlarmReadModel[]> {
        return await this.alarmModel.find();
    }
}