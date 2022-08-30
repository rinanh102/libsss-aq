import { Optional } from '@heronjs/common';
import { FilterInput, SortInput } from '../database/query-util';

export type AuthInput<T = any> = {
    authId?: string;
    resourceFilter?: FilterInput<T>;
    metadata?: any;
};

export type PaginationInput<T = any> = {
    offset?: number;
    limit?: number;
    sort?: SortInput<T>;
    filter?: FilterInput<T>;
    eavFilter?: FilterInput;
};

export type UseCaseContext = {
    firstInput: any;
    auth?: AuthInput<any>;
};

export type UseCasePipeMethod<InputType = any, OutputType = any> = (
    payload: InputType,
) => Promise<OutputType>;

export interface IUseCase<T, K, L extends UseCaseContext> {
    exec(firstInput: T, initContext?: Omit<L, 'firstInput'>): Promise<K>;
}

export abstract class UseCase<T, K, L extends UseCaseContext> implements IUseCase<T, K, L> {
    private _context: Optional<L>;
    protected get context(): L {
        if (!this._context) throw new Error('Context empty!');
        return this._context;
    }
    protected updateContext(key: keyof L, value: any) {
        if (!this._context) this._context = {} as any;
        // @ts-ignore
        this._context[key] = value;
    }

    protected _methods: UseCasePipeMethod[] = [];
    protected setMethods(methods: UseCasePipeMethod[]) {
        this._methods = methods;
    }

    async exec(firstInput: T, initContext?: Omit<L, 'firstInput'>): Promise<K> {
        if (this._methods && this._methods.length) {
            if (initContext && typeof initContext === 'object')
                this._context = {
                    ...initContext,
                    firstInput,
                } as L;

            let data = firstInput;
            for (let i = 0; i < this._methods.length; i++) {
                const method = this._methods[i];

                if (typeof method !== 'function') throw new Error('Pipe method is not valid function!');

                data = await method(data);
            }

            return data as any as K;
        } else throw new Error('Pipe methods not setted or empty!');
    }

    abstract validate: UseCasePipeMethod<any, any>;
    abstract processing: UseCasePipeMethod<any, any>;
    abstract map: UseCasePipeMethod<any, any>;
}
