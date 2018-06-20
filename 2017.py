# coding=utf-8
import os
import requests
from bs4 import BeautifulSoup
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'}
base_url = 'https://www.douban.com/doulist/16002/?start='  # 设定一个网址不变的部分，然后我们只要每次在这个后面加数字就可以了
os.chdir("img")
for num in range(0,2):
    page=str(num*25)
    r=requests.get(base_url+page+'&sort=seq&sub_type=',headers=headers)
    content=r.text
    soup=BeautifulSoup(content,'lxml')
    items=soup.find_all('div',class_='bd doulist-subject')
    for item in items:
        # title=item.find('a').get('title')
        link=item.find('div',class_='title')
        title=link.find('a').get_text().split()[0]
        print(title)
        post=item.find('div',class_='post')
        img=post.find('img')
        src=img.get('src')
        photo=requests.get(src)
        with open(title+'.jpg','wb') as f:
            f.write(photo.content)
        # print(item)