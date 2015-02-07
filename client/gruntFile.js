module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-recess');

  // Default task.
  //grunt.registerTask('default', ['jshint', 'build']);
   grunt.registerTask('default', ['jshint', 'build']);
  grunt.registerTask('build', [
    'clean',
    'html2js',
    'recess:build',
    'concat',
    'copy:assets',
    'copy:bootstrapfont'
  ]);

  grunt.registerTask('release', [
    'clean',
    'html2js',
    'uglify',
    'jshint',
    'concat:index',
    'recess:min',
    'copy:assets',
    'copy:bootstrapfont'
  ]);
  // grunt.registerTask('release', ['clean', 'html2js', 'uglify', 'jshint', 'karma:unit', 'concat:index', 'recess:min', 'copy:assets',
  //   'copy:api'
  // ]);
  grunt.registerTask('test-watch');

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

 

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/**/*.js'],
      jsTpl: ['<%= distdir %>/templates/**/*.js'],
      specs: ['test/**/*.spec.js'],
      scenarios: ['test/**/*.scenario.js'],
      html: ['src/index.html'],
      tpl: {
        app: ['src/app/**/*.tpl.html'],
        common: ['src/common/**/*.tpl.html']
      },
      less: [
        'vendor/bootstrap/css/bootstrap.css',
        'vendor/daterange/daterangepicker.css',
        'vendor/bootstrap-slider/css/bootstrap-slider.css',
        'vendor/bootstrap-datepicker/css/datepicker.css',
     //   'vendor/font-awesome/less/font-awesome.less',
        'src/less/*.less'
      ],
      lessWatch: ['src/less/**/*.less']
    },
    clean: {
      options: {
        force: true
      },
      stuff: '<%= distdir %>/*'
    },
    copy: {
      assets: {
        files: [{
          dest: '<%= distdir %>',
          src: '**',
          expand: true,
          cwd: 'src/assets/'
        }]
      },
      bootstrapfont: {
        files: [{
          dest: '<%= distdir %>/fonts/',
          src: '**',
          expand: true,
          cwd: 'vendor/bootstrap/fonts/'
        }]
      }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app'
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distdir %>/templates/common.js',
        module: 'templates.common'
      }
    },
    concat: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>', '<%= src.jsTpl %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      // ace: {
      //   src: [
      //     '<%= distdir %>/<%= pkg.name %>.css',
      //     'vendor/ace/css/ace-fonts.css',
      //     'vendor/ace/css/ace.css',
      //     'src/less/smartgy-intern.css'
      //   ],
      //   dest: '<%= distdir %>/<%= pkg.name %>.css',
      //   options: {
      //     process: true
      //   }
      // },
      libs: {
        src: [
          'vendor/jquery/*.js',
          'vendor/angular/angular.js',
          'vendor/angular/angular-touch.js',
          'vendor/angular/angular-route.js',
          'vendor/angular/angular-resource.js',
          'vendor/angular/angular-cookies.js',
          'vendor/angular-ui/bootstrap/ui-bootstrap-tpls-*.js',
          'vendor/angular/angular-translate/angular-translate.js',
          'vendor/angular/angular-translate/angular-translate-*.js',
          'vendor/angular/angular-websocket.js',
          'vendor/angular/angular-translate/*.js',
          'vendor/underscore/*.js',
          'vendor/bootstrap/js/bootstrap.min.js',
          'vendor/ng-grid/*.js',
          'vendor/ng-grid/plugins/*.js',
          'vendor/console/*.js',
          'vendor/highcharts/highcharts-all.js', 
          'vendor/moment/moment.js', 
          'vendor/daterange/daterangepicker.js',
          'vendor/bootstrap-slider/js/bootstrap-slider.js',
          'vendor/bootstrap-datepicker/js/bootstrap-datepicker.js'
        ],
        dest: '<%= distdir %>/libs.js'
      }
    },
    uglify: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>', '<%= src.jsTpl %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      libs: {
        src: ['<%= concat.libs.src %>'],
        dest: '<%= distdir %>/libs.js'
      }
    },
    recess: {
      build: {
        files: {
          // '<%= distdir %>/<%= pkg.name %>-extern.css': ['<%= src.lessExtern %>'],
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
        },
        options: {
          compile: true
        }
      },
      min: {
        files: {
          // '<%= distdir %>/<%= pkg.name %>-extern.css': ['<%= src.lessExtern %>'],
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
        },
        options: {
          compress: true
        }
      }
    },
    watch: {
      all: {
        files: [
          '<%= src.js %>',
          '<%= src.specs %>',
          '<%= src.lessWatch %>',
          '<%= src.tpl.app %>',
          '<%= src.tpl.common %>',
          '<%= src.html %>'
        ],
        tasks: ['default', 'timestamp']
      },
      build: {
        files: [
          '<%= src.js %>',
          '<%= src.specs %>',
          '<%= src.lessWatch %>',
          '<%= src.tpl.app %>',
          '<%= src.tpl.common %>',
          '<%= src.html %>'
        ],
        tasks: ['build', 'timestamp']
      }
    },
    jshint: {
      files: [
        'gruntFile.js',
        '<%= src.js %>',
        '<%= src.jsTpl %>',
        '<%= src.specs %>',
        '<%= src.scenarios %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {},
        smarttabs: true
      }
    }
  });

};