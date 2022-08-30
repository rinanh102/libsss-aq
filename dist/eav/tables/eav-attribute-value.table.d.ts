import { BaseTable } from '../..';
import { EavAttributeDTO, EavAttributeValueDTO } from '../dtos';
export declare abstract class EavAttributeValueTable extends BaseTable<EavAttributeValueDTO> implements EavAttributeValueDTO {
    id: string;
    value: string;
    entityId: string;
    attributeCode: string;
    createdAt: Date;
    updatedAt: Date;
    abstract attribute: EavAttributeDTO;
}
