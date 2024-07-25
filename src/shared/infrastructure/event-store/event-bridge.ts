import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ChangeStream, ChangeStreamDocument, ChangeStreamInsertDocument } from 'mongodb';
import { Event, EventDocument } from "./schemas/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core.constants";
import { Model } from "mongoose";
import { EventBus } from "@nestjs/cqrs";
import { EventDeserializer } from "./deserializers/event.deserializer";

@Injectable()
export class EventBridge implements OnApplicationBootstrap, OnApplicationShutdown {
    private changeStream: ChangeStream<Document, ChangeStreamDocument<Document>>;

    constructor(
        @InjectModel(Event.name, EVENT_STORE_CONNECTION) private readonly eventStore: Model<Event>,
        private readonly eventBus: EventBus,
        private readonly eventDeserializer: EventDeserializer
    ) {}

    onApplicationBootstrap() {
        const pipeline = [];
        const options = { fullDocument: 'updateLookup' };

        this.changeStream = this.eventStore.watch(pipeline, options) as unknown as ChangeStream<Document, ChangeStreamDocument<Document>>;
        
        this.changeStream.on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
            if (change.operationType === 'insert') {
                this.handleEventStoreChange(change);
            }
        });
    }

    onApplicationShutdown() {
        return this.changeStream.close();
    }

    handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>) {
     
        const insertedEvent = change.fullDocument;
        const eventInstance = this.eventDeserializer.deserialize(insertedEvent);
        this.eventBus.subject$.next(eventInstance.data);
    }
}
