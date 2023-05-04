import { GameObjects, Scene } from 'phaser';
export class LoadingScene extends Scene {
    private king!: GameObjects.Sprite;
  constructor() {
    super('loading-scene');
  }
  preload(): void {
	this.load.baseURL = 'src/assets/';
	// key: 'king'
	// path from baseURL to file: 'sprites/king.png'
	this.load.image('king', 'sprites/king.png');
    this.load.image({
        key: 'tiles',
        url: 'tilemaps/tiles/dungeon-16-16.png',
      });
      this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json');
    // king atlas
    this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');
    //load spritesheet to tie objects to sprites
    this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
        frameWidth: 16,
        frameHeight: 16,
      });
}

  create(): void {
    this.king = this.add.sprite(100, 100, 'king');
    this.scene.start('level-1-scene');
    this.scene.start('ui-scene');
    console.log('Loading scene was created');
  }
}