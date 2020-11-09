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

  // 'GET /getInfo': {
  //   data: mock.mock({
  //     'tags': new Array(10).fill(1).map(() => {
  //       return mock.mock({
  //         'tagId|1-1000': 1,
  //         tagname: mock.Random.csentence(5),
  //       });
  //     }),
  //     'canteens': new Array(10).fill(1).map(() => {
  //       return mock.mock({
  //         'canteenId|1-1000': 1,
  //         canteenname: mock.Random.csentence(5),
  //       });
  //     }),
  //   })
  // } ,
  'GET /updateInfo':{
    data:mock.mock({
        'userId|1-1000':7,
        'preferredList':new Array(10).fill(1).map(() =>{
          return mock.mock({
            'tagId|1-100':8,
            'tagName':mock.Random.csentence(5),
          });
        }),
        'avoidList':new Array(10).fill(1).map(() =>{
          return mock.mock({
            'tagId|1-100':8,
            'tagName':mock.Random.csentence(5)
          });
        }),
    })
  },
 'GET /getInfo':{
    data:mock.mock({
      'data':new Array(1).fill(1).map(()=>{
        return mock.mock({
          'preferredList':new Array(10).fill(1).map(() =>{
            return mock.mock({
              'tagId|1-100':8,
              'tagName':mock.Random.csentence(5),
            });
          }),
          'avoidList':new Array(10).fill(1).map(() =>{
            return mock.mock({
              'tagId|1-100':8,
              'tagName':mock.Random.csentence(5)
            });
          })
        })  
     })
    })
 },
 'GET /getMarkedWindow':{
   data:mock.mock({
     'data':new Array(10).fill(1).map(()=>{
       return mock.mock({
        'windowId':new Array(1).fill(1).map(()=>{
          return mock.mock({
            'windowId|1-1000':99,
            'windowName':mock.Random.csentence(5),
            'pngSrc':mock.Random. image(),
            'description':mock.Random.csentence(50),
            'canteeName':mock.Random.csentence(5),
            'star|1-5':2,
            'dish':new Array(10).fill(1).map(()=>{
              return mock.mock({
                'name':mock.Random.csentence(5),
                'id|1=1000':99
              })
            })
          })
        })
       })
      
     })
   })
 },
 'GET /favorites':{
   data:mock.mock({
     'data':new Array(10).fill(1).map(()=>{
       return mock.mock({
         'dishList':new Array(10).fill(1).map(()=>{
           return mock.mock({
             'dishId|1-1000':99,
             'dishName':mock.Random.csentence(5),
             'price|1-100':14,
             'star|1-5':2
           })
         })
       })
     })
   })
 },
 'GET /dish/getDishInfo': {
 data: mock.mock({
 dishName: mock.Random.csentence(5),
 'price|1-100':1,
 'userStar|-1-5.1':2,
 'star|1-5.1':2,
 'starNum': new Array(5).fill(1).map(() => {
          return mock.Random.natural(1,5)
           }),
 'tagList': new Array(10).fill(1).map(() => {
             return mock.mock({
               'tagId|1-1000': 1,
               'tagNum|1-100': 1,
               'hasTagged|1': true,
             });
    })
   })
  },
 'POST /user/feedback':{
 },
 'POST /updateMarkedWindow':{
 },
 'POST /dish/updateDishStar':{
 "data":{
 }
 }

 };
