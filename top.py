# coding=utf-8
import os
import requests
from bs4 import BeautifulSoup
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}
base_url = 'https://movie.douban.com/top250?start='  # 设定一个网址不变的部分，然后我们只要每次在这个后面加数字就可以了
os.mkdir("img")
os.chdir("img")
for num in range(0,10):
    page=str(num*25)
    # request = requests.Session()
    # request.proxies = .... 反爬虫,代理   
    r=requests.get(base_url+page+'&filter=',headers=headers)
    content = r.text
    soup = BeautifulSoup(r.text, 'lxml')
    divs=soup.find_all('img')
    for div in divs:
        title=div.get('alt')
        src=div.get('src')
        print(src)
        photo=requests.get(src)
        with open(title+".jpg", "wb") as f:
            f.write(photo.content)
