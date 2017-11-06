module.exports = function(grunt) {
	grunt.initConfig({
		"pkg"     : grunt.file.readJSON('package.json'),
		"concat"  : {
			"options" : {
				"separator" : ";"
			},
			"dist"    : {
				"src"  : ['deflate/base64.js',
						  'deflate/pako.min.js',
						  'jscolor/jscolor.js',
						  'js/Init.js',
						  'jscolor/jscolor.js',
						  'sanitizer/sanitizer.min.js',
						  'js/mxClient.js' ,
						  'js/EditorUI.js',
						  'js/Editor.js',
						  'js/Sidebar.js',
						  'js/Graph.js',
						  'js/Shapes.js',
						  'js/Actions.js',
						  'js/Menus.js',
						  'js/Format.js',
						  'js/Toolbar.js',
						  'js/Dialogs.js'],
				"dest" : "dist/<%= pkg.name %>.js",
			}
		},
		"uglify" : {
			"options" : {
				"banner" : "/* <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */"
			},
			"build"   : {
				"src"  : "dist/<%= pkg.name %>.js",
				"dest" : "dist/<%= pkg.name %>.min.js"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'uglify']);
}