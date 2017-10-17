/**
 * meta-factory
 * getnativelearning.com
 *
 * Created by henryehly on 2017/08/02.
 */

import { LanguageCode } from './core/typings/language-code';
import { LangService } from './core/lang/lang.service';

import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import * as _ from 'lodash';

export function metaFactory(localeId: string, lang: LangService): MetaLoader {
    return new MetaStaticLoader({
        callback: (key: string) => translateMetaKey(lang.languageForLocaleId(localeId).code, key),
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        applicationName: 'getnative',
        pageTitleSeparator: ' | ',
        applicationUrl: 'https://getnativelearning.com',
        defaults: {
            title: 'default.title',
            description: 'default.description',
            'og:image': 'https://getnativelearning.com/assets/images/og.png', // todo: i18n && change per page
            'og:image:url': 'https://getnativelearning.com/assets/images/og.png', // todo: i18n && change per page
            'og:image:secure_url': 'https://getnativelearning.com/assets/images/og.png', // todo: i18n && change per page
            'og:image:type': 'image/png',
            'og:image:width': '1200', // todo: change per page
            'og:image:height': '630', // todo: change per page
            'og:locale': 'en_US',
            'og:locale:alternate': 'en_US,ja_JP',
            'og:site_name': 'getnative',
            'og:type': 'website',
            'og:url': 'https://getnativelearning.com', // todo: i18n & change per page
            'twitter:title': 'getnative', // todo: change per page (library detail)
            'twitter:description': 'default.description',
            'twitter:image:src': 'https://getnativelearning.com/assets/images/og.png' // todo: change per page
        }
    });
}

const metaKeyValues = {
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

export function translateMetaKey(code: LanguageCode, key: string): string {
    return <string>_.defaultTo(_.get(metaKeyValues, [code, key].join('.')), key);
}
