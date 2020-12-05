import React from 'react';
import { Game } from '../view/game';
import { Header } from './header';
import { Footer } from './footer';

export function App() {
    return (
      <div id='content' >
        <Header />
        <Game />
        <br />
        <Footer />
      </div>
    );
}
