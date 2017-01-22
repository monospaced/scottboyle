var rsync = require('rsyncwrapper');
var host = 'mnspcd';
var dest = '~/webapps/static_scottboyle';

rsync({
  delete: true,
  dest: dest,
  exclude: [
    '.well-known',
    'google26897385c23df8ed.html',
  ],
  host: host,
  recursive: true,
  src: './build/',
  ssh: true,
}, function (error, stdout, stderr, cmd) {
  if (error) {
    console.log(error.message);
  } else {
    console.log(stdout, stderr, cmd);
  }
});
