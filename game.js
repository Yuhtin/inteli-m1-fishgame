var debug = false; // Se o debug estiver ativo, irá desenhar um circulo vermelho com o raio configurado em maxDeltaRadius
var maxDeltaRadius = 100; // Raio de ação do mouse
var moveAround = false; // Habilita o movimento aleatório dos peixes
var gameModifications = true; // Habilita as modificações no jogo

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
var tubarao;
var peixes = [];

function preload() {
    this.load.image('mar', 'assets/bg_azul-escuro.png');
    this.load.image('logo', 'assets/logo-inteli_branco.png');
    this.load.image('tubarao', 'assets/peixes/tubarao.png');

    this.load.image('peixe0', 'assets/peixes/baiacu_lado.png');
    this.load.image('peixe1', 'assets/peixes/baiacu.png');
    this.load.image('peixe2', 'assets/peixes/peixinho_laranja.png');
    this.load.image('peixe3', 'assets/peixes/tartaruga.png');
}

function create() {
    this.add.image(400, 300, 'mar');

    var maxRange = 3;

    if (gameModifications) {
        for (var i = 0; i < 25; i++) {
            // Colocar o peixe dentro da tela em um lugar aleatório
            var x = Phaser.Math.Between(0, 960);
            var y = Phaser.Math.Between(0, 540);

            var number = Phaser.Math.Between(0, maxRange);
            peixes.push(this.add.image(x, y, 'peixe' + number).setScale(0.5).setOrigin(0.5, 0.5).setFlip(true, false));
        }
    }

    tubarao = this.add.image(400, 300, 'tubarao').setScale(0.6);
    this.add.image(400, 525, 'logo').setScale(0.7);
}

function update() {
    var currentX = this.input.x;
    var currentY = this.input.y;

    // Definição da posição do tubarão de acordo com a posição do mouse
    tubarao.x = currentX;
    tubarao.y = currentY;

    for (var i = 0; i < peixes.length; i++) {
        var deltaX = currentX - peixes[i].x;
        var deltaY = currentY - peixes[i].y;

        var deltaRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (deltaRadius < maxDeltaRadius) {
            // Mover o peixe para longe do mouse
            var x = peixes[i].x - deltaX / 5;
            var y = peixes[i].y - deltaY / 5;

            // Mover o peixe para o outro lado da tela caso ele saia
            peixes[i].x = Phaser.Math.Wrap(x, 50, 750);
            peixes[i].y = Phaser.Math.Wrap(y, 50, 550);

            // Inverter a imagem do peixe de acordo com a direção do mouse
            peixes[i].setFlip(deltaX < 0, false);
        } else {
            if (moveAround) {
                if (Phaser.Math.Between(0, 5) == 0) {
                    var x = peixes[i].x - Phaser.Math.Between(0, 5);
                    peixes[i].x = Phaser.Math.Wrap(x, 50, 750);
                } else {
                    var y = peixes[i].y - Phaser.Math.Between(0, 5);
                    peixes[i].y = Phaser.Math.Wrap(y, 50, 550);
                }
            }
        }
    }

    if (debug) {
        if (!this.graphics) {
            this.graphics = this.add.graphics();
        }

        this.graphics.clear();
        this.graphics.lineStyle(2, 0xff0000);
        this.graphics.strokeCircle(currentX, currentY, maxDeltaRadius);
    }
}