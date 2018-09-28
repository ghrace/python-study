# -*- coding: utf-8 -*-
import scrapy
from scrapy.spiders import Spider
from scrapy.selector import Selector
from book.items import BookItem

class DoubanbookSpider(Spider):
    name = 'doubanbook'
    allowed_domains = ['douban.com']
    start_urls = ['https://www.douban.com/doulist/162432/']
    for i in range(1,10):
        start_urls.append('https://book.douban.com/top250?start=%d&sort=time&sub_type='%(25*i))
    def parse(self, response):
        item=BookItem()
        sel=Selector(response)
        imgs=sel.xpath('//*[@class="doulist-item"]')
        item['url']=[]
        item['name']=[]
        for img in imgs:
            site=img.xpath('div/div[2]/div[2]/a/img/@src').extract_first()
            img_name=img.xpath('div/div[2]/div[3]/a/text()').extract_first()
            img_name=img_name.split()[0]
            item['url'].append(site)
            item['name'].append(img_name)
            yield item