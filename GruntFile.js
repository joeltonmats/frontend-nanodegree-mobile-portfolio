'use strict'

var ngrok = require('ngrok');

module.exports = function (grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // copy files -----------------------------------
    copy: {
      production: {
        files: [{ expand: true, cwd: './src', src: ['**'], dest: 'dist/' },],
      }
    },

    // minify css files -----------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      production: {
        files: [{
          expand: true, cwd: 'src', src: ['**/*.css', '!*.min.css'], dest: 'dist', ext: '.min.css'
        }]
      }
    },

    // minify js files -----------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      production: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'dist',
          rename: function (dst, src) {
            return dst + '/' + src.replace('.js', '.min.js');
          }
        }]
      }
    },

    // clean unecessary files -----------------------------------
    clean: {
      production: {
        src: ['dist/**/*.js', 'dist/**/*.css', '!dist/**/*.min.js', '!dist/**/*.min.css']
      }
    },

    // comment js and css and uncomment .min.js and .min.css -----------------------------------
    replace: {
      production: {
        options: {
          patterns:
          [
            { match: /<!--dev build-->/g, replacement: '<!--dev build' },
            { match: /<!--end dev build-->/g, replacement: 'end dev build-->' },
            { match: /<!--production build/g, replacement: '<!--production build-->' },
            { match: /end production build-->/g, replacement: '<!--end production build-->' },
          ]
        },
        files: [{ expand: true, cwd: 'src', src: ['**/*.html'], dest: 'dist/' }]
      }
    },

    // minify html files -----------------------------------
    htmlmin: {
      production: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.html'],
          dest: 'dist'
        }]
      }
    },

    watch: {
      files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.css'],
      tasks: ['copy:production', 'cssmin:production', 'uglify:production', 'clean:production', 'replace:production', 'htmlmin:production']
    },

    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
  });

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function () {
    var done = this.async();
    var port = 3000;

    ngrok.connect(port, function (err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  // Register default tasks
  grunt.registerTask('default', ['psi-ngrok']);
  grunt.registerTask('production', ['copy:production', 'cssmin:production', 'uglify:production', 'clean:production', 'replace:production', 'htmlmin:production']);
};