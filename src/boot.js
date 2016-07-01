class Boot extends Phaser.State {

  preload() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.load.spritesheet('character', 'assets/sprites/character-sprite.png', 150, 117);
    this.load.image('button-health', 'assets/sprites/icon-health.png');
    this.load.image('button-school', 'assets/sprites/icon-school.png');
    this.load.image('button-social', 'assets/sprites/icon-social.png');
    this.load.image('button-hobby', 'assets/sprites/icon-hobby.png');
    this.load.image('notebook', 'assets/sprites/notebook.png');
    this.load.json('challenge', 'data/category.json');
    this.stage.backgroundColor = "#ffffff";
  }

  create() {
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }
    this.game.state.start('preloader');
  }

}

export default Boot;
