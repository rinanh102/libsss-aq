import { Optional } from '@heronjs/common';
import { Knex } from 'knex';
import { BaseTable, RelationTable } from '../table';
import { SortType } from './query-util.enums';

export type ResolveOption<T> = (keyof T | { [P in keyof T]?: ResolveOption<T[P]> | (string | object)[] })[];

export type QueryUtilJoinOptions<T> = {
    resolve?: ResolveOption<T>;
};

export type AllTables = Map<string, BaseTable>;
export type AllRelations = Map<string, RelationTable>;

export type QueryUtilMethodOptions = {
    trx?: Knex.Transaction;
    forUpdate?: boolean;
};

export type PaginationOutput<T> = {
    items: T;
    pagination: {
        offset: number;
        limit: number;
        total?: number;
    };
};

export type PaginationInputProps<T> = {
    offset?: Optional<number>;
    limit?: Optional<number>;
    filter?: Optional<T>;
    orderBy?: Optional<string>;
    sort?: Optional<SortType>;
};

export type QueryInput<T = any> = {
    offset?: Optional<number>;
    limit?: Optional<number>;
    filter?: Optional<FilterInput<T>>;
    eavFilter?: Optional<FilterInput>;
    sort?: Optional<SortInput<T>>;
};

export type QueryInputFindOne<T = any> = {
    filter?: Optional<FilterInput<T>>;
    sort?: Optional<SortInput<T>>;
};

type ConditionInput = {
    eq?: string | boolean | null;
    gt?: string;
    lt?: string;
    gte?: string;
    lte?: string;
    in?: string[];
    notIn?: string[];
    contains?: string;
    startWith?: string;
    endWith?: string;
    not?: string | null;
    regex?: string;
    isNull?: true;
    isNotNull?: true;
    group?: ConditionInput;
    orEq?: string | boolean | null;
    orGt?: string;
    orLt?: string;
    orGte?: string;
    orLte?: string;
    orIn?: string[];
    orNotIn?: string[];
    orContains?: string;
    orStartWith?: string;
    orEndWith?: string;
    orNot?: string | null;
    orRegex?: string;
    orIsNull?: true;
    orIsNotNull?: true;
    orGroup?: ConditionInput;
};

export type FilterInput<T = any> = {
    [P in keyof T]?: ConditionInput | object | FilterInput<T[P]>;
};

export type SortInput<T = any> = {
    [P in keyof T]?: SortType | SortInput<T[P]>;
};
