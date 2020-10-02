#!/bin/bash

# purpose
# Create a json file from a directory of jpg files.
# Index increases with time in files. ls -l 
#      This is used as slide index in OpenLayers app.
# usage:
# GPSToJSON.sh fileprefix 
# Creates pretty print fileprefix
# Modification:
# 15 June 2020 RMD added python ppjson.py to pretty print output
#              manually copy to server/data/original$ cp -fR ~/Afbeeldingen/12june/vlinder/june12* 


# save output to file for cases which contain an error
#
#{
#  "type": "FeatureCollection",
#  "features": [
#    {
#      "type": "Feature",
#           "id": "id0",
#      "properties": {
#        "name": "20180512_133958.jpg"
#      },
#      "geometry": {
#        "type": "Point",
#        "coordinates": [ lon,lat ]
#      }
#    }
#  ]
#}



if [ -z "$1" ]  ;
  then
    echo "Usage:"
    echo "GPStoJSON.sh fileprefix  "
    echo "File to be created"
  else
  prefix=$1
echo $prefix
# header of json formatted files
# time on camera is utc


#{
#  "type": "FeatureCollection",
#  "features": [
#    {
#      "type": "Feature",
#      "properties": {
line1='{'
line2='"type": "FeatureCollection",'
line3='"features": ['


leftcurly='{'
rightcurly='}'
rightcurlycomma='},'
colon=':'
featuretype='"type": "Feature",'
propertieslabel='"properties": {'
namekey='"name"'
idkey='"id"'
comma=','
quote='"'
geometrytype='"geometry": {'
typepoint='"type": "Point",'
begincoordinates='"coordinates": ['
endcoordinates=']'
rightbracket=']'
comma=','
end=']}'


thumbdir="./"${prefix%.*}"_thumb/";
if [ ! -d $thumbdir ]; then
        
 # Control will enter here if $DIRECTORY doesn't exist.
#outfile=${prefix%.*}"_pp.json" ;
        mkdir $thumbdir;
        echo  $thumbdir;
fi

echo $leftcurly > $prefix
echo $line2  >> $prefix
echo $line3 >> $prefix

################## in loop
arrName=($(ls -1 *.jpg))
#how many images
count=0
for filename in "${arrName[@]}"
        do
        let count++
        done
echo "there are " 
echo $count 
echo "files"
echo "------------------"
skipcommacount=$(( $count - 1 ))
echo "------------------"
#fi

n=0
for filename in "${arrName[@]}"
	do
# create thumbnail
        echo $thumbdir$filename;
        convert $filename -auto-orient -thumbnail 250x180 -unsharp 0x.5 $thumbdir$filename
# extract coordinates
        outputLat=$(exiftool -n -p '$GPSLatitude' $filename)
	outputLon=$(exiftool -n -p '$GPSLongitude' $filename)
        if [ -z $outputLat ] || [ -z $outputLon ] 
	then
		echo "lat or lon is empty, Use Houten Trains Station as default" 
	# houten train station 52.034406, 5.167892
		outputLat="52.034406"
		outputLon="5.167892"
        else
        echo "latitude: " $outputLat "longitude: " $outputLon "Filename: " $filename
        echo -e
        fi
        echo $leftcurly >> $prefix

        echo $featuretype  >> $prefix
        echo $idkey $colon $quote$n$quote  $comma >> $prefix
                echo $propertieslabel >> $prefix
       
      
        echo $namekey $colon $quote$filename$quote >> $prefix
   #     echo $idkey $colon $quote$n$quote >> $prefix
        echo $rightcurlycomma >> $prefix
        echo $geometrytype $typepoint >> $prefix
        #outputlon=5
        #outputlat=54
        #outputLat=$(exiftool -n -p '$GPSLatitude' $filename)
        #outputLon=$(exiftool -n -p '$GPSLongitude' $filename)
        echo $begincoordinates $outputLon $comma $outputLat $endcoordinates >> $prefix
        echo $rightcurly >> $prefix
        echo $rightcurly >> $prefix
        if [ $n == $skipcommacount ] 
	then
		echo "do not write comma for last item"
                echo $n $skipcommacount
       else
        echo $n $skipcommacount            
        echo $comma >> $prefix 
	fi
       

        let n++
done
###################
echo $rightbracket >> $prefix
echo $rightcurly >> $prefix
# prettyprint output

mv $prefix $prefix".json";
#echo $outfile;
#ppjson.py $prefix > $outfile
#rm -f $prefix
fi
## manually copy to server/data/original$ cp -fR ~/Afbeeldingen/12june/vlinder/june12* .


