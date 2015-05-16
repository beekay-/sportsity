module.exports = function (grunt) {
    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Grunt Tasks
        // Concat
        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                src: [
                    'web/js/infobox.js',
                    'web/js/map.js',
                    'web/js/markerclusterer.js',
                    'web/js/sport-select.js',
                    'web/js/fastclick.js'
    ],
                dest: 'web/js/app.js'
            }
        },
        // Uglify
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                },
                preserveComments: false
            },
            my_target: {
                files: {
                    'web/js/app.min.js': [
                    'web/js/app.js'
     ]
                }
            }
        },
        // CSS Minify
        cssmin: {
            options: {
                shorthandCompacting: true
            },
            target: {
                files: {
                    'web/css/app.min.css': [
                    'web/css/style.css'
     ]
                }
            }
        },
        // HTML Minify
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/web/index.jsp': 'web/index.jsp'
                }
            }
        }
    });
    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Run Tasks
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'htmlmin']);
};