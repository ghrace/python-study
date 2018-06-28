# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.pipelines.images import ImagesPipeline
from scrapy.http import Request

class BookPipeline(object):
    def process_item(self, item, spider):
        return item
class MyImagesPipeline(ImagesPipeline):
    def get_media_requests(self,item,info):
        for url in item['url']:
            yield Request(url,meta={'item':item,'index':item['url'].index(url)})
    
    def file_path(self,request,response=None,info=None):
        item=request.meta['item']
        index=request.meta['index']
        print(index)
        image_name=item['name'][index]
        return 'img/%s.jpg' %(image_name)