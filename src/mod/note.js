require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('./event.js');

function Note(opts) {
  this.initOpts(opts);
  this.createNote();
  this.setStyle();
  this.bindEvent();
}

Note.prototype = {
  colors: [
    ['#ea9b35','#efb04e'], // headColor, containerColor
    ['#dd598b','#e672a2'],
    ['#eee34b','#f2eb67'],
    ['#c24226','#d15a39'],
    ['#c1c341','#d0d25c'],
    ['#3f78c3','#5591d2']
  ],

  defaultOpts: {
    id: '',
    $ct: $('#content').length > 0 ? $('#content') : $('body'),
    context: 'input here'
  },

  initOpts: function(opts) {
    this.opts = $.extend({}, this.defaultOpts, opts || {});
    if (this.opts.id) {
      this.id = this.opts.id;
    }
  },

  createNote: function() {
    var tpl =  `<div class="note">
      <div class="note-head"><span class="username"></span><span class="delete">&times;</span></div>
      '<div class="note-ct" contenteditable="true"></div></div>
    `;
    this.$note = $(tpl);
    this.$note.find('.note-ct').text(this.opts.context);
    this.$note.find('.username').text(this.opts.username);
    this.opts.$ct.append(this.$note);
    if (!this.id) this.$note.css('bottom', '10px');
  },

  setStyle: function() {
    var color = this.colors[Math.floor(Math.random() * 6)];
    this.$note.find('.note-head').css('background-color', color[0]);
    this.$note.find('.note-ct').css('background-color', color[1]);
  },

  setLayout: function() {
    var self = this;
    if (self.clk) {
      clearTimeout(self.clk);
    }
    self.clk = setTimeout(function() {
      Event.fire('waterfall');
    }, 100);
  }



}