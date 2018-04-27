import {Page, TextView, ImageView, device, Button, ui} from 'tabris';
import NavigationView from '../navigation';
import MainPage from '../main';
import {API} from '../../constants';

function splash() {

  let workouts;

  ui.navigationBar.displayMode = 'hide';

  const Splash = new Page( {
    title: 'Splash'
  }).on({
    appear: () => {
      fetch(API + '/workout/load', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then(function(res) {
        res.json().then(function(js) {
          workouts = js;
          localStorage.setItem('workout_types', JSON.stringify(workouts));
          Splash.append(new ImageView({
            image: 'resources/splash.jpg',
            background: '#aaaaaa',
            width: device.screenWidth * 1.2,
            scaleMode: 'fit',
          })).append(new TextView({
            text: 'WORKOUT APP',
            font: 'bold 24px',
            centerX: 0,
            bottom: 150,
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
