import { BaseTable, Column, TABLE_FIELD_DEFAULT_VALUE } from '../..';
import { EavAttributeDTO } from '../dtos';
import { EavAttributeTypes, EavAttributeStatus } from '../enums';

export class EavAttributeTable extends BaseTable<EavAttributeDTO> implements EavAttributeDTO {
    @Column({ isPrimaryKey: true })
    code: string = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    label: string = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    type: EavAttributeTypes = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    status: EavAttributeStatus = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    sortOrder: number = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    visibility: boolean = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    systemDefined: boolean = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    isRequired: boolean = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    editable: boolean = TABLE_FIELD_DEFAULT_VALUE;

    @Column({
        recordParser: (value) => {
            if (Array.isArray(value)) return JSON.stringify(value);
            return value;
        },
        dtoParser: (value) => {
            try {
                return JSON.parse(value);
            } catch (error) {
                return null;
            }
        },
    })
    options: any[] = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    createdAt: Date = TABLE_FIELD_DEFAULT_VALUE;

    @Column()
    updatedAt: Date = TABLE_FIELD_DEFAULT_VALUE;
}
