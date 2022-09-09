import { Errors, RuntimeError } from '@heronjs/common';
import { ClassConstructor, instanceToPlain, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class ValidatorUtil {
    static async validateOrReject(input: any) {
        try {
            await validateOrReject(input, {
                skipMissingProperties: true,
            });
        } catch (errors) {
            throw new RuntimeError(Errors.VALIDATION_ERR, 10000, 'Validate failed', errors as any);
        }
    }

    static async validatePlain<T>(classModel: ClassConstructor<T>, plain: object): Promise<T> {
        try {
            const model = plainToClass(classModel, plain);
            await validateOrReject(model as any, {
                skipMissingProperties: true,
            });
            return instanceToPlain(model) as T;
        } catch (errors) {
            throw new RuntimeError(Errors.VALIDATION_ERR, 10000, 'Validate failed', errors as any);
        }
    }
}
