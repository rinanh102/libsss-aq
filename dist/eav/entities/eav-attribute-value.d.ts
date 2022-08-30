import { Nullable } from '@heronjs/common';
import { Entity } from '../../domain';
import { EavAttributeValueCreateInput, EavAttributeValueCreateOutput, EavAttributeValueUpdateInput, EavAttributeValueUpdateOutput } from '../types';
export interface EavAttributeValueProps {
    id: string;
    value: any;
    entityId: string;
    attributeCode: string;
    createdAt: Date;
    updatedAt: Nullable<Date>;
}
export declare class EavAttributeValue extends Entity<EavAttributeValueProps> {
    constructor(id?: string, props?: EavAttributeValueProps);
    get value(): any;
    get entityId(): string;
    get attributeCode(): string;
    get createdAt(): Date;
    get updatedAt(): Nullable<Date>;
    private setValue;
    private setEntityId;
    private setAttributeCode;
    private setCreatedAt;
    private setUpdatedAt;
    create(payload: EavAttributeValueCreateInput): Promise<EavAttributeValueCreateOutput>;
    update(payload: EavAttributeValueUpdateInput): Promise<EavAttributeValueUpdateOutput>;
    delete(): void;
}
