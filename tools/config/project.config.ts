import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    meta_tags: any[];

    constructor() {
        super();
        this.APP_TITLE = 'Get Native';

        /* Enable typeless compiler runs (faster) between typed compiler runs. */
        // this.TYPED_COMPILE_INTERVAL = 5;

        // Add `NPM` third-party libraries to be injected/bundled.
        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            {src: 'web-animations-js/web-animations.min.js', inject: 'libs'},
            // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
            // {src: 'lodash/lodash.min.js', inject: 'libs'},
        ];

        // Add `local` third-party libraries to be injected/bundled.
        this.APP_ASSETS = [
            {src: `${this.CSS_SRC}/vendor/reset.css`, inject: true},
            ...this.APP_ASSETS,
            // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
            // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
        ];

        // Add packages (e.g. lodash)
        // let additionalPackages: ExtendPackages[] = [{
        //   name: 'lodash',
        //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
        //   packageMeta: {
        //     main: 'index.js',
        //     defaultExtension: 'js'
        //   }
        // }];
        //
        // or
        //
        // let additionalPackages: ExtendPackages[] = [];
        //
        // additionalPackages.push({
        //   name: 'lodash',
        //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
        //   packageMeta: {
        //     main: 'index.js',
        //     defaultExtension: 'js'
        //   }
        // });
        //
        // this.addPackagesBundles(additionalPackages);

        /* Add to or override NPM module configurations: */
        // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

        this.ENABLE_SCSS = true;

        /* Todo: Rename url once production is up */
        this.meta_tags = [
            {
                name: 'description', content: `Get Native is a language learning resource for advanced foreign language learners. 
                                      Increase your productivity and cut down on study time by using Get Native\'s video database 
                                      and study features.`.trim()
            },
            {
                name: 'keywords', content: `Get Native,get-native,language learning apps,language learning software,language learning 
              websites,language learning programs,language learning strategies`.trim()
            },
            {name: 'og:site_name', content: 'Get Native'},
            {name: 'og:title', content: 'Get Native'},
            {
                name: 'og:description', content: `Get Native is a language learning resource for advanced foreign language learners. 
                                         Increase your productivity and cut down on study time by using Get Native\'s video database 
                                         and study features.`.trim()
            },
            {name: 'og:locale', content: 'en_US'},
            {name: 'og:image', content: 'https://stg.get-native.com/assets/images/home-background.jpg'},
            {name: 'og:image:secure_url', content: 'https://stg.get-native.com/assets/images/home-background.jpg'},
            {name: 'og:image:type', content: 'image/jpeg'},
            {name: 'og:image:width', content: '2000'},
            {name: 'og:image:height', content: '1776'},
            {name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'}
        ];
    }

}
