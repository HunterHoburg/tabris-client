import {Page} from 'tabris';
import Tabs from '../tabs';
import {API} from '../../constants';

function main() {

  function log() {
    console.log('hello');
  }

  let workouts;

  const Main = new Page( {
    title: 'Main'
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

          Main.append(Tabs(workouts));
        })
      }).catch(function(err) {
        console.log('ERROR', err);
      })
    }
  });

  return Main;
}

export default main;
