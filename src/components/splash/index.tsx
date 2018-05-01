import {Page, TextView, ImageView, device, Button} from 'tabris';
import NavigationView from '../navigation';
import MainPage from '../main';
import {API} from '../../constants';

function splash() {

  NavigationView.toolbarVisible = false;

  const Splash = new Page( {
  }).on({
    appear: () => {
      fetch(API + '/workout/load', {
        method: 'GET',
      }).then(function(res) {
        res.json().then(function(js) {
          localStorage.setItem('workout_types', JSON.stringify(js));
          Splash.append(new ImageView({
            image: 'resources/splash.jpg',
            background: '#aaaaaa',
            width: device.screenWidth,
            centerX: 0,
            scaleMode: 'fit',
          })).append(new TextView({
            text: 'WORKOUT APP',
            font: 'bold 30px',
            centerX: 0,
            bottom: 150,
            textColor: 'white'
          })).append(new TextView({
            text: 'Something inspirational goes here',
            centerX: 0,
            bottom: 130,
            textColor: 'white'
          })).append(new Button({
            text: 'Get Started',
            centerX: 0,
            bottom: 20,
          }).on({
            select: () => {
              NavigationView.pages().dispose();
              NavigationView.append(MainPage());
            }
          }))
        })
      }).catch(function(err) {
        console.log('ERROR', err);
      })
    }
  });

  return Splash;
}

export default splash;
