import scrapy


class SurgutNewsSpider(scrapy.Spider):
    name = 'surgut_news'
    allowed_domains = ['vestniksr.ru']
    start_urls = ['https://vestniksr.ru/']
    pages_count = 2
    ids = -1
    count = -1
    page = 0

    def start_requests(self):
        for page in range(1, 1 + self.pages_count):
            # url = f'https://parsemachine.com/sandbox/catalog/?page={page}'
            url = f'https://www.vestniksr.ru/news?page={page}'
            yield scrapy.Request(url, callback=self.parse_pages)

    def parse_pages(self, response, **kwargs):
        # for href in response.css('.product-card .title::attr("href")').extract():
        for href in response.css('.tile .title::attr("href")').extract():
            url = response.urljoin(href)
            yield scrapy.Request(url, callback=self.parse)

    def parse(self, response, **kwargs):
        description = {}
        i = 0
        for row in response.css('.f_content .value > p'):
            div = row.css(' *::text').extract()
            description[i] = div
            i += 1
        item = {
            'date_upload': response.css('time::text').extract_first('').strip() + ' ' + response.css('.time::text').extract_first('').strip(),
            'photo': 'https://www.vestniksr.ru' + response.css('.value > img::attr("src")').extract_first('').strip(),
            'title': response.css('h1::text').extract_first('').strip(),
            'description_strong': response.css('.value strong::text').extract_first('').strip(),
            'description': description
        }
        yield item