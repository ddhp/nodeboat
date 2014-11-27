// // Create a new FULLTILT Promise for e.g. *compass*-based deviceorientation data
// var promise = new FULLTILT.getDeviceOrientation({ 'type': 'world' });
//
// // FULLTILT.DeviceOrientation instance placeholder
// var deviceOrientation;
//
// promise
//   .then(function(controller) {
//     // Store the returned FULLTILT.DeviceOrientation object
//     deviceOrientation = controller;
//     debugger
//   })
//   .catch(function(message) {
//     console.error(message);
//
//     // Optionally set up fallback controls...
//     // initManualControls();
//   });
//
// (function draw() {
//
//   // If we have a valid FULLTILT.DeviceOrientation object then use it
//   if (deviceOrientation) {
//
//     // Obtain the *screen-adjusted* normalized device rotation
//     // as Quaternion, Rotation Matrix and Euler Angles objects
//     // from our FULLTILT.DeviceOrientation object
//     var quaternion = deviceOrientation.getScreenAdjustedQuaternion();
//     var matrix = deviceOrientation.getScreenAdjustedMatrix();
//     var euler = deviceOrientation.getScreenAdjustedEuler();
//
//     // Do something with our quaternion, matrix, euler objects...
//     console.debug(quaternion);
//     console.debug(matrix);
//     console.debug(euler);
//
//   }
//
//   // Execute function on each browser animation frame
//   requestAnimationFrame(draw);
//
// })();
var count = 0;
window.addEventListener('deviceorientation', function( event ) {
  count ++;
  if (count > 20) {
    document.querySelector('body').innerHTML = '';
    count = 0;
  }
  deviceOrientationData = event;
  var node = document.createElement("P");                 // Create a <li> node
  var text = '';
  for (i in event) {
    if (i === 'alpha' || i === 'beta' || i === 'gamma') {
      text += (i + ': ' + event[i] + '\n');
    }
  }
  console.log(text);

  var textnode = document.createTextNode(text);         // Create a text node
  node.appendChild(textnode);                              // Append the text to <li>
  document.querySelector("body").appendChild(node);

  var socket = io();
  socket.emit('status', {gamma: event.gamma});
}, false);

