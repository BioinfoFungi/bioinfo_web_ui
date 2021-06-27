import requests
import json
import sys

baseUrl = "http://localhost:8080/api"
# baseUrl = "http://bioinfo.online:9090/api"
# baseUrl = "http://8.140.164.151:8080/api"
def get(url,param={}):
    header = {'Authorization_SDK': 'wangyang1749748955'}
    res = requests.get(url=url,headers=header,params=param) 
    return res.json()

def post(url,param={}):
    header = {'Authorization_SDK': 'wangyang1749748955',"Content-Type":"application/json"}
    res =requests.post(url, headers=header,data=json.dumps(param))
    return res.json()

def find_project_by_id(id):
    return get(baseUrl+"/project/find/"+str(id))


def find_project_by_name(name):
    res = get(baseUrl+"/project/find",{"name":name})    
    return res


def update_project(id,url,status):
    return post(baseUrl+"/project/updateSDK/"+str(id),{"jupyterUrl":url,"projectStatus":status})

'''
0 正在进行
1 已完成
2 待开始
'''
# res = find_project_by_name("构建结直肠癌（CRC）中的circRNA/miRNA/mRNA调控网络以阐明CRC发生过程的具体分子机制")
# print(res)
# print("ID:",res['data'][0]['id'])
# print("name:",res['data'][0]['name'])
# print("description:",res['data'][0]['description'])
# print("jupyterUrl:",res['data'][0]['jupyterUrl'])
# print("projectStatus:",res['data'][0]['projectStatus'])
# print("formatContent:",res['data'][0]['formatContent'])
# print("deadline:",res['data'][0]['deadline'])

# if __name__ == "__main__":
   # project = find_project_by_id(56)
   # print(project)
#    header = {'Authorization_SDK': 'wangyang1749748955',"Content-Type":"application/json"}
#    res =requests.post(baseUrl+"/project/updateSDK/56", headers=header,data=json.dumps({'jupyterUrl': 'http://bioinfo.online/ss',"projectStatus":"0"}))
#    print(res.json())
  

    # print( update_project(1,"http://oss.bioinfo.online/JUPYTER/CODA/cicrRNA_miRNA_mRNA.html",0))
# http://oss.bioinfo.online/JUPYTER/CODA/cicrRNA_miRNA_mRNA.html

#  python bioinfo.py  find "构建结直肠癌（CRC）中的circRNA/miRNA/mRNA调控网络以阐明CRC发生过程的具体分子机制"
#  python bioinfo.py  findHtml "构建结直肠癌（CRC）中的circRNA/miRNA/mRNA调控网络以阐明CRC发生过程的具体分子机制"
#  python bioinfo.py  update 1 "XXXXXXXXXX" 0  
#  python bioinfo.py  updateByName "构建结直肠癌（CRC）中的circRNA/miRNA/mRNA调控网络以阐明CRC发生过程的具体分子机制"  "XXXXXXXXXX" 0
def main(argv):
    if argv[1]=="find":
        res = find_project_by_name(str(argv[2]))
        print("ID:",res['data'][0]['id'])
        print("name:",res['data'][0]['name'])
        print("description:",res['data'][0]['description'])
        print("jupyterUrl:",res['data'][0]['jupyterUrl'])
        print("projectStatus:",res['data'][0]['projectStatus'])
        print("deadline:",res['data'][0]['deadline'])
    if argv[1]=="update":
        res = update_project(argv[2],argv[3],argv[4])
        print("ID:",res['data']['id'])
        print("name:",res['data']['name'])
        print("description:",res['data']['description'])
        print("jupyterUrl:",res['data']['jupyterUrl'])
        print("projectStatus:",res['data']['projectStatus'])
        print("deadline:",res['data']['deadline'])
    if argv[1]=="findHtml":
            res = find_project_by_name(str(argv[2]))
            print(res['data'][0]['formatContent'])
    if argv[1]=="updateByName":
        res = find_project_by_name(str(argv[2]))
        res = update_project(res['data'][0]['id'],argv[3],argv[4])
        print("ID:",res['data']['id'])
        print("name:",res['data']['name'])
        print("description:",res['data']['description'])
        print("jupyterUrl:",res['data']['jupyterUrl'])
        print("projectStatus:",res['data']['projectStatus'])
        print("deadline:",res['data']['deadline'])
if __name__ == '__main__':
	# main(sys.argv)
    print(post(baseUrl+"/attachment",{"projectId":56,"name":"wangyang","path":'http://baidu.com/',"mediaType":"svg"})
)