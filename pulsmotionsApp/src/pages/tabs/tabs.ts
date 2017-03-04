import { Component } from '@angular/core';

import { ConnectPage } from '../connect/connect';
import { TutorialPage } from '../tutorial/tutorial';
import { EmotionsPage } from '../emotions/emotions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ConnectPage;
  tab2Root: any = TutorialPage;
  tab3Root: any = EmotionsPage;

  constructor() {

  }
}
