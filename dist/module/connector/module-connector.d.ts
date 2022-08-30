import { Optional } from '@heronjs/common';
import { AxiosRequestConfig } from 'axios';
import { ClassConstructor } from 'class-transformer';
export declare enum ModuleConnectionTypes {
    INJECTION = "INJECTION",
    RESTFUL = "RESTFUL"
}
export declare type ModuleConnectorServiceMethodConfig = {
    authToken?: string;
    requestConfig?: AxiosRequestConfig;
};
export declare class RestfulService {
    constructor(payload: {
        host: Optional<string>;
        secretKey: Optional<string>;
        moduleName: string;
    });
    private readonly _host;
    private readonly _secretKey;
    protected get host(): string;
    protected get secretKey(): string;
    protected buildUrl(payload: {
        pathname: string;
        id?: string | number;
        query?: string;
    }): string;
    protected buildConfig(payload?: ModuleConnectorServiceMethodConfig): AxiosRequestConfig;
    protected callAPI<T>(exec: () => Promise<T>): Promise<T>;
}
export interface IModuleConnector<T> {
    service: T;
}
export declare class ModuleConnector<T> implements IModuleConnector<T> {
    constructor(payload: {
        classInjectionService?: ClassConstructor<T>;
        classRestfulService?: ClassConstructor<T>;
        moduleName: string;
        type?: string;
    });
    private readonly _service;
    get service(): T;
}
