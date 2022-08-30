"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const entity_1 = require("./entity");
class AggregateRoot extends entity_1.Entity {
    constructor(id, props) {
        super(id, props);
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        console.info(`[Domain Event Created]:`, domainEvent);
    }
    clearEvents() {
        this._domainEvents = [];
    }
    dispatchDomainEvents(eventHandler) {
        try {
            this._domainEvents.forEach((event) => {
                eventHandler.publish(event);
            });
            console.info(`[Domain Event Published]:`, this.domainEvents);
            this.clearEvents();
        }
        catch (err) {
            console.error(`[Domain Event Publish Failed]:`, err);
            throw new Error(`Domain Event Publish Failed!`);
        }
    }
}
exports.AggregateRoot = AggregateRoot;
