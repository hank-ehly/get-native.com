/**
 * meta-factory
 * get-native.com
 *
 * Created by henryehly on 2017/08/02.
 */

import { LanguageCode } from './core/typings/language-code';
import { LangService } from './core/lang/lang.service';

import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import * as _ from 'lodash';

export function metaFactory(localeId: string, lang: LangService): MetaLoader {
    return new MetaStaticLoader({
        callback: (key: string) => translateMetaTag(lang.languageForLocaleId(localeId).code, key),
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        applicationName: 'getnative',
        pageTitleSeparator: ' | ',
        applicationUrl: 'https://get-native.com',
        defaults: {
            title: 'default.title',
            description: 'default.description',
            'og:image': 'https://get-native.com/assets/images/og.png', // todo: i18n && change per page
            'og:image:url': 'https://get-native.com/assets/images/og.png', // todo: i18n && change per page
            'og:image:secure_url': 'https://get-native.com/assets/images/og.png', // todo: i18n && change per page
            'og:image:type': 'image/png',
            'og:image:width': '1200', // todo: change per page
            'og:image:height': '630', // todo: change per page
            'og:locale': 'en_US',
            'og:locale:alternate': 'en_US,ja_JP',
            'og:site_name': 'getnative',
            'og:type': 'website',
            'og:url': 'https://get-native.com', // todo: i18n & change per page
            'twitter:title': 'getnative', // todo: change per page (library detail)
            'twitter:description': 'default.description',
            'twitter:image:src': 'https://get-native.com/assets/images/og.png' // todo: change per page
        }
    });
}

const config = {
    en: {
        'default': {
            title: 'getnative. Break the barrier between fluid and native-like.',
            description: 'getnative is a language learning resource for advanced speakers'
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
            title: 'getnative. ネーティブな話し方を目指せ',
            description: 'getnativeは、上級者向けの言語学習リソースです。'
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
            }
        },
        library: {
            title: 'ビデオライブラリ'
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

function translateMetaTag(code: LanguageCode, key: string): string {
    return _.defaultTo(_.get(config, [code, key].join('.')), key);
}
