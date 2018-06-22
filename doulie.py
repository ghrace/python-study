# coding=utf-8
import os
import requests
from bs4 import BeautifulSoup
import time
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'}
base_url = 'https://www.douban.com/doulist/57376/?start='  # 设定一个网址不变的部分，然后我们只要每次在这个后面加数字就可以了   16002另外一 57376
if os.path.exists('doulie'):
    os.chdir("doulie")
else:
    os.mkdir("doulie")
    os.chdir("doulie")
for num in range(0,12):
    page=str(num*25)
    time.sleep(1)
    r=requests.get(base_url+page+'&sort=seq&sub_type=',headers=headers)
    content=r.text
    soup=BeautifulSoup(content,'lxml')
    items=soup.find_all('div',class_='bd doulist-subject')
    for item in items:
        # title=item.find('a').get('title')
        link=item.find('div',class_='title')
        alltitle=link.find('a').get_text()
        title=alltitle.split()[0]
        print(title)
        with open('豆列1.txt','a',encoding='utf-8') as f:
            f.write(str(alltitle))
        post=item.find('div',class_='post')
        img=post.find('img')
        src=img.get('src')
        photo=requests.get(src)
        with open(title+'.jpg','wb') as f:
            f.write(photo.content)
        # print(item)