sampleCount <- "38"
tempOutputFile <- "/tmp/bioinfo-8472124234357207949.output"
pubMed <- "10952317"
gse <- "GSE1"
id <- "169410"
workDir <- "/home/wangyang/.bioinfo/data"
library(httpgd)
plot_svg <- function(code){
    pic <- hgd_inline(code)
    cat(paste0("\n---start---\n",pic,"\n---end---\n"),file=tempOutputFile,append=T)
}
library(GEOquery)
library(limma)
library(umap)
if(exists("updateDate") && is.character(updateDate))cat(paste0("updateDate:",updateDate,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("sra") && is.character("sra"))cat(paste0("sra:",sra,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("gseType") && is.character("gseType"))cat(paste0("gseType:",gseType,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("dataOriginId") && is.character("dataOriginId"))cat(paste0("dataOriginId:",dataOriginId,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")

if(exists("description") && is.character("description"))cat(paste0("description:",description,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")

if(exists("gsePath") && is.character("gsePath"))cat(paste0("gsePath:",gsePath,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("dataCategoryId") && is.character("dataCategoryId"))cat(paste0("dataCategoryId:",dataCategoryId,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("sampleCount") && is.character("sampleCount"))cat(paste0("sampleCount:",sampleCount,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("pubMed") && is.character("pubMed"))cat(paste0("pubMed:",pubMed,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("cancerId") && is.character("cancerId"))cat(paste0("cancerId:",cancerId,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("species") && is.character("species"))cat(paste0("species:",species,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("gse") && is.character("gse"))cat(paste0("gse:",gse,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("analysisSoftwareId") && is.character("analysisSoftwareId"))cat(paste0("analysisSoftwareId:",analysisSoftwareId,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("studyId") && is.character("studyId"))cat(paste0("studyId:",studyId,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("id") && is.character("id"))cat(paste0("id:",id,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
if(exists("createDate") && is.character("createDate"))cat(paste0("createDate:",createDate,"\n"),append=T, file="/tmp/bioinfo-8472124234357207949.output")
