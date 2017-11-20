var dist    = 'dist/min';
var mxgrpah = 'mxgraph/javascript/examples/grapheditor/www';
var output  = [
    dist + 'board/InitForKeepwork.js',

    dist + '/js/EditorUi.js',
    dist + '/js/Editor.js',
    dist + '/js/Sidebar.js',
    dist + '/js/Graph.js',
    dist + '/js/Shapes.js',
    dist + '/js/Actions.js',
    dist + '/js/Menus.js',
    dist + '/js/Format.js',
    dist + '/js/Toolbar.js',
    dist + '/js/Dialogs.js',

    dist + '/board/Boards.js',
    dist + '/board/EditorUi.js',
    dist + '/board/Editor.js',
    dist + '/board/Graph.js',
    dist + '/board/Actions.js',
    dist + '/board/Menus.js',
    dist + '/board/Format.js',
    dist + '/board/Dialog.js',

    dist + '/library/deflate/base64.js',
    dist + '/library/deflate/pako.js',
    dist + '/library/deflate/jscolor/jscolor.js'
];

module.exports = function(grunt) {
    grunt.initConfig({
        "pkg"     : grunt.file.readJSON('package.json'),
        "uglify"  : {
            "options" : {
                "banner" : "/* <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */"
            },
            "build"   : {
                "src"  : ['board/InitForKeepwork.js',

                          mxgrpah + '/js/EditorUi.js',
                          mxgrpah + '/js/Editor.js',
                          mxgrpah + '/js/Sidebar.js',
                          mxgrpah + '/js/Graph.js',
                          mxgrpah + '/js/Shapes.js',
                          mxgrpah + '/js/Actions.js',
                          mxgrpah + '/js/Menus.js',
                          mxgrpah + '/js/Format.js',
                          mxgrpah + '/js/Toolbar.js',
                          mxgrpah + '/js/Dialogs.js',

                          'board/Boards.js',
                          'board/EditorUi.js',
                          'board/Editor.js',
                          'board/Graph.js',
                          'board/Actions.js',
                          'board/Menus.js',
                          'board/Format.js',
                          'board/Dialog.js',

                          'library/deflate/base64.js',
                          'library/deflate/pako.js',
                          'library/deflate/jscolor/jscolor.js',
                        ],
                "expand" : true,
                "dest"   : output,
            }
        },
        // "concat"  : {
        // 	"options" : {
        // 		"separator" : ";"
        // 	},
        // 	"dist"    : {
        // 		"src"  : ['library/deflate/base64.js',
        // 				  'deflate/pako.min.js',
        // 				  'jscolor/jscolor.js',
        // 				  'js/Init.js',
        // 				  'jscolor/jscolor.js',
        // 				  'sanitizer/sanitizer.min.js',
                         
        // 				],
        // 		"dest" : "dist/<%= pkg.name %>.js",
        // 	}
        // },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['uglify']);
}