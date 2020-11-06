
function createSlideshow() {
	var dom_element = GD.css.dom_element;
	 var nodelist = document.querySelectorAll(dom_element);
	
		var domnode= nodelist[0];
		var count = domnode.childElementCount;
		console.log("How many slides at this point: ",count)
	
		if(count > 0) {
		for(var slide = 0; slide < count; slide++) {
	  	  		$(dom_element).cycle('remove', slide);
			}

$(dom_element).cycle('destroy');
	$(dom_element).empty()
		} else {
			console.log("No cycle has yet been created: ",count);
		}	
	
//	var map = GD.map;
//	var inputpath = GD.inputpath
	var layers = GD.map.getLayers();
	var length = layers.getLength();
	console.log("number of layers: ",length)
	for (var i = 0; i < length; i++) {
		console.log("layerfunctions loop: ",i,layers.item(i).get('name'));
	} 
	var itemArr = [];
	var textArr=[];
	var labelArr=[];
	var layerVector= layers.item(1);
	console.log("check layer: ",layers.item(1).get('name'))
	//
		var map = GD.map
	var layers = map.getLayers();
	layers.forEach(function(layer,index){
			var layername = layer.get("name")
			if (layername == "Feature Layer") {
				vectorLayer = layer;
			}	
		})
	
	//
	let sourceVector = vectorLayer.getSource();
	let thumbdir=GD.props.projectprefix.concat("thumb/");
	let imagepath = GD.props.datapath + thumbdir;
//		console.log("imagepath for images: ",imagepath)
	var index,itemArr,textArr,labelArr;
// 
	sourceVector.forEachFeature(function(feature) {
		index=feature.getId();
		itemArr[index]=imagepath+feature.get('name');
	//	console.log("Image is: ",itemArr[index]);
		textArr[index]=feature.get("name");
		labelArr[index]=feature.get("label");
	});
		itemArr.reverse();
		textArr.reverse();
		labelArr.reverse();
	
		let slide_element = GD.css.slide_element;
		let slide_element_class = GD.css.slide_element_class;	
		var i,imgCont,slide; // variables in for loop
		//var url="https://rmdobservations.github.io/limietPalen_FortVechten/";
		for(i= 0;i< itemArr.length;++i){
			imgCont = '<div class="slide_element" >';
			imgCont+='<div class="foto-pane">';
			imgCont+='<div class="photo">';
			imgCont+= "<img src=" + itemArr[i] + ">";
			imgCont+='</div>';
			imgCont+='<div class="journal-text">';
			imgCont+=textArr[i];
			imgCont+='</div>';
			imgCont+='<div class="showonmap">';
			imgCont+=labelArr[i];
			imgCont+='</div>';
			imgCont+='</div></div>';
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
	