/**
 * user.service.stub
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { UserService } from './user.service';
import { Language } from '../typings/language';
import { User } from '../entities/user';

export class STUBUserService extends UserService {

    get current(): Promise<User> {
        return new Promise(resolve => resolve({}));
    }

    get defaultStudyLanguage(): Promise<Language> {
        return new Promise((resolve) => resolve({code: 'en', name: 'English'}));
    }

}
