module.exports = function(grunt) {

    var smiliesPath = 'src/jquery/images/smilies/';
    var configFileName = 'config.json';

    function buildConfig(isReplace) {

        function createDefaultConfig(folder, isReplace) {
            var config = {};
            config.name = folder.replace(smiliesPath, '').replace('/', '');
            config.title = config.name;
            config.smilies = [];

            grunt.file.recurse(folder, function(abspath, rootdir, subdir, filename) {
                if (filename === configFileName) {
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
        for (var i in smiliesFolder) {
            var folder = smiliesFolder[i];
            var configFile = folder + configFileName;
            if (isReplace || !grunt.file.exists(configFile)) {
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

        for (var i in smiliesConfigArray) {
            var config = smiliesConfigArray[i];

            smiliesConfig.tabs.push({
                name: config.name,
                title: config.title
            });
            smiliesConfig.smilies[config.name] = [];
            for (var j in config.smilies) {
                var smily = config.smilies[j];
                var newSmily = {};
                newSmily.name = smily.name;
                newSmily.title = newSmily.name;
                newSmily.text = newSmily.name;
                newSmily.image = config.name + '/' + smily.image;

                var oldSmily = smiliesConfig.emojiMap[newSmily.name];
                if (oldSmily) {
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

    var spriteConfig4Spritesmith = {
        'all': {
            // Sprite files to read in
            'src': ['src/emoji/images/face/*', 'src/emoji/images/tsj/*', 'src/emoji/images/emoji/*'],

            // Location to output spritesheet
            'destImg': 'src/emoji/sprite.png',

            // Stylus with variables under sprite names
            'destCSS': 'src/emoji/sprite.css',

            // OPTIONAL: Manual override for imgPath specified in CSS
            'imgPath': 'sprite.png',

            // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
            // alt-diagonal [/ format], binary-tree [best packing])
            // Visual representations can be found below
            'algorithm': 'binary-tree',

            // OPTIONAL: Specify padding between images
            'padding': 0,

            // OPTIONAL: Specify engine (auto, phantomjs, canvas, gm, pngsmith)
            'engine': 'phantomjs',

            // OPTIONAL: Specify CSS format (inferred from destCSS' extension by default)
            // (stylus, scss, scss_maps, sass, less, json, json_array, css)
            'cssFormat': 'css',

            // OPTIONAL: Specify a function or Mustache template to use for rendering destCSS
            // Mutually exclusive to cssFormat
            // More information can be found below
            //'cssTemplate': 'src/emoji/sprite_positions.styl.mustache',

            // OPTIONAL: Map variable of each sprite
            'cssVarMap': function(sprite) {
                // `sprite` has `name`, `image` (full path), `x`, `y`
                //   `width`, `height`, `total_width`, `total_height`
                // EXAMPLE: Prefix all sprite names with 'sprite-'
                sprite.name = 'sprite-' + sprite.name;
            },

            // OPTIONAL: Specify settings for algorithm
            'algorithmOpts': {
                // Skip sorting of images for algorithm (useful for sprite animations)
                'sort': false
            },

            // OPTIONAL: Specify settings for engine
            'engineOpts': {
                'imagemagick': true
            },

            // OPTIONAL: Specify img options
            'imgOpts': {
                // Format of the image (inferred from destImg' extension by default) (jpg, png)
                'format': 'png',

                // gm only: Quality of image
                'quality': 90,

                // phantomjs only: Milliseconds to wait before terminating PhantomJS script
                'timeout': 10000
            },

            // OPTIONAL: Specify css options
            'cssOpts': {
                // Some templates allow for skipping of function declarations
                'functions': false,

                // CSS template allows for overriding of CSS selectors
                'cssClass': function(item) {
                    return '.sprite-' + item.name;
                }
            }
        }
    };

    var spriteConfig = {
        options: {
            // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
            imagepath: 'src/emoji/images/',
            // 映射CSS中背景路径，支持函数和数组，默认为 null
            imagepath_map: null,
            // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
            spritedest: 'src/emoji/build/',
            // 替换后的背景路径，默认 ../images/
            spritepath: '',
            // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
            padding: 0,
            // 是否使用 image-set 作为2x图片实现，默认不使用
            useimageset: false,
            // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
            newsprite: false,
            // 给雪碧图追加时间戳，默认不追加
            spritestamp: false,
            // 在CSS文件末尾追加时间戳，默认不追加
            cssstamp: false,
            // 默认使用二叉树最优排列算法
            algorithm: 'binary-tree',
            // 默认使用`pngsmith`图像处理引擎
            engine: 'phantomjs'
        },
        autoSprite: {
            files: [{
                // 启用动态扩展
                expand: true,
                // css文件源的文件夹
                cwd: 'src/emoji/styles/',
                // 匹配规则
                src: '*.css',
                // 导出css和sprite的路径地址
                dest: 'src/emoji/build/',
                // 导出的css名
                ext: '.sprite.css'
            }]
        }
    };


    grunt.config('sprite', spriteConfig);

    //grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-css-sprite');

    grunt.registerTask('build', function() {
        grunt.task.run('sprite');
        buildConfig();
    });

    return grunt;

};