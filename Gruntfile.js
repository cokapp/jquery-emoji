module.exports = function(grunt) {

    var smiliesPath = 'src/jquery/images/smilies/';
    var configFileName = 'config.json';

    function buildConfig(isReplace){

        function createDefaultConfig(folder, isReplace){
            var config = {};
            config.name = folder.replace(smiliesPath, '').replace('/', '');
            config.title = config.name;
            config.smilies = [];

            grunt.file.recurse(folder, function(abspath, rootdir, subdir, filename){
                if(filename === configFileName){
                    return;
                }
                var smily = {};
                var name = filename.substr(0, filename.indexOf('.'));
                smily.name = name;
                smily.title = name;
                smily.text = name;
                smily.image = filename;
                config.smilies.push(smily);
            });
            var configFile = folder + configFileName;
            console.log('write to ' + configFile);
            grunt.file.delete(configFile);
            grunt.file.write(configFile, JSON.stringify(config));
        }


        //1.读取配置
        var smiliesConfigArray = [];

        //1.1.获取文件夹列表
        var smiliesFolder = grunt.file.expand(smiliesPath + '*/');
        //1.2.生成或读取一级配置
        for(var i in smiliesFolder){
            var folder = smiliesFolder[i];
            var configFile = folder + configFileName;
            if(isReplace || !grunt.file.exists(configFile)){
                createDefaultConfig(folder, isReplace);
            }
            smiliesConfigArray.push(grunt.file.readJSON(configFile));
        }

        //2.生成最终配置
        var smiliesConfig = {
            tabs: [],
            smilies: {},
            emojiMap: {},
            emojies: []
        };

        for(var i in smiliesConfigArray){
            var config = smiliesConfigArray[i];

            smiliesConfig.tabs.push({
                name: config.name,
                title: config.title
            });
            smiliesConfig.smilies[config.name] = [];
            for(var j in config.smilies){
                var smily = config.smilies[j];
                var newSmily = {};
                newSmily.name = smily.name;
                newSmily.title = newSmily.name;
                newSmily.text = newSmily.name;
                newSmily.image = config.name + '/' + smily.image;

                var oldSmily = smiliesConfig.emojiMap[newSmily.name];
                if(oldSmily){
                    console.warn('当前Emoji(%s)与%s重复！', newSmily.image, oldSmily.image);
                    continue;
                }
                smiliesConfig.emojiMap[newSmily.name] = newSmily;
                smiliesConfig.emojies.push(newSmily.name);
                smiliesConfig.smilies[config.name].push(newSmily);
            }


        }
        //3.写入最终配置
        var smiliesConfigFile = smiliesPath + configFileName;
        console.log('write to ' + smiliesConfigFile);
        grunt.file.delete(smiliesConfigFile);
        grunt.file.write(smiliesConfigFile, JSON.stringify(smiliesConfig));
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON(smiliesPath + configFileName),
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
        },

        //replace config
        replace: {
            js: {
                options: {
                    usePrefix: false,
                    patterns: [{
                        match: "smiliesConfig",
                        replacement: "<%= config %>"
                    }]
                },
                files: {
                    'dist/jquery.emoji.js': [
                        'dist/jquery.emoji.js'
                    ]
                }
            }
        },

        //watch changes
        watch: {
            change: {
                files: ['src/**'],
                tasks: [
                    'clean',
                    'mkdir',
                    'tmod',
                    'concat',
                    'replace',
                    'cssmin',
                    'uglify',
                    'copy'
                ]
            },
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-tmod');

    grunt.registerTask('default', [
        'clean',
        'mkdir',
        'tmod',
        'concat',
        'replace',
        'cssmin',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('build', buildConfig);

};
