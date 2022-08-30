import { Nullable } from '@heronjs/common';
import { EavAttributeStatus, EavAttributeTypes } from '..';

export type EavAttributeDTO = {
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
};
