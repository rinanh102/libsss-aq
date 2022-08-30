import { BaseTable } from '../..';
import { EavAttributeDTO } from '../dtos';
import { EavAttributeTypes, EavAttributeStatus } from '../enums';
export declare class EavAttributeTable extends BaseTable<EavAttributeDTO> implements EavAttributeDTO {
    code: string;
    label: string;
    type: EavAttributeTypes;
    status: EavAttributeStatus;
    sortOrder: number;
    visibility: boolean;
    systemDefined: boolean;
    isRequired: boolean;
    editable: boolean;
    options: any[];
    createdAt: Date;
    updatedAt: Date;
}
