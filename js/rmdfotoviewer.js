/*
Based on ISBN 978-1-78216-236-0
OpenLayers 3 Beginner's GuideCopyright © 2015 Packt Publishing
*/


var flickrSource; // needs to be global?

function successHandler(data) {
//console.log("in successhandler",data)
	console.log("in successhandler number of features: ",data.items.length)
	if(data.items.length == 0) alert("Sorry, no fotos found with that tag name");
	var transform = ol.proj.getTransform('EPSG:4326', 'EPSG:3857');
	data.items.forEach(function(item) {
	var feature = new ol.Feature(item);
		feature.set('url', item.media.m);
		var coordinate = transform([parseFloat(item.longitude),
		parseFloat(item.latitude)]);
		var geometry = new ol.geom.Point(coordinate);
		feature.setGeometry(geometry);
		flickrSource.addFeature(feature);
	});
}
var cache = {};

function photoStyle(feature, scale) {
      var url = feature.get('url');
      var key = scale + url;
      if (!cache[key]) {
        cache[key] = new ol.style.Style({
          image: new ol.style.Icon({
            scale: scale,
            src: url
          })
        });
      }
      return cache[key];
    }

function flickrStyle(feature) {
      return [photoStyle(feature, 0.10)];
}

function selectedStyle(feature) {
      return [photoStyle(feature, 0.50)];
      }

$(document).ready(function () {
console.log("in script")

flickrSource = new ol.source.Vector();

var layer = new ol.layer.Tile({
source: new ol.source.OSM()
});
	
var flickrLayer = new ol.layer.Vector({
source: flickrSource,
style: flickrStyle
});

var center = ol.proj.transform([5,52], 'EPSG:4326', 'EPSG:3857');
var view = new ol.View({
	center: center,
	zoom: 7
	});
var map = new ol.Map({
	target: 'map',
	layers: [layer,flickrLayer],
	view: view
	});


///		function
function loadFlickrFeed(tags) {
	selectedFeatures.clear();
	flickrSource.clear();
	$('#photo-info').empty();
	$.ajax({
	url: 'https://api.flickr.com/services/feeds/geo',
		data: {
		format: 'json',
		tags: tags
		},
	dataType: 'jsonp',
	jsonpCallback: 'jsonFlickrFeed',
	success: successHandler
});
}
$(document).on('click', '#search button', function() {
	var value = $('#search input').val();
	var tags = value.split(' ').join(',');
	loadFlickrFeed(tags);
});

//// prepare html for DOM
function photoContent(feature) {
	var content = $('#photo-template').html();
	var keys = ['latitude','longitude','link',
					'url','tags','title'];
	for (var i=0; i<keys.length; i++) {
		var key = keys[i];
		var value = feature.get(key);
		content = content.replace('{'+key+'}',value);
	}
return content;
}


////

var select = new ol.interaction.Select({
	layers: [flickrLayer],
   style: selectedStyle
});
map.addInteraction(select);
/* reference object to selected features. It is a collection though not described as such */
var selectedFeatures = select.getFeatures();
selectedFeatures.on('add', function(event) {
/*	console.log("what causes this?",event.type);*/
	var feature = event.target.item(0);
/*	var url = feature.get('url');
	console.log("this should appear in the DOM: ",url);
	$('#photo-info').html(url);*/
	///
	var content = photoContent(feature);
$('#photo-info').append(content);
///
});

selectedFeatures.on('remove', function(event) {
	console.log("remove event empty div area: ",event)
$('#photo-info').empty();
});

/*console.log("what is this: ",typeof selectedFeatures)
console.log(selectedFeatures)	
$.each(selectedFeatures, function(key,val) {
  		console.log("key: ",key," value: ",val)
})
var collection =  new ol.Collection()
console.log("what does this collection look like: ",collection)
	*/
})