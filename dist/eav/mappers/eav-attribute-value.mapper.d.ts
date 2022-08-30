import { IMapper } from '../../objects';
import { EavAttributeValueDTO } from '../dtos';
import { EavAttributeValue } from '../entities';
export declare type IEavAttributeValueMapper = IMapper<EavAttributeValueDTO, EavAttributeValue>;
export declare class EavAttributeValueMapper implements IEavAttributeValueMapper {
    fromEntityToDTO(entity: EavAttributeValue): EavAttributeValueDTO;
    fromDTOToEntity(dto: EavAttributeValueDTO): EavAttributeValue;
}
