(function() {
  'use strict';

  var colours = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d'
  ];

  this.avatar = (function() {
    return Object.freeze({
      draw: draw,
      version: '0.0.1'
    });
  })();

  /////////
  function draw(canvas, circle) {
    //console.log(name);
    //var canvases = $('#user-icon'); //document.getElementById(elementId); //('user-icon');
    //var canvas = canvases[0];
    //console.log(canvases, canvas);
    //if (!canvas.getContext) return;
    //console.log(name);
    var name = canvas.innerHTML;
    var nameSplit = name.split(/[ ,.]+/),
      initials = nameSplit[0].charAt(0).toUpperCase();

    if (nameSplit.length > 1) {
      initials += nameSplit[1].charAt(0).toUpperCase();
    } else {
      initials += nameSplit[0].charAt(1).toUpperCase();
    }

    var charIndex = initials.charCodeAt(0) - 65,
      colourIndex = charIndex % 19;

    //var canvas = document.getElementById(elementId); //('user-icon');
    var context = canvas.getContext('2d');

    var canvasWidth = $(canvas).attr('width'),
      canvasHeight = $(canvas).attr('height'),
      canvasCssWidth = canvasWidth,
      canvasCssHeight = canvasHeight;

    if (window.devicePixelRatio) {
      $(canvas).attr('width', canvasWidth * window.devicePixelRatio);
      $(canvas).attr('height', canvasHeight * window.devicePixelRatio);
      $(canvas).css('width', canvasCssWidth);
      $(canvas).css('height', canvasCssHeight);
      if (circle) $(canvas).css('border-radius', '100%');
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    var fontArgs = context.font.split(' ');
    var newSize = canvasWidth / 2 + 'px';
    context.fillStyle = colours[colourIndex];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = newSize + ' ' + fontArgs[fontArgs.length - 1]; //canvasWidth / 2 + 'px'; // Arial';
    context.textAlign = 'center';
    context.fillStyle = '#FFF';
    context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.5);
    //}
  }
}.call(this));
