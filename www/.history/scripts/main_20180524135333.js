let config = {
    type: Phaser.CANVAS,
    parent: 'game',
    width: 800,
    height: 600,
    scene: [
        Test
    ]
};

const game = new Phaser.Game(config);