import { Optional } from '@heronjs/common';
import { CreateAttributesValuesInput, EavEntityChangeAttributesValuesInput, UpdateAttributesValuesInput } from '..';
import { IBaseDao } from '../database';
import { EavAttributeDTO } from './dtos';
import { EavAttribute } from './entities';
import { IEavAttributeMapper } from './mappers';
export interface IEavEntityRepo {
    createAttribute: (input: any) => Promise<EavAttribute>;
    updateAttribute: (code: string, input: any) => Promise<EavAttribute>;
    deleteAttribute: (code: string) => Promise<EavAttribute>;
    getAttributeByCode: (code: string) => Promise<Optional<EavAttribute>>;
}
export declare class EavEntityRepo implements IEavEntityRepo {
    protected _eavAttributeMapper: IEavAttributeMapper;
    protected _eavAttributeDAO: IBaseDao<EavAttributeDTO>;
    constructor(_eavAttributeMapper: IEavAttributeMapper, _eavAttributeDAO: IBaseDao<EavAttributeDTO>);
    createAttribute(input: any): Promise<EavAttribute>;
    updateAttribute(code: string, input: any): Promise<EavAttribute>;
    deleteAttribute(code: string): Promise<EavAttribute>;
    getAttributeByCode(code: string): Promise<EavAttribute | undefined>;
}
export declare class EavUtil {
    static getCreateAttributeValuesInput(input: CreateAttributesValuesInput, eavAttributeMapper: IEavAttributeMapper, eavAttributeDAO: IBaseDao<EavAttributeDTO>): Promise<{
        value: any;
        attribute: EavAttribute;
    }[]>;
    static getUpdateAttributeValuesInput(input: UpdateAttributesValuesInput, eavAttributeMapper: IEavAttributeMapper, eavAttributeDAO: IBaseDao<EavAttributeDTO>): Promise<EavEntityChangeAttributesValuesInput>;
}
export * from './entities';
export * from './enums';
export * from './errors';
export * from './types';
export * from './dtos';
export * from './tables';
export * from './mappers';
export * from './usecases';
