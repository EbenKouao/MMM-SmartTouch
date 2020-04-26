/* Magic Mirror
 * Node Helper: MMM-SmartTouch
 *
 * By SmartBuilds.io - Pratik and Eben
 * https://smartbuilds.io
 * MIT Licensed.
 */


var util = require("util");

var NodeHelper = require("node_helper")
const exec = require("child_process").exec;


module.exports = NodeHelper.create({
  
  start: function() {
        this.started = false;
        this.config = {};
    },

    socketNotificationReceived: function(notification, payload) {
      var self = this;
          if (notification === 'CONFIG') {
              if (!this.started) {
                  this.config = payload;
                  this.started = true;
                  console.log("Smart Touch module has started")
                  this.sendSocketNotification("SHUTIT", payload);
              }
              
          }
          if (notification === "SHUTDOWN") {
              console.log("Shutting Down!")
              require('child_process').exec('shutdown -h now', console.log)
          }

          if (notification === "RESTART") {
              console.log("Restarting Magic Mirror!")
              require('child_process').exec('sudo reboot', console.log)
          }
    },

    checkForExecError: function(error, stdout, stderr) {
        if (stderr) {
            console.log('stderr: "' + stderr + '"');
            return 1;
        }
        if (error !== null) {
            console.log('exec error: ' + error);
            return 1;
        }
        return 0;
    },


})