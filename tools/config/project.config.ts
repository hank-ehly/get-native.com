import { join } from 'path';
import { argv } from 'yargs';
import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
    META_TAGS: any[] = require('./meta_tags.json');

    API_PORT = argv['api-port'] || 3000;

    constructor() {
        super();
        this.APP_TITLE = 'Get Native';

        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            {src: 'web-animations-js/web-animations.min.js', inject: 'libs'}
        ];

        let additionalPackages: ExtendPackages[] = [{
            name: 'lodash',
            path: 'node_modules/lodash/lodash.js'
        }];

        this.addPackagesBundles(additionalPackages);

        this.ENABLE_SCSS = true;
    }
}
