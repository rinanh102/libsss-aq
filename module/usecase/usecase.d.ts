import { FilterInput, SortInput } from '../database/query-util';
export declare type AuthInput<T = any> = {
    authId?: string;
    resourceFilter?: FilterInput<T>;
    metadata?: any;
};
export declare type PaginationInput<T = any> = {
    offset?: number;
    limit?: number;
    sort?: SortInput<T>;
    filter?: FilterInput<T>;
    eavFilter?: FilterInput;
};
export declare type UseCaseContext = {
    firstInput: any;
    auth?: AuthInput<any>;
};
export declare type UseCasePipeMethod<InputType = any, OutputType = any> = (payload: InputType) => Promise<OutputType>;
export interface IUseCase<T, K, L extends UseCaseContext> {
    exec(firstInput: T, initContext?: Omit<L, 'firstInput'>): Promise<K>;
}
export declare abstract class UseCase<T, K, L extends UseCaseContext> implements IUseCase<T, K, L> {
    private _context;
    protected get context(): L;
    protected updateContext(key: keyof L, value: any): void;
    protected _methods: UseCasePipeMethod[];
    protected setMethods(methods: UseCasePipeMethod[]): void;
    exec(firstInput: T, initContext?: Omit<L, 'firstInput'>): Promise<K>;
    abstract validate: UseCasePipeMethod<any, any>;
    abstract processing: UseCasePipeMethod<any, any>;
    abstract map: UseCasePipeMethod<any, any>;
}
