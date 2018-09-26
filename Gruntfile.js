module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    run: {
      options: {
        // ...
      },
      typescript: {
        cmd: 'tsc',
        args: []
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/iota-offline-address-generator.bundle.js': ['build/js/iota-offline-address-generator.js'],
          'dist/js/iota-offline-bundle-signer.bundle.js': ['build/js/iota-offline-bundle-signer.js'],
          'dist/js/iota-online-broadcaster.bundle.js': ['build/js/iota-online-broadcaster.js'],
          'dist/js/qr.bundle.js': ['build/js/qr.js']
        },
        options: {

        }
      }
    },
    copy: {
      css: {
        files: [
          {
            expand: true,
            cwd: './src/css/',
            src:"**",
            dest:"./dist/css/"
          }
        ]    
      },
      images: {
        files: [
          {
            expand: true,
            cwd: './src/img/',
            src:"**",
            dest:"./dist/img/"
          }
        ]    
      },
      html: {
        files: [
          {
            expand: true,
            cwd: './src/',
            src:"*.html",
            dest:"./dist/"
          }
        ]    
      }
    },

    clean: {
      build: {
        src: [ 'build', 'dist' ]
      },
    },
  });

  grunt.registerTask('build', [ 'clean', 'run:typescript', 'browserify', 'copy:css', 'copy:images', 'copy:html' ]);
};
