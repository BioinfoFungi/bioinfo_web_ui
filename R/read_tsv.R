library("tidyverse")

df <- data.frame()
for( i in 1:2){
    url <- paste0("https://www.ncbi.nlm.nih.gov/geo/browse/?view=series&zsort=date&mode=csv&page=",i,"&display=5000")
    df <- rbind(df,read_csv(url))
    cat(url,"\n")
}
dim(df)


GSE_SOURCE <- read_tsv("/home/wangyang/.bioinfo/data/GSE_SOURCE.tsv")
head(GSE_SOURCE) |>View()
GSE_SOURCE |>
    select(gse=Accession,sra=`SRA Accession`,pubMed=`PubMed ID`,sampleCount=`Sample Count`)|>
    write_tsv(file="/home/wangyang/.bioinfo/data/GSE.tsv",na="")
