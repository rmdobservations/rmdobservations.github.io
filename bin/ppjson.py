#!/usr/bin/python3
# for use in GPStoJSON.sh
# Created 15 june 2020
import json
import argparse

arg_parser = argparse.ArgumentParser( description = "pretty print json" )
arg_parser.add_argument( "source_file" )
arguments = arg_parser.parse_args()

source = arguments.source_file

fo=open(source,"r")
l=fo.read()

y = json.loads(l)
# pretty printing data
pretty_data = json.dumps(y, indent=4)
fo.close()
print(pretty_data)
