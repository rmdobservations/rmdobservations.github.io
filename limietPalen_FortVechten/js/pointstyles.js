var selectStyleFunction = function(feature, resolution) {
	var label= feature.get("label");
	if ( label !== undefined ) {
		var textStyle = {
		text: new ol.style.Text({
				text: label,
				font: 'bold 16px Helvetica',
				color: "white"
				})
		}	;
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
	} else {// do nothing 
	}
};
	
var textStyleFunction = function(feature, resolution) {
	var label= feature.get("label");
	if ( label !== undefined ) {
		var textStyle = {
		text: new ol.style.Text({
				text: label,
				font: 'bold 16px Helvetica',
				color: "black"
				})
		}	;
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
	} else { }
};

	
