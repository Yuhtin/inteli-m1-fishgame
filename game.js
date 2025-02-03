var fs = require('fs');

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function preload() {
    this.load.image('mar', 'assets/bg_azul-escuro.png');
    
}

function create() {
    this.add.image(960, 540, 'fundo');
    this.add.image(960, 540, 'peixe');
}

function update() {

}