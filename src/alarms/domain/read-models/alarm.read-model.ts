export class AlarmReadModel {
    id: string;
    name: string;
    severity: string;
    triggeredAt: Date;
    isAwknowledged: boolean;
    items: {
        name: string;
        type: string
    }[]
}