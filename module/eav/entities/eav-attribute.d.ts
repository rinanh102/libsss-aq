import { Nullable } from '@heronjs/common';
import { Entity } from '../../domain';
import { EavAttributeTypes, EavAttributeStatus } from '../enums';
import { EavAttributeCreateInput, EavAttributeUpdateInput } from '../types';
export interface EavAttributeProps {
    code: string;
    label: string;
    isRequired: boolean;
    editable: boolean;
    visibility: boolean;
    options: any[];
    sortOrder: number;
    systemDefined: boolean;
    createdAt: Date;
    updatedAt: Nullable<Date>;
    type: EavAttributeTypes;
    status: EavAttributeStatus;
}
export declare class EavAttribute extends Entity<EavAttributeProps> {
    constructor(id?: string, props?: EavAttributeProps);
    get code(): string;
    get label(): string;
    get type(): EavAttributeTypes;
    get isRequired(): boolean;
    get editable(): boolean;
    get visibility(): boolean;
    get options(): any[];
    get sortOrder(): number;
    get systemDefined(): boolean;
    get status(): EavAttributeStatus;
    get createdAt(): Date;
    get updatedAt(): Nullable<Date>;
    private setCode;
    private setLabel;
    private setType;
    private setIsRequired;
    private setEditable;
    private setVisibility;
    private setOptions;
    private setSortOrder;
    private setSystemDefined;
    private setStatus;
    private setCreatedAt;
    private setUpdatedAt;
    create(payload: EavAttributeCreateInput): Promise<void>;
    update(payload: EavAttributeUpdateInput): Promise<void>;
    delete(): Promise<void>;
}
