module.exports = function(grunt) {

    var fileMap = {
        js: ['dist/jquery.emoji.js', 'src/angular/index.js', 'src/angular/**/*.js']
    };

    // concat/copy files
    var concatConfig = {
        options: {
            banner: '<%= banner %>\n',
            stripBanners: {
                block: true
            }
        },
        src: fileMap.js,
        dest: 'dist/angular.emoji.js'
    };

    // compress js
    var uglifyConfig = {
        options: {
            banner: '<%= banner %>\n'
        },
        src: 'dist/angular.emoji.js',
        dest: 'dist/angular.emoji.min.js'
    };

    grunt.config('concat.angular', concatConfig);
    grunt.config('uglify.angular', uglifyConfig);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('angular', function() {
        grunt.task.run('concat:angular');
        grunt.task.run('uglify:angular');
    });

    return grunt;

};
