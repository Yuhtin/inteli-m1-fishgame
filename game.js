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
    this.load.image('logo' , 'assets/logo-inteli_branco.png');
   
    var files = fs.readdirSync('/assets/peixes/');

    files.forEach(file => {
        this.load.image('peixe' + i, '/assets/peixes/' + file);
    });
}

function create() {
    var files = fs.readdirSync('/assets/peixes/');
    
    for (var i = 0; i < files.length; i++) {
        // put the image in the scene in a random position
        var x = Phaser.Math.Between(0, 1920);
        var y = Phaser.Math.Between(0, 1080);

        this.add.image(x, y, 'peixe' + i).setOrigin(0.5, 0.5).setFlip(true, false);
    }

    this.add.image(400, 525, 'logo').setScale(0.5);
}

function update() {

}