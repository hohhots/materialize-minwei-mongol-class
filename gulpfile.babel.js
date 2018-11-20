/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import htmlbuild from 'gulp-htmlbuild';
import jsonminify from 'gulp-jsonminify';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const mainJs = 'main.js';
const mainCss = 'main.css';

// Replace js and css block with one file
gulp.task('htmlblocks', () => 
  gulp.src(['app/index.html'])
  .pipe(htmlbuild({
    // build js with preprocessor
    js: htmlbuild.preprocess.js(block => {
      block.end('scripts/main.js');
    }),
    css: htmlbuild.preprocess.css(block => {
      block.end('styles/main.css');
    })
  }))
  .pipe($.newer('.tmp'))
  .pipe(gulp.dest('.tmp'))
  .pipe($.htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true
  }))
  // Output files
  .pipe($.size({title: 'html', showFiles: true}))
  .pipe(gulp.dest('dist'))
);

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(['app/scripts/**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);

// Optimize images
gulp.task('images', ['audios','videos'], () =>
  gulp.src([
    'app/**/*.{png,gif,jpg,jpeg}',
    '!app/bower_components/**/*'
  ])
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.size({title: 'images'}))
    .pipe(gulp.dest('dist'))
);

// copy audios
gulp.task('audios', () =>
  gulp.src([
    'app/**/*.{ogg,mp3}',
    '!app/bower_components/**/*'
  ])
    .pipe($.size({title: 'audio'}))
    .pipe(gulp.dest('dist'))
);

// copy videos
gulp.task('videos', () =>
  gulp.src([
    'app/**/*.{ogv,webm}',
    '!app/bower_components/**/*'
  ])
    .pipe($.size({title: 'video'}))
    .pipe(gulp.dest('dist'))
);
 
gulp.task('jsons', function () {
    return gulp.src([
      'app/**/*.json',
      '!app/bower_components/**/*'
    ])
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
});

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    'app/*',
    '!app/index.html'
  ], {
    dot: true
  })
  .pipe($.size({title: 'copy'}))
  .pipe(gulp.dest('dist'))
);

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  gulp.src([
    'bower_components/components-font-awesome/fonts/**'
  ])
    .pipe(gulp.dest('.dist/styles/fonts'));

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'bower_components/components-font-awesome/css/font-awesome.min.css',
    'app/styles/**/*.css',
    'app/scripts/**/*.css'
  ])
    .pipe($.concat('main.css'))
    .pipe($.newer('.tmp/styles'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    // Concatenate and minify styles
    .pipe($.cssnano())
    .pipe($.size({title: 'main styles'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('prescripts', () => {
  gulp.src([
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/angular/angular.min.js',
    'app/bower_components/angular-resource/angular-resource.min.js',
    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js'
  ])
  .pipe($.concat('vender.min.js'))
  .pipe($.newer('.tmp/scripts'))
  .pipe($.size({title: 'vender scripts'}))
  .pipe(gulp.dest('.tmp/scripts'));

  return gulp.src([
    'app/scripts/app.js',
    'app/scripts/rootController.js',

    'app/scripts/core/config.js',
    'app/scripts/core/json.js',
    'app/scripts/core/anchorScroll.js',
    'app/scripts/core/util.js',

    'app/scripts/header/subjectsDropDown/subjectsdropdown.component.js',
    'app/scripts/header/mobileDropDown/mobiledropdown.component.js',
    'app/scripts/root/root.component.js',
    'app/scripts/header/header.component.js',
    'app/scripts/home/home.component.js',
    'app/scripts/levelshome/levelshome.component.js',
    'app/scripts/levelshome/levels/levels.component.js',
    'app/scripts/levelshome/levels/books/books.component.js',
    'app/scripts/category/category.component.js',
    'app/scripts/category/alphabet/origin/alphabetorigin.component.js',
    'app/scripts/category/alphabet/origin/practice/originpractice.component.js',
    'app/scripts/category/alphabet/origin/originRandom/originRandom.component.js',
    'app/scripts/category/alphabet/list/alphabetlist.component.js',
    'app/scripts/category/alphabet/list/practice/listpractice.component.js',
    'app/scripts/category/alphabet/list/listRandom/listRandom.component.js',
    'app/scripts/category/alphabet/variant/alphabetvariant.component.js',
    'app/scripts/category/alphabet/variant/practice/variantpractice.component.js',
    'app/scripts/category/alphabet/variant/variantRandom/variantRandom.component.js',
    'app/scripts/category/word/begin/wordBegin.component.js',
    'app/scripts/category/word/begin/practice/wordbeginpractice.component.js',
    'app/scripts/category/ebook/begin/ebookBegin.component.js',
    'app/scripts/subject/subject.component.js',
    'app/scripts/class/class.component.js',
    'app/scripts/lesson/lesson.component.js',
    'app/scripts/footer/footer.component.js',
    'app/scripts/player/player.module.js',
    'app/scripts/player/simplePlayer/simplePlayer.component.js',
    'app/scripts/filter/filter.module.js',
    'app/scripts/filter/alphaOriginFilter/alphaOriginFilter.component.js',
    'app/scripts/word/word.module.js',
    'app/scripts/word/word.component.js',
    'app/scripts/word/word.config.js',
    'app/scripts/player/wordPlayer/wordPlayer.component.js',
    'app/scripts/word/input/mwordInput.component.js',
    'app/scripts/ime/ime.module.js',
    'app/scripts/ime/word/wordIme.component.js',
    'app/scripts/player/audioPlayer/audioPlayer.service.js'
  ])
  .pipe($.concat('app.min.js'))
  .pipe($.newer('.tmp/scripts'))
  .pipe($.babel())
  .pipe(gulp.dest('.tmp/scripts'))
  .pipe($.uglify())
  // Output files
  .pipe($.size({title: 'app scripts'}))
  .pipe(gulp.dest('.tmp/scripts'));

});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', ['prescripts'],() => {
    return gulp.src([
      '.tmp/scripts/vender.min.js',
      '.tmp/scripts/app.min.js'
    ])
    .pipe($.concat('main.js'))
    .pipe($.newer('.tmp/scripts'))
    .pipe($.size({title: 'main scripts'}))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts'));
  }
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src([
    'app/**/*.html',
    '!app/index.html',
    '!app/bower_components/**/*'
  ])
    .pipe($.useref({
      searchPath: '{app}',
      noAssets: true
    }))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp/*', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/**/*.{html,json,jpg,png}'], reload);
  gulp.watch(['app/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  })
);

// Build production files, the default task
gulp.task('default', ['clean', 'htmlblocks'], cb =>
  runSequence(
    'styles',
    // ['lint', 'html', 'scripts', 'images', 'copy'],
    ['scripts', 'html', 'images', 'jsons', 'copy'],
    'generate-service-worker',
    cb
  )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('example.com', {
    //strategy: 'mobile' and 'desktop'
    strategy: 'desktop'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/'
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
