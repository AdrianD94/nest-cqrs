import { AutowiredEvent } from "src/shared/decorators/autowired-event.decorator";

@AutowiredEvent
export class AcknowledgeAlarmEvent{
    constructor(public readonly alarmId:string){}
}