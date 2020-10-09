
var customStyleFunction = function(feature, resolution) {

	//var label = feature.get('name').substring(3,5)
	//console.log("label: ",label)

	var objStyle = {
		text: new ol.style.Text({
		//		text: label,
				fill: new ol.style.Fill({
					color: '#abcdef'
				}),
				stroke: new ol.style.Stroke({
					color: '#123456',
					width: 1
				})
			})
		}	;
		var objStyleBack = {
				image: new ol.style.Circle({
					fill: new ol.style.Fill({
						color: 'red'
					}),
				stroke: new ol.style.Stroke({
				width: 1,
				color: 'red'
					}				),
				radius: 5
				}			),

		}
		// returning two styles causes an overlap.
var style = [new ol.style.Style(objStyle),new ol.style.Style(objStyleBack)];
return style;
};
