'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '_source/_assets/js/*.js',
        '_source/_assets/js/plugins/*.js',
        '!_source/_assets/js/main.min.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: false
        },
        files: {
          '_source/_assets/css/main.css': [
            '_source/_assets/less/main.less'
          ]
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '_source/_assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '_source/_assets/css/',
        ext: '.min.css'
      }
    },
    uglify: {
      dist: {
        files: {
          '_source/_assets/js/main.min.js': [
            '_source/_assets/js/plugins/*.js',
            '_source/_assets/js/_*.js'
          ]
        }
      }
    },
    imgcompress: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '_source/images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '_source/images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '_source/images/',
          src: '{,*/}*.svg',
          dest: '_source/images/'
        }]
      }
    },
    watch: {
      less: {
        files: [
          '_source/_assets/less/*.less'
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
        '_source/_assets/css/main.min.css',
        '_source/_assets/js/main.min.js'
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
    'imgcompress',
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