module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
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

        concat: {
            copy: {
                files: [{
                    src: "src/slacker-window.js",
                    dest: "dist/slacker-window.js"
                }, {
                    src: "src/slacker-worker-core.js",
                    dest: "dist/slacker-worker-core.js"
                }, {
                    src: "src/slacker-worker-*.js",
                    dest: "dist/slacker-worker-all.js"
                }]
            }
        },

        uglify: {
            target: {
                files: [{
                    src: 'dist/slacker-worker-all.js',
                    dest: 'dist/slacker-worker-all.min.js'
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
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('travis', ['default', 'connect', 'mocha_phantomjs']);

};
