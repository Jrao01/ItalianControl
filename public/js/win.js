

class Win extends Phaser.Scene{
    constructor(){
        super({key:"WinScene"})
    }
    
    preload(){
        this.load.font('titulo', './assets/Radiantantique.ttf');
        this.load.image("bgW","./assets/win.jpg")
        this.load.audio("bgSW","./assets/winBgS.mp3")
    }

    create(){
        
    this.cursor = this.input.keyboard.createCursorKeys();
    this.bg = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"bgW").setScale(2)
    this.bgS = this.sound.add("bgSW",{loop:true});
    this.bgS.play();

    const press = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2 + 25, 'You Won!!\nPRESS SPACE', {
        fontSize: 65,
        fontFamily: 'titulo',
        color: '#f0f0f0',
        align: 'center'
    }).setOrigin(0.5);

        this.tweens.add({
        targets: press ,
        duration:1000,
        y:this.sys.game.config.height/2 - 25,
        repeat: -1,
        yoyo: true,
        ease:'Power1'
    })


    }


    update(){
    if(this.cursor.space.isDown){
        window.location.reload();
    }
    }
}

export default Win;