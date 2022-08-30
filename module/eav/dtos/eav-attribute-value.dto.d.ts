import { Nullable } from '@heronjs/common';
import { EavAttributeDTO } from './eav-attribute.dto';
export interface EavAttributeValueDTO {
    id: string;
    value: any;
    entityId: string;
    attributeCode: string;
    createdAt: Date;
    updatedAt: Nullable<Date>;
    attribute?: EavAttributeDTO;
}
