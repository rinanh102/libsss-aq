import { Provider, Scope } from '@heronjs/common';
import { EavMapperTokens } from '../../common';
import { IMapper } from '../../objects';
import { EavAttributeDTO } from '../dtos';
import { EavAttribute } from '../entities';

export type IEavAttributeMapper = IMapper<EavAttributeDTO, EavAttribute>;

@Provider({ token: EavMapperTokens.ATTRIBUTE, scope: Scope.SINGLETON })
export class EavAttributeMapper implements IEavAttributeMapper {
    fromEntityToDTO(entity: EavAttribute): EavAttributeDTO {
        return {
            code: entity.code,
            label: entity.label,
            isRequired: entity.isRequired,
            editable: entity.editable,
            visibility: entity.visibility,
            options: entity.options,
            sortOrder: entity.sortOrder,
            systemDefined: entity.systemDefined,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            type: entity.type,
            status: entity.status,
        };
    }

    fromDTOToEntity(dto: EavAttributeDTO): EavAttribute {
        return new EavAttribute(dto.code, {
            code: dto.code,
            label: dto.label,
            isRequired: dto.isRequired,
            editable: dto.editable,
            visibility: dto.visibility,
            options: dto.options,
            sortOrder: dto.sortOrder,
            systemDefined: dto.systemDefined,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            type: dto.type,
            status: dto.status,
        });
    }
}
