# vlindersummary_oneplot
# Tidy problem
# vlinder  names : columns 2 to 9
# year of counting: column 1
# counts: In the cells 8x4 (8 butterflies and 4 years)
# format is xls but upon examination, is html table
# rename file to html and use readhtml in 
# All dates are monitoring dates. Not all cells are filled with data. Null meting is  special case.
#
# Set up with loops to show multiple plots. But at the moment makes only one.
# names of vlinders maybe should be in a separate table for publication. They should be common
# to all data plots made with this program.
# uses tapply, aggregate
# Subroutines:
#
library(here)
source("rosedim.R")
source("idyllevlindertibble.R")

source("getcolorvector.R")
library(tidyverse)
library(ggplot2)
library(gridExtra)

source("multiplot.R")
source("gridarrangesharedlegend.R")
idylletibble <- idyllevlindertibble()
#convert xls to csv
filename<-"2020/2096_alle_jaren.csv"
df<-read.csv(filename)
isStringasfactors<- FALSE
isdataframe<- TRUE

titlelist<- list("route1"="Route 2096")

## dplyr symbols
df <- df %>% separate(bezoekdatum,into = c("mydate","mytime"),sep=" ")
df <- df %>% separate(mydate,into = c("dag","maand","jaar"),sep="-")

m <- merge(df,idylletibble,by.x="soort",by.y="idyllesoort",all=TRUE)
typeof(m)
m[!!rowSums(is.na(m)),] <- NA
m$sectie <- factor(m$sectie)
typeof(m$sectie)
m$routenummer <- factor(m$routenummer)
m$soort <- factor(m$soort)
m$aantal <- as.numeric(m$aantal)
m$jaar <- factor(m$jaar)

af6 <- aggregate(aantal ~ soort + jaar,FUN=sum,data = m)

pal <- getcolorvector()
class(pal)


  plotlist <- ggplot(af6)+geom_bar(stat="identity",aes(x=jaar,y=aantal,fill=soort))+
    ggtitle(titlelist[1])+
    scale_fill_manual(values = pal,limits=names(pal))
plotlist

