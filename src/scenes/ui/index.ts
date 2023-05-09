import { Scene } from 'phaser';
import { Score, ScoreOperations } from '../../classes/score';
import { EVENTS_NAME, GameStatus } from '../../consts';
import playerScore from '../../stores/playerScore';
export class UIScene extends Scene {

  private score!: Score;
  private chestLootHandler: () => void;
  private killHandler: () => void;
  private gameEndPhrase!: Text;
  private gameEndHandler: (status: GameStatus) => void;
  constructor() {
    super('ui-scene');
    this.chestLootHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 100);
      const wuhu = this.sound.add("wuhu", { loop: false });
      wuhu.play();

    }
    this.killHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 69)
    }
    this.gameEndHandler = (status) => {
      const ugh = this.sound.add("ugh", { loop: false });
      ugh.play();

      this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
      // TODO: ADD SCORE TO THE HIGH SCORES TABLE
      const lastScore = this.score.scoreValue

      playerScore.set(this.score.scoreValue);

      console.log(`You just got a score of`, this.score.scoreValue)

      this.game.scene.pause('level-1-scene');





      this.gameEndPhrase = new Text(
        // this,
        // this.game.scale.width / 2,
        // this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `WASTED!\nCLICK TO RESTART`
          : `YOU ARE ROCK!\nCLICK TO RESTART`,
      )
      // .setAlign('center')
      // .setColor(status === GameStatus.LOSE ? '#ff0000' : '#ffffff');
      // this.gameEndPhrase.setPosition(
      //   this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
      //   this.game.scale.height * 0.4,
      // );
    };

  }
  create(): void {
    this.score = new Score(this, 20, 20, 0);
    // TODO: Add high score here
    this.initListeners();
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
    this.game.events.on(EVENTS_NAME.kill, this.killHandler, this)
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
  }
}