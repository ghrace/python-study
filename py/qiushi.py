# coding=utf-8
import requests
from lxml import etree
url='https://www.qiushibaike.com'
for i in range(1,10):
    req=requests.get(url+'/8hr/page/%d/'%(i))
    root=etree.HTML(req.text)
    p=root.xpath('//div[contains(@class,mb15)]/a[1]/div/span[1]')
    for a in p:
        text=a.text
        print(text)
        with open("qb.txt","a",encoding='utf-8') as f:
            f.write(text.strip()+"\n\n")