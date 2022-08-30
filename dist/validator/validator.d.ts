import { ClassConstructor } from 'class-transformer';
export declare class ValidatorUtil {
    static validateOrReject(input: any): Promise<void>;
    static validatePlain<T>(classModel: ClassConstructor<T>, plain: object): Promise<T>;
}
