# coding=utf-8
import os
import requests
from bs4 import BeautifulSoup
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'}
base_url = 'https://movie.douban.com/top250?start='  # 设定一个网址不变的部分，然后我们只要每次在这个后面加数字就可以了
if os.path.exists('img'):
    os.chdir("img")
else:
    os.mkdir("img")
    os.chdir("img")
for num in range(0,10):
    page=str(num*25)
    r=requests.get(base_url+page+'&filter=',headers=headers)
    content = r.text
    soup = BeautifulSoup(r.text, 'lxml')
    divs=soup.find_all('div',class_='item')
    for div in divs:
        img=div.find('img')
        title=img.get('alt')
        src=img.get('src')
        print(title)
        print(src)
        photo=requests.get(src)
        with open(title+".jpg", "wb") as f:
            f.write(photo.content)
