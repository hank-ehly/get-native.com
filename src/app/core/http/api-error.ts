/**
 * api-error
 * get-native.com
 *
 * Created by henryehly on 2017/04/24.
 */

export interface APIError {
    message: string;
    code: string;
}

export type APIErrors = APIError[];
