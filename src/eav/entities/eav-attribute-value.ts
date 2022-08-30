import { Nullable } from '@heronjs/common';
import { EntityIdUtil } from '../../common';
import { Entity } from '../../domain';
import { ValidatorUtil } from '../../validator';
import {
    EavAttributeValueCreateInput,
    EavAttributeValueCreateInputModel,
    EavAttributeValueCreateOutput,
    EavAttributeValueUpdateInput,
    EavAttributeValueUpdateInputModel,
    EavAttributeValueUpdateOutput,
} from '../types';

export interface EavAttributeValueProps {
    id: string;
    value: any;
    entityId: string;
    attributeCode: string;
    createdAt: Date;
    updatedAt: Nullable<Date>;
}

export class EavAttributeValue extends Entity<EavAttributeValueProps> {
    constructor(id?: string, props?: EavAttributeValueProps) {
        super(id, props);
    }

    public get value(): any {
        return this._props.value;
    }

    public get entityId(): string {
        return this._props.entityId;
    }

    public get attributeCode(): string {
        return this._props.attributeCode;
    }

    public get createdAt(): Date {
        return this._props.createdAt;
    }

    public get updatedAt(): Nullable<Date> {
        return this._props.updatedAt;
    }

    private setValue(value?: any) {
        if (value !== undefined) this._props.value = value;
    }

    private setEntityId(entityId?: string): void {
        if (entityId !== undefined) this._props.entityId = entityId;
    }

    private setAttributeCode(attributeCode?: string): void {
        if (attributeCode !== undefined) this._props.attributeCode = attributeCode;
    }

    private setCreatedAt(createdAt?: Date): void {
        if (createdAt !== undefined) this._props.createdAt = createdAt;
    }

    private setUpdatedAt(updatedAt?: Nullable<Date>): void {
        if (updatedAt !== undefined) this._props.updatedAt = updatedAt;
    }

    public async create(payload: EavAttributeValueCreateInput): Promise<EavAttributeValueCreateOutput> {
        const model = await ValidatorUtil.validatePlain(EavAttributeValueCreateInputModel, payload);

        this.setId(EntityIdUtil.randomUUID());
        this.setEntityId(model.entityId);
        this.setAttributeCode(model.code);
        this.setValue(model.value);
        this.setCreatedAt(new Date());
    }

    public async update(payload: EavAttributeValueUpdateInput): Promise<EavAttributeValueUpdateOutput> {
        const model = await ValidatorUtil.validatePlain(EavAttributeValueUpdateInputModel, payload);

        this.setValue(model.value);
        this.setUpdatedAt(new Date());
    }

    public delete(): void {
        return;
    }
}
