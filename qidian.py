import os
import requests
from bs4 import BeautifulSoup

if __name__ == "__main__":
    url='https://book.qidian.com/info/1011924365#Catalog'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}
    r=requests.get(url,headers=headers)
    content = r.text
    soup=BeautifulSoup(content,'lxml')
    chapters=soup.find_all('ul',class_='cf')
    down_soup=BeautifulSoup(str(chapters),'lxml')
    for name in down_soup.find_all('a'):
        down_url='https:'+name.get('href')
        down_req=requests.get(down_url,headers=headers)
        down_soup=BeautifulSoup(down_req.text,'lxml')
        chap=down_soup.find_all('div',class_='read-content j_readContent')
        chap_soup=BeautifulSoup(str(chap),'lxml')
        print(name.string+'\n\n'+chap_soup.get_text()+'\n\n')
        with open("qd.txt","w") as f:
            f.write(name.string+'\n\n'+chap_soup.get_text()+'\n\n')