'use strict';

var qs = require('querystring');
var phantom = require('phantom');
var renderUrl = 'https://app.t-fk.no/skoleskyss/render.html';
var mapUrl = 'https://www.google.com/maps/embed/v1/directions';
var query = {
  key: 'AIzaSyAu4oe2bKCeP4AnAyo78KL_XZvrS-WVIcw',
  mode: 'walking',
  origin: 'Kjærlighetsstien 24, 3681 Notodden, Norway',
  destination: 'Notodden videregående skole, Heddalsveien 4, 3674 Notodden, Norway'
};
var completeUrl = renderUrl + '?url=' + mapUrl + '?' + qs.stringify(query);

phantom.create(function(ph) {
  return ph.createPage(function(page) {

    page.set('viewportSize', {
      width: '1422',
      height: '750'
    });

    page.open(completeUrl, function() {
      setTimeout(function(){
        page.render('map.pdf');
        ph.exit();
      }, 10000)
    });

  });
});
