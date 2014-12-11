module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' + ' * Jquery Emoji <%= pkg.version %>\n' + ' * Copyright <%= grunt.template.today("yyyy") %> cokapp (http://cokapp.com)\n' + ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n' + ' */',

        // create output dirs
        mkdir: {
            all: {
                options: {
                    create: ['dist']
                }
            }
        },

        // concat/copy files
        concat: {
            options: {
                banner: '<%= banner %>\n',
                stripBanners: {
                    block: true
                }
            },
            src: {
                files: {
                    'dist/jquery.emoji.css': [
                        'src/jquery/styles/**.css'
                    ],
                    'dist/jquery.emoji.js': [
                        'src/jquery/scripts/tpls/*.js',
                        'src/jquery/scripts/**/*.js'
                    ]
                }
            }
        },

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n'
            },
            build: {
                src: 'dist/jquery.emoji.js',
                dest: 'dist/jquery.emoji.min.js'
            }
        },

        // compress css
        cssmin: {
            options: {
                banner: '<%= banner %>',
                keepSpecialComments: 0
            },
            dist: {
                files: {
                    'dist/jquery.emoji.min.css': [
                        'dist/jquery.emoji.css'
                    ]
                }
            }
        },

        // copy images
        copy: {
            images: {
                expand: true,
                cwd: 'src/jquery/images/',
                src: '**',
                dest: 'dist/images/'
            },
            demo: {
                expand: true,
                cwd: 'src/demo/',
                src: '**',
                dest: 'dist/demo/'
            }
        },

        tmod: {
            template: {
                syntax: 'simple',
                src: 'src/jquery/tpls/**/*.html',
                dest: 'src/jquery/scripts/tpls/template.js',
                options: {
                    base: 'src/jquery/tpls',
                    combo: true
                } 
            }
        },


        // remove temp dir
        clean: {
            dist: ['dist']
        }
    });

    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-base64');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-tmod');

    grunt.registerTask('default', [
        'clean',        
        'mkdir',
        'tmod',
        'concat',
        'cssmin',
        'uglify',
        'copy'
    ]);
};