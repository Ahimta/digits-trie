import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import mocha from 'gulp-mocha';
import webpackConfig from './webpack.config';
import cloneDeep from 'lodash/cloneDeep';

gulp.task('webpack', () =>
  gulp.src('src.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('.'))
);

gulp.task('test', () =>
  gulp.src(['test.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register',
      globals: {
        should: require('should')
      }
    })));

gulp.task('uglify', () => {
  let webpackConfigMin = cloneDeep(webpackConfig);
  webpackConfigMin.plugins =[
    new webpack.optimize.UglifyJsPlugin({sourceMap: true})
  ];
  webpackConfigMin.output.filename = 'dist/digits-trie.min.js';

  return gulp.src('src.js')
    .pipe(webpackStream(webpackConfigMin, webpack))
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['webpack', 'uglify']);
