import { GameObjects, Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { EVENTS_NAME } from '../../consts';
import { Enemy } from '../../classes/enemy';
export class Level1 extends Scene { 
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private groundLayer!: Tilemaps.TilemapLayer;
  private chests!: Phaser.GameObjects.Sprite[];
  private enemies!: Phaser.GameObjects.Sprite[];
  // public getDamage(value?: number): void {
  //   super.getDamage(value);
  //   this.hpValue.setText(this.hp.toString());
  //   if (this.hp <= 0) {
  //     this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
  //   }
  // }

  
  private initChests(): void {
    const chestPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Chests', obj => obj.name === 'ChestPoint'),
    );
    this.chests = chestPoints.map(chestPoint =>
      this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(0.9),
    );
    this.chests.forEach(chest => {
      this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
        this.game.events.emit(EVENTS_NAME.chestLoot);
        obj2.destroy();
        this.cameras.main.flash();
      });
    });
  }
  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    console.log("we are inside the thing")
    this.wallsLayer.renderDebug(debugGraphics, {

      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }
  private initMap(): void {
    this.map = this.make.tilemap({ key: 'dungeon', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('dungeon', 'tiles');
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
    this.wallsLayer.setCollisionByProperty({ collides: true });

    // this.showDebugWalls();
  }
  private player!: Player;

  constructor() {
    super('level-1-scene');
  }
  // create the mobs/enemies
  private initEnemies(): void {
    const pepePoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies', (obj) => obj.name === 'PepePoint'),
    );
    this.enemies = pepePoints.map((enemyPoint) =>
      new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 439)
        .setName(enemyPoint.id.toString())
        .setScale(1.5),
    );
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      (obj1 as Player).getDamage(5);
    });
    //turbo
    const turboPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies', (obj) => obj.name === 'TurboPoint'),
    );
    this.enemies = turboPoints.map((enemyPoint) =>
      new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 503)
        .setName(enemyPoint.id.toString())
        .setScale(1.5),
    );
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      (obj1 as Player).getDamage(10);
    });
    // doge
    const dogePoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies', (obj) => obj.name === 'DogePoint'),
    );
    this.enemies = dogePoints.map((enemyPoint) =>
      new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 119)
        .setName(enemyPoint.id.toString())
        .setScale(1.5),
    );
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      (obj1 as Player).getDamage(2);
    });

  }
  create(): void {
    this.initMap();
    this.player = new Player(this, 800, 700);
    this.initChests();
    this.initEnemies();
    this.physics.add.collider(this.player, this.wallsLayer);
    this.initCamera();
  }

  update(): void {
    this.player.update();
    
  }
}