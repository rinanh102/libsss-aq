import { Optional } from '@heronjs/common';
import {
    CreateAttributesValuesInput,
    EavEntityChangeAttributesValuesInput,
    UpdateAttributesValuesInput,
} from '..';
import { IBaseDao } from '../database';
import { EavAttributeDTO } from './dtos';
import { EavAttribute } from './entities';
import { AttributeNotFoundError } from './errors';
import { IEavAttributeMapper } from './mappers';

export interface IEavEntityRepo {
    createAttribute: (input: any) => Promise<EavAttribute>;
    updateAttribute: (code: string, input: any) => Promise<EavAttribute>;
    deleteAttribute: (code: string) => Promise<EavAttribute>;
    getAttributeByCode: (code: string) => Promise<Optional<EavAttribute>>;
}

export class EavEntityRepo implements IEavEntityRepo {
    constructor(
        protected _eavAttributeMapper: IEavAttributeMapper,
        protected _eavAttributeDAO: IBaseDao<EavAttributeDTO>,
    ) {}

    public async createAttribute(input: any) {
        const attribute = new EavAttribute();
        await attribute.create(input);

        await this._eavAttributeDAO.create(attribute);

        return attribute;
    }

    public async updateAttribute(code: string, input: any) {
        const attribute = await this.getAttributeByCode(code);

        if (!attribute) throw new AttributeNotFoundError(code);

        await attribute.update(input);

        await this._eavAttributeDAO.updateById(attribute.id, attribute);

        return attribute;
    }

    public async deleteAttribute(code: string) {
        const attribute = await this.getAttributeByCode(code);

        if (!attribute) throw new AttributeNotFoundError(code);

        await attribute.delete();

        await this._eavAttributeDAO.deleteById(attribute.id);

        return attribute;
    }

    public async getAttributeByCode(code: string) {
        const dto = (await this._eavAttributeDAO.findOne({
            filter: {
                code: { eq: code },
            },
        })) as Optional<EavAttributeDTO>;
        return dto ? this._eavAttributeMapper.fromDTOToEntity(dto) : dto;
    }
}

export class EavUtil {
    static async getCreateAttributeValuesInput(
        input: CreateAttributesValuesInput,
        eavAttributeMapper: IEavAttributeMapper,
        eavAttributeDAO: IBaseDao<EavAttributeDTO>,
    ) {
        const codes = Array.from(new Set(input.map((a) => a.code)));
        const attributes = (
            (await eavAttributeDAO.find({
                filter: {
                    code: { in: codes },
                },
            })) as EavAttributeDTO[]
        ).map((a) => eavAttributeMapper.fromDTOToEntity(a));

        const attributesMap = new Map<string, EavAttribute>();
        attributes.forEach((a) => {
            if (!attributesMap.get(a.code)) attributesMap.set(a.code, a);
        });
        const attributeValuesInput = input.reduce((a: { value: any; attribute: EavAttribute }[], b) => {
            const attribute = attributesMap.get(b.code);
            if (attribute)
                a.push({
                    value: b.value,
                    attribute,
                });
            return a;
        }, []);

        return attributeValuesInput;
    }

    static async getUpdateAttributeValuesInput(
        input: UpdateAttributesValuesInput,
        eavAttributeMapper: IEavAttributeMapper,
        eavAttributeDAO: IBaseDao<EavAttributeDTO>,
    ): Promise<EavEntityChangeAttributesValuesInput> {
        const codes = Array.from(
            new Set([
                ...(input.deleteItems ? input.deleteItems.map((a) => a.code) : []),
                ...(input.updateItems ? input.updateItems.map((a) => a.code) : []),
                ...(input.createItems ? input.createItems.map((a) => a.code) : []),
            ]),
        );

        const attributes = (
            (await eavAttributeDAO.find({
                filter: {
                    code: { in: codes },
                },
            })) as EavAttributeDTO[]
        ).map((a) => eavAttributeMapper.fromDTOToEntity(a));

        const attributesMap = new Map<string, EavAttribute>();
        attributes.forEach((a) => {
            if (!attributesMap.get(a.code)) attributesMap.set(a.code, a);
        });

        const deleteItems = input.deleteItems?.reduce((a: { attribute: EavAttribute }[], b) => {
            const attribute = attributesMap.get(b.code);
            if (attribute)
                a.push({
                    attribute,
                });
            return a;
        }, []);
        const updateItems = input.updateItems?.reduce((a: { value: any; attribute: EavAttribute }[], b) => {
            const attribute = attributesMap.get(b.code);
            if (attribute)
                a.push({
                    value: b.value,
                    attribute,
                });
            return a;
        }, []);
        const createItems = input.createItems?.reduce((a: { value: any; attribute: EavAttribute }[], b) => {
            const attribute = attributesMap.get(b.code);
            if (attribute)
                a.push({
                    value: b.value,
                    attribute,
                });
            return a;
        }, []);

        return { deleteItems, updateItems, createItems };
    }
}

export * from './entities';
export * from './enums';
export * from './errors';
export * from './types';
export * from './dtos';
export * from './tables';
export * from './mappers';
export * from './usecases';
