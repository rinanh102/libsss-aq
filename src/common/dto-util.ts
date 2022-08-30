export class DtoUtil {
    public static map<T = any>(
        input: object,
        options?: {
            handler?: (input: object) => T;
            useUnixtime?: boolean;
        },
    ): T {
        if (input === undefined || input === null) return input;

        let data: any = input;

        if (options?.handler) data = options.handler(data);
        if (options?.useUnixtime) this.convertDateToUnixtime(data);

        return data as T;
    }

    private static convertDateToUnixtime(data: object) {
        Object.keys(data).forEach((key) => {
            const index = key as keyof typeof data;
            const value: any = data[index];

            if (value) {
                if (typeof value === 'object') {
                    if (value instanceof Date) {
                        // @ts-ignore
                        data[index] = value.getTime();
                    } else {
                        this.convertDateToUnixtime(value);
                    }
                }
            }
        });
    }
}
