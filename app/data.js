import LocalImg from './images/images';
let data={
    book:[
        {
            title:"《三体三部曲》",
            author:"刘慈欣",
            image:LocalImg.book1,
            description:"《三体》第73届世界科幻雨果奖获奖作品，银河奖特别奖，入选教育部《中小学生阅读指导目录（2020年版）》，《三体3》轨迹奖长篇科幻小说！2017年世界雨果奖提名作品。",
            price:99,
            key:"",
        },
        {
            title:"《解忧杂货店》",
            author:"东野圭吾",
            image:LocalImg.book2,
            description:"东野圭吾代表作，1000万册纪念版，写给拥有无尽梦想与烦恼的你。现代人内心流失的东西，这家杂货店能帮你找回。东野圭吾特别寄语中国读者。",
            price:59,
            key:"",
        },
        {
            title:"《变形记》",
            author:"卡夫卡",
            image:LocalImg.book3,
            description:"收录卡夫卡54篇中短篇小说名作，深深影响村上春树、余华、加缪、萨特、残雪一生创作的灵魂之作，诺奖获得者、《百年孤独》作者马尔克斯的创作启蒙读本",
            price:30,
            key:"",
        },
        {
            title:"《月亮和六便士》",
            author:"毛姆",
            image:LocalImg.book4,
            description:"口碑爆棚的现象级畅销书！毛姆研究专家苏福忠译作，当当书香节一天狂销10000+！历史销量名列同名书前列！村上春树连读两遍，张爱玲感动推荐。知乎网友惊叹“可惜我不是在十几岁读的这本书” 。",
            price:21,
            key:"",
        },
        {
            title:"《人间失格》",
            author:"太宰治",
            image:LocalImg.book5,
            description:"人间失格（修订精装典藏版！太宰治用灵魂谱写的天鹅之歌，献给正在以及曾经在迷茫中挣扎的人！村上春树绝望凄美的灵感源泉！）",
            price:30,
            key:"",
        },
        {
            title:"《罗生门》",
            author:"芥川龙之介",
            image:LocalImg.book6,
            description:"日本近代文学大师芥川龙之介代表短篇全收录！芥川×鲁迅，中日大师的文学碰撞！鲁迅译后记、平安京鸟瞰大地图、原创手绘插画、罗生门故事海报、芥川龙之介文学手册……多元呈现芥川的文学世界！",
            price:59,
            key:"",
        },
        {
            title:"《局外人》",
            author:"阿贝尔·加缪",
            image:LocalImg.book7,
            description:"（2019全译本，同时收录《局外人》《堕落》，1957年诺贝尔文学奖得主加缪的代表作，存在主义文学、荒诞哲学的经典作品。福克纳、苏珊·桑塔格、马原等倍加推崇。）",
            price:32,
            key:"",
        },
        {
            title:"《在轮下》",
            author:"赫尔曼·黑塞",
            image:LocalImg.book8,
            description:"（诺贝尔文学奖得主赫尔曼·黑塞成名作，黑塞的作品迄今疯狂卖出1.4亿册，全世界的年轻人都爱黑塞。和《麦田里的守望者》类似，《在轮下》）是一本“黑森林里的守望者”。）",
            price:32,
            key:"",
        },
        {
            title:"《基督山伯爵》",
            author:"大仲马",
            image:LocalImg.book9,
            description:"豆瓣8.8分译本。首师大教授李玉民、国际关系学院教授陈筱卿无删节全译本。奇男子隐忍多年大仇终得报，美少女萌发真情暖化冰冷心",
            price:95,
            key:"",
        },
        {
            title:"《茶花女》",
            author:"小仲马",
            image:LocalImg.book10,
            description:"北大著名翻译家李玉民，依据法国出版界传奇“伽利玛出版社”底本译出。",
            price:20,
            key:"",
        },
    ],
    mgz:[
        {
            title:"《中国国家地理》",
            author:"中科院地理所",
            image:LocalImg.mgz1,
            description:"中国国家地理杂志 2021年2月起订阅共12期自然旅游地理知识人文景观期刊杂志正版书籍科普百科全书课外阅读博物君",
            price:180,
            key:"",
        },
        {
            title:"《中国国家人文》",
            author:"中科院社科所",
            image:LocalImg.mgz2,
            description:"国家人文历史杂志2021年全年杂志订阅新刊预订1年共24期历史杂志文学历史杂志2月起订",
            price:312,
            key:"",
        },
        {
            title:"《中华遗产杂志》",
            author:"中华书局",
            image:LocalImg.mgz3,
            description:"中华遗产杂志 艺术收藏期刊2021年全年杂志订阅新刊预订1年共12期2月起订",
            price:180,
            key:"",
        },
    ],
    paper:[
        {
            title:"《南方周末》",
            author:"南方报业",
            image:LocalImg.paper1,
            description:"中国国家地理杂志 2021年2月起订阅共12期自然旅游地理知识人文景观期刊杂志正版书籍科普百科全书课外阅读博物君",
            price:130,
            key:"",
        },
    ]
};
Object.keys(data).forEach((item, i) => {
    data[item].forEach((e, j) => {
        data[item][j].key = i + '-' + j;
      //goods[item][j].image = pics[Math.floor(Math.random()*len)]
    });
  });

export default data;

