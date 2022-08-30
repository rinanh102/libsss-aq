import { Nullable } from '@heronjs/common';
import { ValidatorUtil } from '../..';
import { Entity } from '../../domain';
import { EavAttributeTypes, EavAttributeStatus } from '../enums';
import {
    MustBeANumberError,
    MustBeAStringError,
    MustBeABooleanError,
    MustBeADatetimeError,
    MustBeAnArrayError,
    AttributeCannotBeDeletedError,
} from '../errors';
import {
    EavAttributeCreateInput,
    EavAttributeCreateInputModel,
    EavAttributeUpdateInput,
    EavAttributeUpdateInputModel,
} from '../types';

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

export class EavAttribute extends Entity<EavAttributeProps> {
    constructor(id?: string, props?: EavAttributeProps) {
        super(id, props);
    }

    public get code(): string {
        return this._props.code;
    }

    public get label(): string {
        return this._props.label;
    }

    public get type(): EavAttributeTypes {
        return this._props.type;
    }

    public get isRequired(): boolean {
        return this._props.isRequired;
    }

    public get editable(): boolean {
        return this._props.editable;
    }

    public get visibility(): boolean {
        return this._props.visibility;
    }

    public get options(): any[] {
        return this._props.options;
    }

    public get sortOrder(): number {
        return this._props.sortOrder;
    }

    public get systemDefined(): boolean {
        return this._props.systemDefined;
    }

    public get status(): EavAttributeStatus {
        return this._props.status;
    }

    public get createdAt(): Date {
        return this._props.createdAt;
    }

    public get updatedAt(): Nullable<Date> {
        return this._props.updatedAt;
    }

    private setCode(code?: string): void {
        if (code !== undefined) this._props.code = code;
    }

    private setLabel(label?: string): void {
        if (label !== undefined) this._props.label = label;
    }

    private setType(type?: EavAttributeTypes): void {
        if (type !== undefined) this._props.type = type;
    }

    private setIsRequired(isRequired?: boolean): void {
        if (isRequired !== undefined) this._props.isRequired = isRequired;
    }

    private setEditable(editable?: boolean): void {
        if (editable !== undefined) this._props.editable = editable;
    }

    private setVisibility(visibility?: boolean): void {
        if (visibility !== undefined) this._props.visibility = visibility;
    }

    private setOptions(options?: any[]): void {
        if (options !== undefined) {
            options.forEach((value) => {
                switch (this.type) {
                    case EavAttributeTypes.NUMBER:
                        if (typeof value !== 'number') throw new MustBeANumberError();
                        break;

                    case EavAttributeTypes.STRING:
                        if (typeof value !== 'string') throw new MustBeAStringError();
                        break;

                    case EavAttributeTypes.BOOLEAN:
                        if (typeof value !== 'boolean') throw new MustBeABooleanError();
                        break;

                    case EavAttributeTypes.DATETIME:
                        value = new Date(value);
                        if (isNaN(value)) throw new MustBeADatetimeError();
                        break;

                    case EavAttributeTypes.ARRAY:
                        if (!Array.isArray(value)) throw new MustBeAnArrayError();
                        break;

                    case EavAttributeTypes.OBJECT:
                        if (value === null || typeof value !== 'object') throw new MustBeAnArrayError();
                        break;
                }
            });

            this._props.options = options;
        }
    }

    private setSortOrder(sortOrder?: number): void {
        if (sortOrder !== undefined) this._props.sortOrder = sortOrder;
    }

    private setSystemDefined(systemDefined?: boolean): void {
        if (systemDefined !== undefined) this._props.systemDefined = systemDefined;
    }

    private setStatus(status?: EavAttributeStatus): void {
        if (status !== undefined) this._props.status = status;
    }

    private setCreatedAt(createdAt?: Date): void {
        if (createdAt !== undefined) this._props.createdAt = createdAt;
    }

    private setUpdatedAt(updatedAt?: Nullable<Date>): void {
        if (updatedAt !== undefined) this._props.updatedAt = updatedAt;
    }

    public async create(payload: EavAttributeCreateInput): Promise<void> {
        const model = await ValidatorUtil.validatePlain(EavAttributeCreateInputModel, payload);
        this.setId(model.code);
        this.setCode(model.code);
        this.setLabel(model.label);
        this.setType(model.type);
        this.setIsRequired(model.isRequired ?? false);
        this.setEditable(true);
        this.setSystemDefined(false);
        this.setVisibility(model.visibility === undefined ? true : model.visibility);
        this.setOptions(model.options);
        this.setSortOrder(model.sortOrder ?? 0);
        this.setStatus(model.status ?? EavAttributeStatus.ENABLED);
        this.setCreatedAt(new Date());
    }

    public async update(payload: EavAttributeUpdateInput): Promise<void> {
        const model = await ValidatorUtil.validatePlain(EavAttributeUpdateInputModel, payload);
        this.setLabel(model.label);
        this.setIsRequired(model.isRequired);
        this.setVisibility(model.visibility);
        this.setOptions(model.options);
        this.setSortOrder(model.sortOrder);
        this.setStatus(model.status);
        this.setUpdatedAt(new Date());
    }

    public async delete(): Promise<void> {
        if (this.systemDefined === true) throw new AttributeCannotBeDeletedError();
    }
}
