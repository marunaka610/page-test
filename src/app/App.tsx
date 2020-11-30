import React from 'react';
import Game from '../view/game';
import Header from './Header';
import Footer from './Footer';

interface State {
  game: Game
}
interface Props {
}


export default class App extends React.Component<Props, State> {

  componentDidMount() {
    console.log("App componentDidMount")
  }
  render() {
    return (
      <div id='content' >
        <Header />
        <Game />
        {/* {this.state.game.render()} */}
        <br />
        <Footer />
      </div>

    );
  }
}
