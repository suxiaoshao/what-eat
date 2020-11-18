import * as mock from 'mockjs';

export default {
  'POST /user/login': {
    data: mock.mock({
      'userId|1-1000': 2,
      'hasRegistered|1': true,
    }),
  },

  'GET /window/recommend': {
    data: {
      windowList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'windowId|1-1000': 1,
          windowName: mock.Random.cword(3, 8),
          pngSrc: 'https://pic2.zhimg.com/80/v2-91a8a0cd17f264f52b9d0e9d7ec0e712_720w.jpg?source=1940ef5c',
          description: mock.Random.cparagraph(3, 7),
          'canteenName|1': ['玫瑰园', '京元', '紫荆园', '教工食堂'],
          'star|1-4.1': 1,
          dish: new Array(3).fill(1).map(() => {
            return mock.mock({
              'dishId|1-1000': 1,
              dishName: mock.Random.cword(3, 8),
            });
          }),
        });
      }),
    },
  },

  'GET /user/search': {
    data: mock.mock({
      searchList: new Array(1).fill(1).map(() => {
        return mock.mock({
          'id|1-1000': 2,
          name: mock.Random.cword(3, 7),
          pngSrc: mock.Random.image(),
          desc: mock.Random.cparagraph(3, 7),
          canteen: mock.Random.cword(5),
          'star|1-4.1': 2,
        });
      }),
      dish: new Array(1).fill(1).map(() => {
        return mock.mock({
          name: mock.Random.cword(5),
          'id|1-1000': 1,
        });
      }),
    }),
  },

  'POST /dish/updateDishTag': {
    data: mock.mock({
      tagName: mock.Random.cword(3, 7),
      'tagId|1-1000': 2,
      'tagNum|1-1000': 1,
      'hasTagged|1': true,
    }),
  },

  'GET /window/info': {
    data: mock.mock({
      'windowId|1-1000': 2,
      windowName: mock.Random.cword(5),
      pngSrc: 'https://pic2.zhimg.com/80/v2-91a8a0cd17f264f52b9d0e9d7ec0e712_720w.jpg?source=1940ef5c',
      description: mock.Random.cparagraph(3, 7),
      mapSrc: 'https://pic3.zhimg.com/80/v2-0158fd3a40f3396ec766aec48b8a21da_720w.jpg',
      'canteenName|1': ['玫瑰园', '京元', '紫荆园', '教工食堂'],
      'star|1-4.1': 2,
      tags: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-1000': 1,
          tagName: mock.Random.cword(3, 5),
        });
      }),
      'isMarked|1': true,
      dish: new Array(20).fill(1).map(() => {
        return mock.mock({
          dishName: mock.Random.cword(3, 7),
          'dishId|1-1000': 1,
          'price|1-100': 1,
          'star|1-4.1': 2,
          tags: new Array(5).fill(1).map(() => {
            return mock.mock({
              'tagId|1-1000': 1,
              tagName: mock.Random.cword(3, 5),
            });
          }),
        });
      }),
    }),
  },

  'GET /system/getInfo': {
    data: mock.mock({
      tags: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-1000': 1,
          tagName: mock.Random.cword(5),
        });
      }),
      canteens: new Array(10).fill(1).map(() => {
        return mock.mock({
          'canteenId|1-1000': 1,
          canteenName: mock.Random.cword(5),
        });
      }),
    }),
  },
  'POST /user/updateInfo': {
    data: mock.mock({
      'userId|1-1000': 7,
      preferredList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-100': 8,
          tagName: mock.Random.cword(5),
        });
      }),
      avoidList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-100': 8,
          tagName: mock.Random.cword(5),
        });
      }),
    }),
  },
  'GET /user/getInfo': {
    data: mock.mock({
      preferredList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-100': 8,
          tagName: mock.Random.cword(5),
        });
      }),
      avoidList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-100': 8,
          tagName: mock.Random.cword(5),
        });
      }),
    }),
  },
  'GET /window/getMarkedWindow': {
    data: mock.mock({
      windowList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'windowId|1-1000': 99,
          windowName: mock.Random.cword(5),
          pngSrc: 'https://pic2.zhimg.com/80/v2-91a8a0cd17f264f52b9d0e9d7ec0e712_720w.jpg?source=1940ef5c',
          description: mock.Random.cparagraph(5, 50),
          canteenName: mock.Random.cword(5),
          'star|1-4.1': 2,
          dish: new Array(3).fill(1).map(() => {
            return mock.mock({
              dishName: mock.Random.cword(3, 7),
              'dishId|1-1000': 99,
            });
          }),
        });
      }),
    }),
  },
  'GET /dish/favorites': {
    data: mock.mock({
      dishList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'dishId|1-1000': 99,
          dishName: mock.Random.cword(5),
          'price|1-100': 14,
          'star|1-4.1': 2,
        });
      }),
    }),
  },
  'GET /dish/getDishInfo': {
    data: mock.mock({
      dishName: mock.Random.cword(5),
      'price|1-100': 1,
      userStar: -1,
      'star|1-4.1': 2,
      starNum: new Array(5).fill(1).map(() => {
        return mock.Random.natural(1, 5);
      }),
      windowName: mock.Random.cword(3, 5),
      'windowId|1-1000': 2,
      tagList: new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-1000': 1,
          'tagNum|1-100': 1,
          'hasTagged|1': true,
          tagName: mock.Random.cword(3, 5),
        });
      }),
    }),
  },
  'POST /user/feedback': {},
  'POST /updateMarkedWindow': {},
  'POST /dish/updateDishStar': {
    data: mock.mock({}),
  },
};
