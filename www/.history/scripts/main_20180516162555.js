let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: [
        Test
    ]
};

const game = new Phaser.Game(config);