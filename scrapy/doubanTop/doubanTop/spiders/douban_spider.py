# -*- coding: utf-8 -*-
# 爬虫类需要继承scrapy下的Spider类。
import scrapy

class douban_movie_spider(scrapy.Spider):
    # 项目的启动名
    name = "douban_movie"
    # 如果网站设置有防爬措施，需要添加上请求头信息，不然会爬取不到任何数据
    headler = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 '
                      'Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
    # 开始链接
    start_urls = [
        'https://movie.douban.com/top250'
    ]
    # start_requests方法为scrapy的方法，我们对它进行重写。
    def start_requests(self):
       # 将start_url中的链接通过for循环进行遍历。
       for url in self.start_urls:
             # 通过yield发送Request请求。
               # 这里的Reques注意是scrapy下的Request类。注意不到导错类了。
            # 这里的有3个参数：
            #        1、url为遍历后的链接
            #        2、callback为发送完请求后通过什么方法进行处理，这里通过parse方法进行处理。
            #        3、如果网站设置了防爬措施，需要加上headers伪装浏览器发送请求。
            
           yield scrapy.Request(url=url, callback=self.parse, headers=self.headler)

    # 重写parse对start_request()请求到的数据进行处理
    def parse(self, response):
        # 这里使用scrapy的css选择器，既然数据在class为item的div下，那么把选取范围定位div.item
        for quote in response.css('div.item'):
            # 通过yield对网页数据进行循环抓取，我们要抓取的内容有3个，分别如下
            yield {
                "电影名": quote.css('div.info div.hd a span.title::text').extract_first(),
                "评分":quote.css('div.info div.bd div.star span.rating_num::text').extract(),
                "引言": quote.css('div.info div.bd p.quote span.inq::text').extract()
            }
            next_url=response.css('div.paginator span.next a::attr(href)').extract()
            if next_url:
                next_url="https://movie.douban.com/top250"+next_url[0]
                print(next_url)
                yield scrapy.Request(next_url,headers=self.headler)