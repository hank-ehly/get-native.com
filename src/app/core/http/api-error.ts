/**
 * api-error
 * getnative.org
 *
 * Created by henryehly on 2017/04/24.
 */

export interface APIError {
    message?: string;
    code?: string;
    status?: number;
}

export type APIErrors = APIError[];
