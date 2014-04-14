module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.initConfig({

        jshint: {
            files: "src/*.js"
        },

        connect: {
            site0: {
                options: {
                    port: 9000,
                    base: './',
                    keepalive: grunt.option("keepalive") || false
                }
            }
        },

        // Copy over src files to a temporary folder
        copy: {
            temp: {
                expand: true,
                flatten: true,
                src: ['src/*'],
                dest: '.tmp/'
            }
        },

        concat: {
            copy: {
                files: [{
                    src: "src/slacker-window.js",
                    dest: "dist/slacker-window.js"
                }, {
                    src: "src/slacker-worker-core.js",
                    dest: "dist/slacker-worker-core.js"
                }, {
                    src: ["app/bower_components/deflate/rawdeflate.js", "app/bower_components/deflate/rawinflate.js", ".tmp/slacker-worker-compress.js"],
                    dest: ".tmp/slacker-worker-compress.js"
                }, {
                    src: [".tmp/slacker-worker-*.js", "!.tmp/slacker-worker-core.js"],
                    dest: "dist/slacker-worker.js"
                }, {
                    src: [".tmp/slacker-worker-core.js", "dist/slacker-worker.js"],
                    dest: "dist/slacker-worker.js"
                }],
            master: [{
                    src: "src/slacker-worker-*.js",
                    dest: "dist/slacker-worker.js"
                }]
            }
        },

        uglify: {
            target: {
                files: [{
                    src: 'dist/slacker-worker.js',
                    dest: 'dist/slacker-worker.min.js'
                }, {
                    src: 'dist/slacker-window.js',
                    dest: 'dist/slacker-window.min.js'
                }, {
                    src: 'dist/slacker-worker-core.js',
                    dest: 'dist/slacker-worker-core.min.js'
                }]
            }
        },

        watch: {
            build: {
                files: ["src/**/*.js"],
                tasks: ['default']
            }
        },

        mocha_phantomjs: {
            all: {
                options: {
                    urls: [
                        'http://localhost:9000/test/test.html'
                    ]
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'copy', 'concat', 'uglify'])
    grunt.registerTask('travis', ['connect', 'default', 'mocha_phantomjs']);

};
