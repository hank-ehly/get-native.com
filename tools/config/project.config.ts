import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    constructor() {
        super();

        // TODO: Change per page
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
        ];

        /* Add to or override NPM module configurations: */
        // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

        this.ENABLE_SCSS = true;
    }
}
