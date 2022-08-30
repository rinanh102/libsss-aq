import { IMapper } from '../../objects';
import { EavAttributeDTO } from '../dtos';
import { EavAttribute } from '../entities';
export declare type IEavAttributeMapper = IMapper<EavAttributeDTO, EavAttribute>;
export declare class EavAttributeMapper implements IEavAttributeMapper {
    fromEntityToDTO(entity: EavAttribute): EavAttributeDTO;
    fromDTOToEntity(dto: EavAttributeDTO): EavAttribute;
}
