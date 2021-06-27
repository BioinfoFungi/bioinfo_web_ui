#https://httr.r-lib.org/articles/quickstart.html
anova <- read.csv("~/Videos/anova.csv")
library(reshape)
data <- melt(anova,id=c())
names(data) <- c('trt', 'res')  # 重命名列名
aov <- aov(res ~ trt, data = data)
summary(aov)


library("httr")
baseUrl <-  "http://localhost:8080/api"

url="http://www.baidu.com"
r <- GET(paste0(baseUrl,"/project/find/56"), add_headers(headers))


#private String cancer;
#private String study;
#private String dataOrigin;
query <- list(cancer = "BRAC", study="transcript",dataOrigin="TCGA")
r <- GET(paste0(baseUrl,"/cancer_study/findOne"), add_headers(headers),query=query)

content(r)


status_code(r)
headers(r)
resp <- content(r)
resp[['data']][['description']]
#print(post(baseUrl+"/attachment",{"projectId":56,"name":"wangyang","path":'http://baidu.com/',"mediaType":"svg"})
body <- list(projectId=55,
             name="testets",
             path="http://baidu.com/",
             mediaType='svg')      
(r <- POST(paste0(baseUrl,"/attachment"), add_headers(headers),encode = "json",body = body))

headers <- c(
  "Authorization_SDK"= "wangyang1749748955"
  #"Content-Type"="application/json"
)
body <- list(projectId=55,
             name="testets",
             path="http://baidu.com/",
             mediaType='svg',
             file=upload_file("README.md"))      
(r <- POST(paste0(baseUrl,"/attachment/upload"), add_headers(headers),encode = "multipart",body = body))


###############################
#private String cancer;
#private String study;
#private String dataOrigin;
#private String resourcesPath;
body <- list(cancer = "BRAC",
             study= "transcript",
             dataOrigin="TCGA",
             file=upload_file("/home/wy/Downloads/univariable_cox_lncRNA.csv"))  
(r <- POST(paste0(baseUrl,"/cancer_study/upload"), add_headers(headers),encode = "multipart",body = body))


library(tidyverse)
univariable_cox_lncRNA <- read_csv("http://localhost:8080/data/univariable_cox_lncRNA.csv")
univariable_cox_lncRNA

#"jupyterUrl":url,"projectStatus":status
(r <- POST(paste0(baseUrl,"/project/updateSDK/56"), add_headers(headers),encode = "json",body = list(jupyterUrl = "testets", projectStatus= 2)))


#private String cancer;
#private String study;
#private String dataOrigin;
#private String resourcesPath;
body <- list(cancer = "BRAC",
             study= "transcript",
             dataOrigin="TCGA",
             filename="123456.txt")
(r <- POST(paste0(baseUrl,"/cancer_study"), add_headers(headers),encode = "json",body = body))







