/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const express = require('express');
const app = express();

/* Todo: Use bundle file */
const login = require('./login');
const videos_id = require('./videos_id');
const videos = require('./videos');
const categories = require('./categories');
const study_stats = require('./study-stats');
const cued_videos = require('./cued_videos');

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.use(login);
app.use(videos_id);
app.use(categories);
app.use(videos);
app.use(study_stats);
app.use(cued_videos);

app.listen(3000, () => {
    console.log('Listening on port 3000\n');
});
