import { Provider, Scope } from '@heronjs/common';
import { EavMapperTokens } from '../../common';
import { IMapper } from '../../objects';
import { EavAttributeValueDTO } from '../dtos';
import { EavAttributeValue } from '../entities';

export type IEavAttributeValueMapper = IMapper<EavAttributeValueDTO, EavAttributeValue>;

@Provider({ token: EavMapperTokens.ATTRIBUTE_VALUE, scope: Scope.SINGLETON })
export class EavAttributeValueMapper implements IEavAttributeValueMapper {
    fromEntityToDTO(entity: EavAttributeValue): EavAttributeValueDTO {
        return {
            id: entity.id,
            value: entity.value,
            entityId: entity.entityId,
            attributeCode: entity.attributeCode,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    fromDTOToEntity(dto: EavAttributeValueDTO): EavAttributeValue {
        return new EavAttributeValue(dto.id, {
            id: dto.id,
            value: dto.value,
            entityId: dto.entityId,
            attributeCode: dto.attributeCode,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        });
    }
}
