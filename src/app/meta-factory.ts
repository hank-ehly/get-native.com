/**
 * meta-factory
 * getnative.org
 *
 * Created by henryehly on 2017/08/02.
 */

import { LanguageCode } from './core/typings/language-code';

import * as _ from 'lodash';

const translationConfig = {
    en: {
        'default': {
            title: 'getnative. Break the barrier between "proficient" and "native-like."',
            description: `getnative is a free online language learning tool that uses the imitation of native speakers as a way to improve
            pronunciation and general language usage. Using high quality videos of real native speakers, getnative guides users through an
            automated, intensive study routine. You only decide how much time to spend.`
        },
        dashboard: {
            title: 'Dashboard'
        },
        settings: {
            general: {
                title: 'General Settings'
            },
            notification: {
                title: 'Notification Settings'
            },
            security: {
                title: 'Security Settings'
            },
            activity: {
                title: 'Activity'
            }
        },
        library: {
            title: 'Library'
        },
        libraryDetail: {
            buttons: {
                back: 'Back'
            }
        },
        study: {
            listening: {
                title: 'Listening'
            },
            shadowing: {
                title: 'Shadowing'
            },
            speaking: {
                title: 'Speaking'
            },
            writing: {
                title: 'Writing'
            },
            results: {
                title: 'Results'
            }
        },
        help: {
            title: 'Frequently Asked Questions & Contact'
        },
        privacy: {
            title: 'Privacy Policy'
        },
        tos: {
            title: 'Terms of Service'
        },
        pageNotFound: {
            title: 'Page Not Found'
        }
    },
    ja: {
        'default': {
            title: 'getnative.「上手」と「ネイティヴみたい」の壁を壊しましょう…',
            description: `getnativeは、ネイティブのような発音や言い回しを自然と身につけることを目的とする無料オンライン学習ツールです。
            ネイティブスピーカーのインタービュー動画を使用して学習を自動化することにより、短時間で効率よく勉強できるようになります。`
        },
        dashboard: {
            title: 'ダッシュボード'
        },
        settings: {
            general: {
                title: '一般設定'
            },
            notification: {
                title: '通知設定'
            },
            security: {
                title: 'セキュリティ設定'
            },
            activity: {
                title: 'アクティビティ'
            }
        },
        library: {
            title: 'ライブラリ'
        },
        libraryDetail: {
            buttons: {
                back: '戻る'
            }
        },
        study: {
            listening: {
                title: 'リスニング'
            },
            shadowing: {
                title: 'シャドウイング'
            },
            speaking: {
                title: 'スピーキング'
            },
            writing: {
                title: 'ライティング'
            },
            results: {
                title: '結果'
            }
        },
        help: {
            title: 'よくある質問とお問い合わせ'
        },
        privacy: {
            title: '個人情報保護方針'
        },
        tos: {
            title: '利用規約'
        },
        pageNotFound: {
            title: 'ページが見つかりません'
        }
    }
};

export function translateKey(code: LanguageCode, key: string): string {
    return <string>_.defaultTo(_.get(translationConfig, [code, key].join('.')), key);
}
