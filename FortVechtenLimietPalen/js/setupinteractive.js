
function setupInteractive() {
	
	var map = GD.map
	var layers = map.getLayers();
	layers.forEach(function(layer,index){
			var layername = layer.get("name")
			if (layername == "Feature Layer") {
				selectLayer = layer;
			}	
		})

	var select = new ol.interaction.Select(
       {
      	 layer: selectLayer,
      	 style: selectStyleFunction

        });

	map.getInteractions().extend([select]);
	var selected_features = select.getFeatures();	
	console.group("Selected features tests:")
	
// when feature on map is clicked, associated slide should appear
	//selected_features.on('add', function(event) {
		selected_features.on('click', function(event) {
		var feature = event.element;
		console.log("selected feature Label: ",feature.get("label"));
		var slideid=parseInt(feature.getId());
		let dom_element =  GD.css.dom_element;
		console.log("Slide element: ",slideid)
		$(dom_element).cycle('goto',slideid);
		
	});
	console.groupEnd();
// when slide image clicked, change style of feature to point out the location 

$(".showonmap").on('click',function() {

	console.log("ok-------------Feature Label ",$(this).text());
				var g = $(this).text();
			let sourceVector = vectorLayer.getSource();
			sourceVector.forEachFeature(function(feature) {
				var f=feature.get("label");
	
				if(f.localeCompare(g) == 0){
				console.log("ok------------- match Feature Label ",f);
				feature.setStyle(selectStyleFunction);
				} else {
						feature.setStyle(textStyleFunction);
					
				}			
			});
	});
	
	return(true)
}

