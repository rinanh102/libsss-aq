import { BaseTable, Column, Eav, EavAttributeTypes, EavTableTypes, TABLE_FIELD_DEFAULT_VALUE } from '../..';
import { EavAttributeDTO, EavAttributeValueDTO } from '../dtos';

export abstract class EavAttributeValueTable
    extends BaseTable<EavAttributeValueDTO>
    implements EavAttributeValueDTO
{
    @Column()
    id: string = TABLE_FIELD_DEFAULT_VALUE;

    @Column({
        recordParser: (value) => {
            if (Array.isArray(value)) return JSON.stringify(value);
            return value;
        },
        dtoParser: (value, context) => {
            if (context.attribute) {
                const type = context.attribute.type;
                switch (type) {
                    case EavAttributeTypes.STRING:
                        return value;

                    case EavAttributeTypes.NUMBER:
                        return Number(value);

                    case EavAttributeTypes.BOOLEAN:
                        return JSON.parse(value);

                    case EavAttributeTypes.ARRAY:
                        return JSON.parse(value);

                    case EavAttributeTypes.OBJECT:
                        return JSON.parse(value);

                    case EavAttributeTypes.DATETIME:
                        return new Date(value);
                }
            }

            return value;
        },
    })
    value: string = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    @Eav({ type: EavTableTypes.ENTITY })
    entityId: string = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    @Eav({ type: EavTableTypes.ATTRIBUTE })
    attributeCode: string = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    createdAt: Date = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    updatedAt: Date = TABLE_FIELD_DEFAULT_VALUE;

    abstract attribute: EavAttributeDTO;
}
