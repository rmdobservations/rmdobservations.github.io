
$(document).ready(function () {
	/* stop enter from working https://webcheatsheet.com/javascript/disable_enter_key.php*/
function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}
document.onkeypress = stopRKey;
	var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      
      var center = ol.proj.transform([5.18, 52.05], 'EPSG:4326','EPSG:3857');
      
       
var map = new ol.Map({
        layers: [raster],
        target: 'map',
        view: new ol.View({
          center: center,
          zoom: 14
        })
      });
      
$('#handlerfiles').on('change',function(evt){
		var file = evt.target.files[0];
    	console.log("file is: ",file)
		var href=window.location.href;
		var datapath= "./data/json/";
		console.log("Website root path name: ",href)
	
		localpath=String();
		var filename = localpath.concat(datapath,file.name);
		console.log("Complete path of filename ",filename);
 
console.log("Points to plot from file is: ",filename);

var jsonformat=new ol.format.GeoJSON();

	var checkSource = new ol.source.Vector({
      url: filename,
      projection: 'EPSG:3857',
      format: jsonformat,
  //    features: collection
    });
    console.log("checksource: ",checkSource)
      var checkvectorLayer = new ol.layer.Vector({
      source: checkSource,
      style: customStyleFunction //styleA
    });

map.addLayer(checkvectorLayer);

    var select = new ol.interaction.Select({
      layers: [checkvectorLayer]
    });
    map.addInteraction(select);
	  var selectedFeatures = select.getFeatures();
    selectedFeatures.on('add', function(event) {
    	console.log("feature selected: ",event);
      var feature = event.target.item(0);
     var name = feature.get('name');
  
     
      $('#photo-info').html(name);
    });





/*console.log("clear points on map: ",source);
	var features= layer.getSource().clear()*/
$("button#clearpoints").click(function(event){
/*	try this chapter 8 fotosgpxtest.js */

const clear = document.getElementById('clearpoints');
clear.addEventListener('click', function() {
	console.log("is source  defined here ",checkSource);
	//var selectedFeatures = checkvectorLayer.getFeatures();
	  
  //selectedFeatures.clear();
  var features= checkvectorLayer.getSource().clear()
console.log("are features defined here ",features)
});
})

		
});

   });