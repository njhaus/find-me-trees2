export type ApiErrorType = {
    code: string,
    error: string
}

// Flattten it, but this doesn't take into account types that may be embedded and just checks the type of each key.
// function flat<T>(obj: T) {
//     const flatObject = {} as Record<keyof T, T[keyof T]>;
//     for (let key in obj) {
//         if (typeof key === 'object') {
            
//         }
//         else {
//             flatObject[key] = obj[key];
//         }
//     }
// }

export function isApiErrorType(error: any): error is ApiErrorType {
    return error && typeof error.code === 'string' && typeof error.error === 'string';
}