import { Math, Scene } from 'phaser';
import { Actor } from './actor';
import type {Player}  from './player';
import { EVENTS_NAME } from '../consts';
export class Enemy extends Actor {
  
  whack = this.scene.sound.add("whack", { loop: false });
  private target: Player;
  private AGRESSOR_RADIUS = 500;
  private attackHandler: () => void;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;
    // ADD TO SCENE
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);
    //Attack model
    this.attackHandler = () => {
      if (
        Phaser.Math.Distance.BetweenPoints(
          { x: this.x, y: this.y },
          { x: this.target.x, y: this.target.y },
        ) < this.target.width/1.8
      ) {
        this.getDamage();
        this.scene.game.events.emit(EVENTS_NAME.kill)
        this.whack.play();
        this.disableBody(true, false);

        this.scene.time.delayedCall(300, () => {
          this.destroy();
        });
      }};
      // EVENTS
  this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
  this.on('destroy', () => {
    this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
  });

  }
  preUpdate(): void {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.AGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX((this.target.x - this.x));
      this.getBody().setVelocityY((this.target.y - this.y));
    } else {
      this.getBody().setVelocity(0);
    }
  }
  public setTarget(target: Player): void {
    this.target = target;
  }
}