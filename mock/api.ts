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
      'windowName': mock.Random.csentence(3,8),
      'dish': new Array(10).fill(1).map(() => {
        return mock.mock({
          name: mock.Random.csentence(5),
          'id|1-1000': 1,
        });
      }),
      'description':mock.Random.cparagraph(5,50),
      'canteen|1':[
        '玫瑰园',
        '京元',
        '紫荆园',
        '教工食堂'
      ],
      'star|1-5.1':1,
      'pngSrc':mock.Random.image('150x150'),
    }),
  },
};
