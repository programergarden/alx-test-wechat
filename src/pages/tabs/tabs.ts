import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CategoryPage } from "../category/category";
import { UserComponent } from "../../plus/userinfo/userinfo.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = UserComponent;

  constructor() {

  }
}
