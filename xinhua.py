import requests
# 新华字典库
url='https://www.pwxcoo.com/dictionary'
#歇后语 riddle 语面
params={'type':'xiehouyu','riddle':'黄盖'}
# 成语
# params={'type':'idiom','riddle':'兴高采烈'}
#  拼音缩写
# params={'type':'idiom','riddle':'xgcl'}
# 汉字
# params={'type':'word','riddle':'王'} 
r=requests.get(url=url,params=params)
data=r.json()
print(data)