import {Page, Button} from 'tabris';
import NavigationView from '../navigation';
import SplashPage from '../splash';

function settings() {
  const settingsPage = new Page({
    title: 'Settings',
  });

  settingsPage.append(new Button({
    top: 10,
    left: 10,
    right: 10,
    text: 'Log Out',
    background: '#d14036',
    textColor: 'white',
  }).on({
    select: () => {
      NavigationView.pages().dispose();
      NavigationView.append(SplashPage());
    }
  }));

  return settingsPage;
}

export default settings;
