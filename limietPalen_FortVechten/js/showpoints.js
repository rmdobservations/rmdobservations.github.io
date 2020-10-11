/*
Filename: editpoints.js
Purpose: Handle input and output from editpoints.html
Setup: Most important object containing data that is common and needed throughout
	the code.




*/
/* This maybe should be in a file*/
/* css stuff is here because it is used in more than one place and 
	I want to guarantee that the names 
	always consistent (i.e. in the jquery.cycle code)
	*/
	const GD = {
	map: null,
	projectprefix: "pal",
	datapath: "./data/json/",
	versionIndex: 0,
	dom_element: ".dom_element",
	slide_element:  ".slide_element",
	slide_element_class: "slide_element",
	mapzoom: 14


	}


function createSlideshow(GD) {
	console.log("in create slide show ",GD.map);
	 var nodelist = document.querySelectorAll(GD.dom_element);
	
		var domnode= nodelist[0];
		var count = domnode.childElementCount;
		console.log("How many slides at this point: ",count)
		if(count > 0) {
		for(var slide = 0; slide < count; slide++) {
	  	  		$(GD.dom_element).cycle('remove', slide);
			}

$(GD.dom_element).cycle('destroy');
	$(GD.dom_element).empty()
		} else {
			console.log("No cycle has yet been created: ",count);
		}	
	
	var map = GD.map;
//	var inputpath = GD.inputpath
	var layers = map.getLayers();
	var length = layers.getLength();
	console.log("number of layers: ",length)
	for (var i = 0; i < length; i++) {
		console.log("layerfunctions loop: ",i,layers.item(i).get('name'));
	} 
	var itemArr = [];
	var textArr=[];
	var myformArr=[];
	var layerVector= layers.item(1);
	console.log("check layer: ",layers.item(1).get('name'))
	
	let sourceVector = layerVector.getSource();
//	console.log("prefix: ",prefix)
		let thumbdir=GD.projectprefix.concat("thumb/");

	let imagepath = GD.datapath + thumbdir;
		console.log("imagepath for images: ",imagepath)
		var index,itemArr,textArr;
	sourceVector.forEachFeature(function(feature) {
		index=feature.getId();
		itemArr[index]=imagepath+feature.get('name');
		console.log("Image is: ",itemArr[index]);
		textArr[index]=feature.get("name");
	});
		itemArr.reverse();
		textArr.reverse();

		let dom_element = GD.dom_element;
		let slide_element = GD.slide_element;
		let slide_element_class = GD.slide_element_class;	
		var i,imgCont,slide; // variables in for loop
		for(i= 0;i< itemArr.length;++i){
			imgCont = '<div class="slide_element" >';
			imgCont+='<div class="foto-pane">';
			imgCont+='<div class="photo">';
			imgCont+= '<img src=' + itemArr[i] + '/>';
			imgCont+='</div>';
			imgCont+='<div class="journal-text">';
			imgCont+=textArr[i];
		//	slide = 'id="slide'+i.toString()+ '"';
			imgCont+='</div></div></div>';
			$(imgCont).prependTo(dom_element);
		 }; 
		 

	$(dom_element).cycle({
		autoHeight: false, // height management disabled
		allowWrap: true,
		prev: "#prev",
		next: "#next" ,
		timeout: 0,
		slides: "> " + slide_element,
		caption: "#custom-caption",
  		captionTemplate: "{{slideNum}}: {{slideCount}}",
		log: false
	});
	


return true
	}	 
	
	
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
      name: "Edit Feature Layer",
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
          zoom: GD.mapzoom
        })
      });
	//	console.log("add layer to map",layer)     
    //  map.addLayer(layer);

	console.log("Add layer to map: ",layerVector.get('name'))
return(map);
}

function setupInteractive(GD) {
	var map =  GD.map;
	var layer =map.getLayers();
	var layerVector= layer.item(1);
	console.log("layer vector: ",layerVector)
	var select = new ol.interaction.Select(
       {
       style: selectStyleFunction,
        layer: layerVector
        });
 	var modify = new ol.interaction.Modify(
 		{
 			style: selectStyleFunction,
			features: select.getFeatures() 
		});
		
	map.getInteractions().extend([select,modify]);

	var selected_features = select.getFeatures();	
	selected_features.on('add', function(event) {
		var feature = event.element;
		console.log("selected feature: ",feature.get("name"));
		var slideid=parseInt(feature.getId());
		let dom_element =  GD.dom_element;
		console.log("Slide element: ",slideid)
		$(dom_element).cycle('goto',slideid);
	});
	return(true)
}




$.fn.mapfunction = function(GD){

//	var center_route= ol.proj.transform([GD.center_lon,GD.center_lat],  'EPSG:4326', 'EPSG:3857'  );
 



	var rmdgetData = async function() {
    try {
    	var filename = "./data/json/pal_1.json";
    	
		// significant breakthrough here. geojson is unpacked here.
		// Because it takes time to read, features are not always available
		// Until the promise is kept.	
		return await $.getJSON(filename)
		.done(function(data){
				console.log("in success: ",data)
				})
		.fail(function(data){console.log("In failure: File not found",data)})
		.promise();
    }
    catch (error) {

    	alert("This applcation works only on the desktop")
       console.log("In handler files event..catch error..." + error);

    }
    finally {
        console.log('Finished loading file');
   	 }
	}	
	
	rmdgetData().then(jsondataObj => {
	
	$.when(createMap(jsondataObj)).done(function(map)
		{
			GD.map = map;
			$.when(createSlideshow(GD)).done(function(result)
			{
				// need to associate slide numbers with map selections 
				console.group("After slide show: ",result)
				
			$.when(setupInteractive(GD)).done(function(result)
			{
				console.log("This has no purpose: ",result)	;	
			/*	var selectedFeatures = result.getFeatures();
console.log("What is this:",selectedFeatures)	;	*/

		})

		}) 
 		})
})



} // main program
//})(); 


//function changeSomething(slideindex){
var changeSomething = function(slideindex){
var slide="input#slide"+slideindex.toString();

var value = $(slide).val();
//console.log("in loop index: ",index)
 console.log("event: ",slideindex," and value: ",value);
//});
//myfoto.setDescription = value;
console.groupEnd();
}

	$(document).ready(function() {
		//$.ajax({
		
		
console.log("GDobject: ",GD)
	$('#map').mapfunction(GD);
	});
