/*
Filename: showpoints.js
Purpose: Handle input and output from showpoints.html
Setup: 
*/
var GD = { // your namespace
	my_value: 1,
	ClassA: function() { 
// a class inside the namespace
        this.class_property= 12,
        this.class_method= function() {
            console.log("My property: " + this.class_property);
        }
    },
    myFunction: function() { // a function inside a namespace
        console.log("I can access namepsace value if you don't use 'new': " + this.my_value);
    }
 }
 
var GD = GD || {};
GD.map ={
	map: null,
	zoom: 14,
};
GD.css = {
		dom_element: ".dom_element",
		slide_element:  ".slide_element",
		slide_element_class: "slide_element"
}
GD.props = {
		projectprefix: "pal",	
		datapath: "./data/json/",
		versionIndex: 0

		}
		
GD.createmap =  createMap;
GD.createSlideShow= createSlideshow;
GD.setupInteractive= setupInteractive;

var mapfunction = function(){
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
	
	$.when(createMap(jsondataObj)).done(function()
		{
			
			$.when(createSlideshow()).done(function(result)
			{

			//	console.group("After slide show: ",result)
				setupInteractive();
				//	console.groupEnd();
			/*$.when(setupInteractive()).done(function(result)
			{
				console.log("This has no purpose: ",result)	;	
			})
*/
		}) 
 		})
})

} // main program
//})(); 



	$(document).ready(function() {

	mapfunction();
	});
