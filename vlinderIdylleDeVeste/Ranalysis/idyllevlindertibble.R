# List of all butterflies in the Idyle montoring list.
# assign a color to each buytterfly
# called functions:
#    getcolorlist()
# RMD 22 november 2019
# manually add a color column
idyllevlindertibble <-function(){
  library(readxl)
  library(tibble)
 source("getcolorlist.R")
 vlinderexceltibble<- read_excel("IdylleHoutenVoorveste_formulier.xls",skip=9,
                           col_names=c("idyllecode","idyllesoort"))

 vlinderexceltibble<- vlinderexceltibble[order(vlinderexceltibble$idyllesoort),]
class(vlinderexceltibble)
vlinderexceltibble[[2]]
ndim <- dim(vlinderexceltibble)
n <- ndim[[1]]
n
#colorArr <- c(1:n[[1]])
#colorlist <- getcolorlist(n)
#class(colorlist)
# add color column
#vlinderexceltibble <- add_column(vlinderexceltibble,colour=colorlist)
#class(vlinderexceltibble)
# remove spaces
#v1 <- as.data.frame(apply(vlinderexcel,2,function(x)gsub('\\s+', '',x)))
# remove commas
#vlinderexcel <- as.data.frame(apply(v1,2,function(x)gsub(',', '',x)))
# return idyllecode, soort, color
vlinderexceltibble
}

