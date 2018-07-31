import requests
# 新华字典库
url='https://www.pwxcoo.com/dictionary'
params={'type':'xiehouyu','riddle':'黄盖'}#歇后语 riddle 语面
# params={'type':'idiom','riddle':'兴高采烈'}成语
# params={'type':'idiom','riddle':'xgcl'} 拼音缩写
# params={'type':'word','riddle':'王'} 汉字

r=requests.get(url=url,params=params)
data=r.json()
print(data)