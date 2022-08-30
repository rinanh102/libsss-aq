import { BaseTable } from '../..';
import { EavAttributeValueDTO, EavEntityDTO } from '../dtos';
export declare abstract class EavEntityTable<T extends EavEntityDTO> extends BaseTable<T> implements EavEntityDTO {
    abstract attributeValues: EavAttributeValueDTO[];
}
