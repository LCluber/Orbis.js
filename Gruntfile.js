module.exports = function(grunt){
  var path = require('path');
  require('time-grunt')(grunt);

  var projectName = 'ORBIS';
  var projectNameLC = projectName.toLowerCase();

  var port      = 3003;
  var host      = 'localhost';

  var srcDir          = 'src/';
  var compiledSrcDir  = srcDir + 'build/';
  var distDir         = 'dist/';
  var webDir          = 'website/';
  var publicDir       = webDir + 'public/';
  var nodeDir         = 'node_modules/';
  var bowerDir        = 'bower_components/';
  var docDir          = 'doc/';


  var banner    = '/** MIT License\n' +
    '* \n' +
    '* Copyright (c) 2011 Ludovic CLUBER \n' +
    '* \n' +
    '* Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
    '* of this software and associated documentation files (the "Software"), to deal\n' +
    '* in the Software without restriction, including without limitation the rights\n' +
    '* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
    '* copies of the Software, and to permit persons to whom the Software is\n' +
    '* furnished to do so, subject to the following conditions:\n' +
    '*\n' +
    '* The above copyright notice and this permission notice shall be included in all\n' +
    '* copies or substantial portions of the Software.\n' +
    '*\n' +
    '* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
    '* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
    '* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
    '* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
    '* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
    '* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
    '* SOFTWARE.\n' +
    '*\n' +
    '* http://' + projectNameLC + 'js.lcluber.com\n' +
    '*/\n';


  grunt.option('stack', true);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      lib:{
        src: [  distDir + '*',
                compiledSrcDir + '*'
              ]
      },
      doc:{
        src: [  docDir + '*'
              ]
      },
      websass:{
        src: [  webDir + 'sass/build/*',
                publicDir + 'css/*'
        ]
      },
      webjs:{
        src: [  publicDir + 'js/*'
        ]
      },
      webmisc: {
        src: [  publicDir + 'fonts/*'
        ]
      }
    },
    typedoc: {
  		build: {
  			options: {
  				out: docDir,
  				target: 'es6',
          name: projectName + '.js - Documentation'
  			},
  			src: [srcDir + 'ts/*.ts']
  		}
  	},
    jshint: {
      options: {
        jshintrc: 'config/.jshintrc'
      },
      lib: [ 'Gruntfile.js', srcDir + '**/*.js' ],
      web: [ webDir + 'js/*.js']
    },
    sass: {
      dist: {
        options: {
          trace:true
        },
        files: [{
          expand: true,
          cwd: webDir + 'sass/',
          src: ['*.scss'],
          dest: webDir + 'sass/build/',
          ext: '.css'
        }]
      }
    },
    csslint: {
      dist: {
        options: {
          import: false
        },
        src: [webDir + 'sass/build/**/*.css']
      }
    },
    cssmin:{
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          src: webDir  + 'sass/build/**/*.css',
          dest: publicDir + 'css/style.min.css'
        }]
      }
    },
    htmlmin: {
      static: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: webDir + 'static',
        src: ['**/*.htm'],
        dest: webDir + 'static/'
      }
    },
    bower_concat: {
      all: {
        dest: {
          'js': webDir + 'js/build/bower.js'
          //'css': 'build/_bower.css'
        },
        exclude: [
        ],
        dependencies: {
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    tslint: {
      options: {
        configuration: 'config/tslint.json',
        force: false
      },
      lib: {
        files: [{
          expand: true,
          cwd: srcDir,
          src: [ srcDir + '**/*.ts' ]
        }]
      }
    },
    ts: {
      tsconfig: 'config/tsconfig.json',
      lib : {
        //outDir: compiledSrcDir,
        options: {
          fast: 'never'
        },
        src: [ srcDir + 'ts/**/*.ts', '!node_modules/**/*.ts' ]
      }
    },
    rollup: {
      options: {
        format:'umd',
        moduleName: projectName,
        external: [
          //path.resolve( './bower_components/Type6js/dist/type6.js' ),
          path.resolve( './bower_components/Taipanjs/dist/taipan.js' ),
          path.resolve( './bower_components/Weejs/dist/wee.js' ),
          path.resolve( './bower_components/Mouettejs/dist/mouette.js' )
        ],
        banner: banner
      },
      bundle:{
        files: [ {
          src : compiledSrcDir + projectNameLC + '.js',
          dest : distDir + projectNameLC + '.js'
        } ]
      }
    },
    uglify: {
      // lib: {
      //   options: {
      //     beautify: true,
      //     banner: banner,
      //     mangle: false,
      //     compress:false
      //   },
      //   src: src,
      //   dest: distDir + projectNameLC + '.js'
      // },
      libmin: {
        options: {
          sourceMap: false,
          sourceMapName: srcDir + 'sourcemap.map',
          banner: banner,
          mangle: {
            reserved: [projectName]
          },
          compress: {
            sequences: true,
            properties: true,
            dead_code: true,
            unsafe: false,
            conditionals:true,
            comparisons:true,
            booleans:true,
            loops:true,
            unused: true,
            hoist_funs:true,
            if_return:true,
            join_vars:true,
            warnings: true,
            drop_console: false,
            keep_fargs: false,
            keep_fnames: false
          }
        },
        src: distDir + projectNameLC + '.js',
        dest: distDir + projectNameLC + '.min.js'
      },
      bower: {
        options: {
          sourceMap: false,
          sourceMapName: srcDir + 'sourcemap.map',
          mangle: {
            reserved: []
          },
          banner: '',
          compress: {
            sequences: true,
            properties: true,
            dead_code: true,
            unsafe: false,
            conditionals:true,
            comparisons:true,
            booleans:true,
            loops:true,
            unused: true,
            hoist_funs:true,
            if_return:true,
            join_vars:true,
            warnings: true,
            drop_console: false,
            keep_fargs: false,
            keep_fnames: false
          }
        },
        files: [{
          src: webDir + 'js/build/*.js',
          dest : webDir + 'js/build/bower.min.js'
        }]
      },
      web: {
        options: {
          sourceMap: false,
          sourceMapName: srcDir + 'sourcemap.map',
          mangle: {
            reserved: ['jQuery']
          },
          banner: '',
          compress: {
            sequences: true,
            properties: true,
            dead_code: true,
            unsafe: false,
            conditionals:true,
            comparisons:true,
            booleans:true,
            loops:true,
            unused: true,
            hoist_funs:true,
            if_return:true,
            join_vars:true,
            warnings: true,
            drop_console: false,
            keep_fargs: false,
            keep_fnames: false
          }
        },
        files: [{
          src  : [
            nodeDir + 'jquery-easing/jquery.easing.1.3.js',
            distDir + projectNameLC + '.js',
            webDir + 'js/*.js'
          ],
          dest : publicDir + 'js/main.min.js'
        }]
      }
    },
    concat:{
      declaration: {
        options: {
          separator: '',
          stripBanners: false,
          banner: banner
        },
        src: compiledSrcDir + '*.d.ts',
        dest: distDir + projectNameLC + '.d.ts'
      },
      webjs: {
        options: {
          separator: '',
          stripBanners: true,
          banner: ''
        },
        src: [nodeDir + 'jquery/dist/jquery.min.js',
              nodeDir + 'bootstrap/dist/js/bootstrap.min.js',
              webDir + 'js/build/bower.min.js',
              //distDir + projectNameLC + '.min.js',
              publicDir + 'js/main.min.js'
            ],
        dest: publicDir + 'js/main.min.js'
      },
      webcss: {
        options: {
          separator: '',
          stripBanners: true,
          banner: ''
        },
        src: [nodeDir + 'font-awesome/css/font-awesome.min.css',
              nodeDir + 'bootstrap/dist/css/bootstrap.min.css',
              bowerDir + 'Mouettejs/dist/mouette.css',
              publicDir + 'css/style.min.css'
            ],
        dest: publicDir + 'css/style.min.css'
      }
    },
    strip_code: {
      options: {
        // /// <reference path="../config/typings/index.d.ts" />
        patterns: [ /import { .* } from '.*';/g,
                    /export { .* } from '.*';/g,
                    /\/\/\/ <reference path=.*\/>/g
                  ]
      },
      declaration: {
          src: distDir + projectName + '.d.ts'
      }
    },
    replace: {
      declaration: {
        options: {
          patterns: [
            {
              match: /\.\.\/\.\.\//g,
              replacement: '../'
            }
          ]
        },
        files: [
          {
            src: distDir + projectName + '.d.ts',
            dest: distDir + projectName + '.d.ts'
          }
        ]
      }
    },
    copy: {
      mouette:{
        expand: true,
        cwd: bowerDir + 'mouettejs/dist/',
        src: ['*.htm'],
        dest: webDir + 'views/',
        filter: 'isFile'
      },
      fonts:{
        expand: true,
        cwd: nodeDir + 'bootstrap/dist/',
        src: ['fonts/**/*'],
        dest: publicDir,
        filter: 'isFile'
      },
      fontAwesome:{
        expand: true,
        cwd: nodeDir + 'font-awesome/',
        src: ['fonts/**/*'],
        dest: publicDir,
        filter: 'isFile'
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          //nodeArgs: ['--debug'],
          delay:1000,
          watch: ['website/routes', 'website/app.js'],
          ext: 'js,scss'
        }
      }
    },
    open: {
      all: {
        path: 'http://' + host + ':' + port
      }
    },
    watch: {
      lib: {
        files: [ srcDir + 'ts/**/*.ts', '!' + srcDir + 'ts/build/*'],
        tasks: ['dist'],
      },
      webpug:{
        files: webDir + 'views/**/*.pug'
      },
      webjs: {
        files: [webDir + 'js/**/*.js', '!' + webDir + 'js/build/*'],
        tasks: ['webjs'],
      },
      websass: {
        files: [webDir + 'sass/**/*.scss', '!' + webDir + 'sass/build/*'],
        tasks: ['websass'],
      },
      options: {
        interrupt: true,
        spawn: false,
        livereload: true,
        livereloadOnError:false
      }
    },
    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: [ 'nodemon', 'watch', 'open' ]
    }
  });

  grunt.loadNpmTasks( 'grunt-bower-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-csslint' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-strip-code' );
  grunt.loadNpmTasks( 'grunt-replace' );
  grunt.loadNpmTasks( 'grunt-concurrent' );
  grunt.loadNpmTasks( 'grunt-nodemon' );
  grunt.loadNpmTasks( 'grunt-open' );
  grunt.loadNpmTasks( 'grunt-tslint' );
  grunt.loadNpmTasks( 'grunt-ts' );
  grunt.loadNpmTasks( 'grunt-rollup' );
  grunt.loadNpmTasks( 'grunt-typedoc' );

  grunt.registerTask( 'lib',
                      'build the library in the dist/ folder',
                      [ 'tslint:lib',
                        'clean:lib',
                        'ts:lib',
                        'rollup',
                        'uglify:libmin',
                        'concat:declaration',
                        'strip_code:declaration',
                        'replace:declaration'
                      ]
                    );

  grunt.registerTask( 'doc',
                      'Compile lib documentation',
                      [ 'clean:doc',
                        'typedoc'
                      ]
                    );

  grunt.registerTask( 'serve',
                      'launch server, open website and watch for changes',
                      [ 'concurrent' ]
                    );

  grunt.registerTask( 'websass',
                      'Compile website css',
                      [ 'clean:websass',
                        'sass',
                        'cssmin',
                        'copy:mouette',
                        'concat:webcss'
                       ]
                    );

  grunt.registerTask( 'webjs',
                      'Compile website js',
                      [ 'jshint:web',
                        'clean:webjs',
                        'bower_concat',
                        'uglify:bower',
                        'uglify:web',
                        'concat:webjs'
                       ]
                    );

  grunt.registerTask( 'webmisc',
                      'Compile website misc',
                      [ 'clean:webmisc',
                        'copy:fonts',
                        'copy:fontAwesome'
                       ]
                    );

  grunt.registerTask( 'website',
                      'build the website in the website/ folder',
                      function() {
                        grunt.task.run('webjs');
                        grunt.task.run('websass');
                        grunt.task.run('webmisc');
                      }
                    );

  grunt.registerTask( 'dist',
                      'build library and website',
                      function() {
                        //build lib
                        grunt.task.run('lib');
                        //build site
                        grunt.task.run('website');
                        //build documentation
                        grunt.task.run('doc');
                      }
                    );

  grunt.registerTask( 'default',
                      'build library, website, launch server, open website and watch for changes.',
                      function() {
                        //build library and website
                        grunt.task.run('dist');
                        // launch server and watch for changes
                        grunt.task.run('serve');
                      }
                    );

};
