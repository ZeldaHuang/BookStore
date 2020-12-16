import LocalImg from './images/images';
let data={
    book:[
        {
            title:"《三体三部曲》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:99,
        },
        {
            title:"《三体三部曲2》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲3》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲4》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲5》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲6》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲7》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲8》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲9》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
        {
            title:"《三体三部曲10》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:89,
        },
    ],
};
Object.keys(data).forEach((item, i) => {
    data[item].forEach((e, j) => {
        data[item][j].key = i + '-' + j;
      //goods[item][j].image = pics[Math.floor(Math.random()*len)]
    });
  });
export default data;

