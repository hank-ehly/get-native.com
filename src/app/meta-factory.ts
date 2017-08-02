/**
 * meta-factory
 * get-native.com
 *
 * Created by henryehly on 2017/08/02.
 */

import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

export function metaFactory(): MetaLoader {
    return new MetaStaticLoader({
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        applicationName: 'getnative',
        pageTitleSeparator: ' | ',
        applicationUrl: 'https://get-native.com',
        defaults: {
            title: 'getnative',
            description: 'getnative is a language learning resource for advanced speakers',
            'og:image': '/assets/images/og.png',
            'og:image:url': 'https://get-native.com/assets/images/og.png',
            'og:image:secure_url': 'https://get-native.com/assets/images/og.png',
            'og:image:type': 'image/png',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:locale': 'en_US',
            'og:locale:alternate': 'en_US,ja_JP',
            'og:site_name': 'getnative',
            'og:type': 'website',
            'og:url': 'https://get-native.com',
            'twitter:title': 'getnative',
            'twitter:description': 'getnative is a language learning resource for advanced speakers',
            'twitter:image:src': '/assets/images/og.png'
        }
    });
}
