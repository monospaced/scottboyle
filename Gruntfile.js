module.exports = function(grunt) {

  var app = 'static_scottboyle';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    rsync: {
      dev: {
        options: {
          args: ['--exclude-from=.rsyncignore',],
          delete: true,
          host: 'mnspcd',
          dest: '~/webapps/' + app,
          recursive: true,
          src: './',
          ssh: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('deploy', [
    'rsync',
  ]);
};
