import { Injectable } from "@angular/core";
import { of } from 'rxjs/observable/of';

const DATALIST = [
  {
    categoryId: 1,
    categoryName: '测试分类1',
    categoryIcon: '',
    categoryChild:[
      {
        childId: 101,
        childName: '测试1',
        childIcon: ''
      },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },
      {
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },
      {
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 2,
    categoryName: '测试分类2',
    categoryIcon: '',
    categoryChild:[{
      childId: 101,
      childName: '测试1',
      childIcon: ''
    },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },{
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },{
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 3,
    categoryName: '测试分类3',
    categoryIcon: '',
    categoryChild:[{
      childId: 101,
      childName: '测试1',
      childIcon: ''
    },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },{
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },{
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 4,
    categoryName: '测试分类1',
    categoryIcon: '',
    categoryChild:[
      {
        childId: 101,
        childName: '测试1',
        childIcon: ''
      },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },
      {
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },
      {
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 5,
    categoryName: '测试分类2',
    categoryIcon: '',
    categoryChild:[{
      childId: 101,
      childName: '测试1',
      childIcon: ''
    },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },{
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },{
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 6,
    categoryName: '测试分类3',
    categoryIcon: '',
    categoryChild:[{
      childId: 101,
      childName: '测试1',
      childIcon: ''
    },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },{
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },{
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 7,
    categoryName: '测试分类1',
    categoryIcon: '',
    categoryChild:[
      {
        childId: 101,
        childName: '测试1',
        childIcon: ''
      },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },
      {
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },
      {
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 8,
    categoryName: '测试分类2',
    categoryIcon: '',
    categoryChild:[{
      childId: 101,
      childName: '测试1',
      childIcon: ''
    },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },{
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },{
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 9,
    categoryName: '测试分类3',
    categoryIcon: '',
    categoryChild:[{
      childId: 101,
      childName: '测试1',
      childIcon: ''
    },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },{
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },{
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  },
  {
    categoryId: 10,
    categoryName: '测试分类1',
    categoryIcon: '',
    categoryChild:[
      {
        childId: 101,
        childName: '测试1',
        childIcon: ''
      },
      {
        childId: 102,
        childName: '测试2',
        childIcon: ''
      },
      {
        childId: 103,
        childName: '测试3',
        childIcon: ''
      },
      {
        childId: 104,
        childName: '测试4',
        childIcon: ''
      },
      {
        childId: 105,
        childName: '测试5',
        childIcon: ''
      },
      {
        childId: 106,
        childName: '测试6',
        childIcon: ''
      }]
  }
];

@Injectable()
export class CategoriesService {
    constructor(){}

    getCategories() {
      return of(DATALIST);
    }

    getCategory(id: number) {
      return DATALIST.filter(item =>{ return item.categoryId == id })
    }

    getCategoryByName(name: string) {
      return DATALIST.filter(item =>{ return item.categoryName.indexOf(name)>-1 })
    }
}
