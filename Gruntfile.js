var distMin        = 'dist/min';
var mxgraph        = 'mxgraph/javascript/examples/grapheditor/www';
var distMinMxgraph = distMin + '/' + mxgraph; 

module.exports = function(grunt) {
    grunt.initConfig({
        "pkg"     : grunt.file.readJSON('package.json'),
        "uglify"  : {
            "options" : {
                "banner" : "/* <%= grunt.template.today('yyyy-mm-dd') %> */"
            },
            "build"   : {
                "src"  : ['board/InitForKeepwork.js',

                          mxgraph + '/js/EditorUi.js',
                          mxgraph + '/js/Editor.js',
                          mxgraph + '/js/Sidebar.js',
                          mxgraph + '/js/Graph.js',
                          mxgraph + '/js/Shapes.js',
                          mxgraph + '/js/Actions.js',
                          mxgraph + '/js/Menus.js',
                          mxgraph + '/js/Format.js',
                          mxgraph + '/js/Toolbar.js',
                          mxgraph + '/js/Dialogs.js',

                          'board/Board.js',
                          'board/EditorUi.js',
                          'board/Editor.js',
                          'board/Graph.js',
                          'board/Actions.js',
                          'board/Menus.js',
                          'board/Format.js',
                          'board/Dialog.js',

                          'library/deflate/base64.js',
                          'library/deflate/pako.js',
                          'library/jscolor/jscolor.js',
                          'library/spin/spin.js',
                        ],
                "expand" : true,
                "dest"   : distMin,
            }
        },
        "concat"  : {
        	"options" : {
        		"separator" : ";"
        	},
        	"dist"    : {
        		"src"  : [
                          distMin + '/board/InitForKeepwork.js',
                          'mxgraph/javascript/mxClient.min.js',
                          
                          distMin + '/library/jscolor/jscolor.js',
                          distMin + '/library/deflate/base64.js',
                          distMin + '/library/deflate/pako.js',
                          distMin + '/library/spin/spin.js',
                          'library/sanitizer/sanitizer.min.js',

        				  distMinMxgraph + '/js/EditorUi.js',
                          distMinMxgraph + '/js/Editor.js',
                          distMinMxgraph + '/js/Sidebar.js',
                          distMinMxgraph + '/js/Graph.js',
                          distMinMxgraph + '/js/Shapes.js',
                          distMinMxgraph + '/js/Actions.js',
                          distMinMxgraph + '/js/Menus.js',
                          distMinMxgraph + '/js/Format.js',
                          distMinMxgraph + '/js/Toolbar.js',
                          distMinMxgraph + '/js/Dialogs.js',

                          distMin + '/board/Board.js',
                          distMin + '/board/Graph.js',
                          distMin + '/board/Dialog.js',
                          distMin + '/board/Actions.js',
                          distMin + '/board/Editor.js',
                          distMin + '/board/EditorUi.js',
                          distMin + '/board/Format.js',
                          distMin + '/board/Menus.js',
        				],
        		"dest" : "dist/<%= pkg.name %>.min.js",
        	}
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['uglify', 'concat']);
}