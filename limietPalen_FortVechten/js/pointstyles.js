var selectStyleFunction = function(feature, resolution) {
	/* Changes color of selected point and labels */
	/* Id is set in json file as time order of fotos */

	var label= feature.get("label");

//		console.log("------------------GET Feature label: ",label);
	if ( label !== undefined ) {
		var textStyle = {
		text: new ol.style.Text({
				text: label,
	font: 'bold 16px Helvetica',
	color: "white"
			
			})
		}	;
		// (18, 52, 86, 1) = 123456 dark blue
		var textStyleBack = {
				image: new ol.style.Circle({
					fill: new ol.style.Fill({
						color: '#d3d3d3'

					}),
				stroke: new ol.style.Stroke({
					width: 2,
					color: 'white'
					}				),
				radius: 15
				}),
		}
	
		// returning two styles causes an overlap.
	var style = [new ol.style.Style(textStyle),new ol.style.Style(textStyleBack)];
	return style;
} else {
// do nothing
}
	};
  
			
		
var textStyleFunction = function(feature, resolution) {
	
//	var label=feature.get("id");
//	let label= feature.getId()
	
	var label= feature.get("label");
//	console.log("Feature ids: ",label)
	if ( label !== undefined ) {
		//console.log("is this numeric? ",typeof label);
		//console.log("is this numeric? ", label);
	// set indices to start from 1 instead of zero, consistent with cycle
	//let slideIndex= 1+ parseInt(label);
	//label = slideIndex.toString();
	var textStyle = {
		text: new ol.style.Text({
				text: label,
	font: 'bold 16px Helvetica',
	color: "black"
			
			})
		}	;
		// (18, 52, 86, 1) = 123456 dark blue
		var textStyleBack = {
				image: new ol.style.Circle({
					fill: new ol.style.Fill({
						color: 'white'

					}),
				stroke: new ol.style.Stroke({
					width: 2,
					color: 'black'
					}				),
				radius: 15
				}),
		}
		// returning two styles causes an overlap.
	var style = [new ol.style.Style(textStyle),new ol.style.Style(textStyleBack)];
	return style;
	} else {
// do nothing
}
};

	
	
/* for plotting points from new file */	
var pointStyleFunction = function(feature, resolution) {
		var circleimage = new ol.style.Circle({
radius:5,
fill:  new ol.style.Fill({color: "#00ff00"}),
stroke:  new ol.style.Stroke({color: '#006600', width: 2})
});

var pointStrokeStyle = new ol.style.Style({
image: circleimage
});
var style = [pointStrokeStyle];
return style;
}