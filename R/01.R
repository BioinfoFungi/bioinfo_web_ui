fileName <- "GSE142583_series_matrix.txt"
dataOriginId <- "3"
dataCategoryId <- "12"
userId <- "1"
uuid <- "43598559-d417-42a4-8f75-cda2a03aa7ff"
parentId <- "901"
codeId <- "1"
times <- "0"
codeIsSuccess <- "false"
relativePath <- "data/GSE142583_series_matrix.txt.gz"
gse <- "GSE142583"
analysisSoftwareId <- "4"
absolutePath <- "/home/wangyang/.bioinfo/data/GSE142583_series_matrix.txt.gz"
id <- "946"
workDir <- "/home/wangyang/.bioinfo/data"
fileType <- "txt.gz"
status <- "true"
md5 <- "9034f419d5f4e3f1b178520b58d73135"
library(GEOquery)
library(tidyverse)

if(F){
    gse <- "GSE10469"
    absolutePath <- "/home/wangyang/.bioinfo/data/GSE10469_series_matrix.txt.gz"
    workDir <- "."
}
gset <- getGEO(filename = absolutePath,getGPL = F)
expr <- gset@assayData[["exprs"]]


gpl_url <- paste0("http://localhost:8080/data/GPL/",gset@annotation,".tsv.gz")
gpl <- read_tsv(gpl_url)
# View(gpl)
expr |>
    as.data.frame() |>
    rownames_to_column("probeId") |> 
    inner_join(gpl, by="probeId") |>
    dplyr::select(-probeId) %>%
    aggregate(. ~ symbol, data = ., mean) -> expr_symbol

if(!file.exists("GSE")){
     dir.create("GSE",recursive = T)
}
saveFile_expr <- paste0(workDir,"/GSE/",gse,"_expr.tsv")
saveFile_metadata <- paste0(workDir,"/GSE/",gse,"_metadata.tsv")
write_tsv(expr_symbol, file=saveFile_expr)
write_tsv(gset@phenoData@data, file=saveFile_metadata)

system(paste0("gzip -f ",saveFile_expr))
system(paste0("gzip -f ",saveFile_metadata))

gse_download <- paste0(saveFile_expr,".gz")
metadata <-  paste0(saveFile_metadata,".gz")
cat("$[0]analysisSoftware:","integrated_expression_matrix","\n")
cat("$[0]annotation:",gset@annotation,"\n")
cat("$[0]absolutePath:",saveFile_expr,".gz\n")

cat("$[1]absolutePath:",saveFile_metadata,".gz\n")
cat("$[1]analysisSoftware:","metadata","\n")

#cat("$update:true","\n")
if(exists("gse_download"))cat(paste0("gse_download:",gse_download,"\n"),append=T, file="/tmp/bioinfo-4231101742447146590.output")
if(exists("metadata"))cat(paste0("metadata:",metadata,"\n"),append=T, file="/tmp/bioinfo-4231101742447146590.output")
