import Win from './win.js'
class GameOver extends Phaser.Scene{
    constructor(){
        super({key:"GameOver"});

    }

    preload(){
        
        this.load.font('titulo', './assets/Radiantantique.ttf');
        this.load.image("bg","./assets/gameOver.jpg")
        this.load.audio("bgS","./assets/GameOver.mp3")
    }

    create(){
        
    this.cursor = this.input.keyboard.createCursorKeys();
        this.bg = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"bg")
        this.bgS = this.sound.add("bgS",{loop:true});
        this.bgS.play();
        
    const press = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height - 75, 'PRESS SPACE', {
        fontSize: 45,
        fontFamily: 'titulo',
        color: '#f0f0f0',
        align: 'center'
    }).setOrigin(0.5);

        this.tweens.add({
        targets: press ,
        duration:1000,
        y:this.sys.game.config.height - 85,
        repeat: -1,
        yoyo: true,
        ease:'Power1'
    })

    }

    update(){

    if(this.cursor.space.isDown){
        window.location.reload();
    }

    if(this.cursor.shift.isDown){
        console.log("yendo a pantalla de win")
        this.scene.add("WinScene", new Win)
        this.scene.start("WinScene")
        this.bgS.stop();
    }

    }

}

export default GameOver