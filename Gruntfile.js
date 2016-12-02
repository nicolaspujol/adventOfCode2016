"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        tslint: {
            options: {
                force: false
            },
            files: {
                src: [
                    "app/**/*.ts"
                ]
            }
        },
    });
    grunt.registerTask("sca", "Run TS linter", [
        "tslint"
    ]);
};