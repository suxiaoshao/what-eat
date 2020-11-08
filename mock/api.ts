import * as mock from 'mockjs';

export default {
  'POST /login': {
    data: mock.mock({
      'userId|1-1000': 2,
      'hasRegistered|1': true,
    }),
  },

  'GET /recommend': {
    data: mock.mock({
      'windowId|1-1000': 1,
      'windowName': mock.Random.csentence(3, 8),
      'dish': new Array(10).fill(1).map(() => {
        return mock.mock({
          name: mock.Random.csentence(5),
          'id|1-1000': 1,
        });
      }),
      'description': mock.Random.cparagraph(5, 50),
      'canteen|1': [
        '玫瑰园',
        '京元',
        '紫荆园',
        '教工食堂'
      ],
      'star|1-5.1': 1,
      'pngSrc': mock.Random.image('150x150'),
    }),
  },

  'GET /search': {
    data: mock.mock({
      'id|1-1000': 2,
      name: mock.Random.csentence(5),
      'pngSrc': mock.Random.image(),
      'desc': mock.Random.cparagraph(5, 50),
      'canteen': mock.Random.string(4),
      'star|1-5.1': 2,
      'dish': new Array(10).fill(1).map(() => {
        return mock.mock({
          name: mock.Random.csentence(5),
          'id|1-1000': 1,
        });
      }),
    })
  },

  'POST /updateDishTag': {
    data: mock.mock({
      name: mock.Random.csentence(5),
      'tagId|1-1000': 2,
      'count|1-1000': 1,
      'markedTag|1': true,
    }),
  },

  'GET /windows': {
    data: mock.mock({
      'windowlist': new Array(1).fill(1).map(() => {
        return mock.mock({
          'id|1-1000': 2,
          name: mock.Random.csentence(5),
          'pngSrc': mock.Random.image(),
          'desc': mock.Random.string(4),
          'mapSrc': mock.Random.string(5),
          'canteen': mock.Random.string(4),
          'star|1-5.1': 2,
          'tags': new Array(5).fill(1).map(() => {
            return mock.Random.natural(1,50)
          }),
          'isMarked|1': true,
          'dish': new Array(10).fill(1).map(() => {
            return mock.mock({
              name: mock.Random.csentence(5),
              'id|1-1000': 1,
              'price|1-100': 1,
              'star|1-5.1': 2,
            });
          }),
        })
       }),
    }),
  },

  'GET /getInfo': {
    data: mock.mock({
      'tags': new Array(10).fill(1).map(() => {
        return mock.mock({
          'tagId|1-1000': 1,
          tagname: mock.Random.csentence(5),
        });
      }),
      'canteens': new Array(10).fill(1).map(() => {
        return mock.mock({
          'canteenId|1-1000': 1,
          canteenname: mock.Random.csentence(5),
        });
      }),
    })
  } 
};

