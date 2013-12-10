'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '_assets/js/*.js',
        '_assets/js/plugins/*.js',
        '!_assets/js/main.min.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: false
        },
        files: {
          '_assets/css/main.css': [
            '_assets/less/main.less'
          ]
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '_assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '_assets/css/',
        ext: '.min.css'
      }
    },
    uglify: {
      dist: {
        files: {
          '_assets/js/main.min.js': [
            '_assets/js/plugins/*.js',
            '_assets/js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    watch: {
      less: {
        files: [
          '_assets/less/*.less'
        ],
        tasks: ['recess', 'cssmin']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['uglify']
      }
    },
    clean: {
      dist: [
        '_assets/css/main.min.css',
        '_assets/js/main.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-imgcompress');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'recess',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin'
  ]);
  grunt.registerTask('dev', [
    'watch',
    'clean',
    'recess',
    'cssmin',
    'uglify',
  ]);

};