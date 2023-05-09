// import { Game } from 'phaser';
// import type {Types} from 'phaser'
// import { Level1, LoadingScene } from './src/scenes';
// import { UIScene } from './src/scenes/ui';
// interface Window {
//     sizeChanged: () => void;
//     game: Phaser.Game;
//   }
// const gameConfig: Types.Core.GameConfig = {
    
// 	title: 'KEK CASH PEPE SMASH',
//   type: Phaser.WEBGL,
//   parent: 'game',
//   backgroundColor: '#351f1b',
//   scale: {
//     mode: Phaser.Scale.ScaleModes.NONE,
//     width: window.innerWidth,
//     height: window.innerHeight,
//   },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       debug: false,
//     },
//   },
//   render: {
//     antialiasGL: false,
//     pixelArt: true,
//   },
//   callbacks: {
//     postBoot: () => {
//       (window as unknown as Window).sizeChanged();
//     },
//   },
//   canvasStyle: `display: block; width: 100%; height: 100%;`,
//   autoFocus: true,
//   audio: {
//     disableWebAudio: false,
//   },
//   scene: [LoadingScene, Level1, UIScene],
// };
// (window as unknown as Window).sizeChanged = () => {
//     if ((window as unknown as Window).game.isBooted) {
//       setTimeout(() => {
//         (window as unknown as Window).game.scale.resize(window.innerWidth, window.innerHeight);
//         (window as unknown as Window).game.canvas.setAttribute(
//           'style',
//           `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
//         );
//       }, 100);
//     }
//   };
//   window.onresize = () => (window as unknown as Window).sizeChanged();

//   (window as unknown as Window).game = new Game(gameConfig);


