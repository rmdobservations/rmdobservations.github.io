
function createMap(geojsonObject) {
	console.log("geojsonobject in createMap: ",geojsonObject)

var options =  {
dataProjection : 'EPSG:4326',
featureProjection: 'EPSG:3857'
}
	var jsonformat=new ol.format.GeoJSON(
	
	);
	var sourceVector = new ol.source.Vector({
 		features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,options)
    }); 
 /* find center of map from one of the points */
var findCenter= sourceVector.getFeatures() 
var center = findCenter[0].getGeometry().getCoordinates();

 console.log("....................can these be accessed here? ",center)
var featuresCollection = new ol.Collection();

	var layerVector = new ol.layer.Vector({
      source: sourceVector,
      name: "Feature Layer",
		//style: defaultStyle,
      style: textStyleFunction, //styleA
   	features: featuresCollection
    });
	var raster = new ol.layer.Tile({
        source: new ol.source.OSM(),
        name: "OSM"
      });

  // var center= ol.proj.transform([GD.center_lon,GD.center_lat],  'EPSG:4326', 'EPSG:3857'  );
   var map = new ol.Map({
        layers: [raster,layerVector],
        target: 'map',
        view: new ol.View({
          center: center,
          zoom: GD.map.zoom
        })
      });
      GD.map = map;
	//	console.log("add layer to map",layer)     
    //  map.addLayer(layer);

	console.log("Add layer to map: ",layerVector.get('name'))
return(map);
}