/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var debug = false;
var initialized = false;
var phonenumberInput;
var sendSMSButton, callButton;

function enable() {
  if ( phonenumberInput.value && phonenumberInput.validity.valid) {
    sendSMSButton.removeAttribute('disabled');
    callButton.removeAttribute('disabled');
  } else {
    sendSMSButton.setAttribute('disabled', 'disabled');
    callButton.setAttribute('disabled', 'disabled');
  }
}

window.onload = function() {
  debug && console.log('Privileged app working');
  if (initialized) {
    return;
  }

  phonenumberInput = document.getElementById('phonenumber-input');
  sendSMSButton = document.getElementById('send-sms');
  callButton = document.getElementById('make-call');

  sendSMSButton.addEventListener('click', function() {
    alert('sendSMS');
    if (!navigator.mozMobileMessage) {
      console.error('mozMobileMessage permission is not working.');
      return;
    }
    

    var requests = navigator.mozMobileMessage.send(
      [phonenumberInput.value],
      "Hola Milán!"
    );
    
    requests.forEach(function(request, idx) {
      request.onsuccess = function() {
        alert('SMS Sent');
      };
      request.onerror = function() {
        alert('Error while sending the SMS');
      };
    });
  });

  callButton.addEventListener('click', function() {
    if (!navigator.mozTelephony) {
      console.error('mozTelephony permission is not working.');
      return;
    }
    
    navigator.mozTelephony.dial(phonenumberInput.value)
  });

  initialized = true;
};
