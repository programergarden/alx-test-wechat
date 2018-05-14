import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { MinePage } from '../mine/mine';
import { HomePage } from '../home/home';
import { CategoryPage } from "../category/category";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = ListPage;
  tab4Root = MinePage;

  constructor() {

  }
}
