import Nivel1 from "./scene1.js"
import GameOver from "./gameOver.js"

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "container",
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
,physics:{
        default: "arcade",
        arcade: {
            gravity:{
                y:0
            }
        }
    }
    ,
    // Añade el escalado responsivo
    scale: {
        mode: Phaser.Scale.RESIZE, // Ajusta automáticamente el tamaño del juego al contenedor
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);
let boxWidth
let landscapeWidth
let miniboxW
function preload() {
    this.load.font('titulo', './assets/Radiantantique.ttf');
    console.log("soy preload");
    this.load.image("bondito", "./assets/bobrito.png");
    this.load.image("land", "./assets/landscape.png");
    this.load.image("box", "./assets/box.png"); 
    this.load.image("tralalero","./assets/tralalero.png")
    this.load.image("aim0","./assets/aim2.png" );
    this.load.image("chimpanzini","./assets/chimpanzini.png")
    this.load.image("bombardiro","./assets/bombardiro.png");
    this.load.image("bombardini","./assets/bombardini.png");
    this.load.image("glorbo","./assets/glorbo.png")
    this.load.audio("start","./assets/Intro.mp3")

}

function create() {
    
    this.bgSound = this.sound.add("start",{loop:true});
    this.bgSound.play();
    this.land = this.add.image(this.scale.width / 2.4, this.scale.height / 2, "land");
    this.box12 = this.add.image(0, 0, "box").setScale(2.187);
    
    // Personaje centrado en la parte inferior
    this.bondito = this.add.image(this.scale.width / 2 - 15, this.scale.height - 200, "bondito").setScale(0.5);
    this.chimp1 = this.add.image(0,0,"chimpanzini").setScale(.9)
    this.chimp2 = this.add.image(0,0,"chimpanzini").setScale(.9)

    this.box1 = this.add.image(0, 0, "box").setScale(0.4);
    this.box2 = this.add.image(0, 0, "box").setScale(0.4);
    this.box3 = this.add.image(0, 0, "box").setScale(0.243);
    this.box4 = this.add.image(0, 0, "box").setScale(0.243);
    this.box5 = this.add.image(0, 0, "box").setScale(0.243);
    this.box6 = this.add.image(0, 0, "box").setScale(0.243);
    this.box7 = this.add.image(0, 0, "box").setScale(0.243);
    this.box8 = this.add.image(0, 0, "box").setScale(0.243);
    this.box9 = this.add.image(0, 0, "box").setScale(0.243);
    this.box10 = this.add.image(0, 0, "box").setScale(0.243);
    this.box11 = this.add.image(0, 0, "box").setScale(0.243);
    this.tralalero1 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero2 = this.add.image(0,0,"tralalero").setScale(.3)
    this.glorbo1 = this.add.image(0,0,"glorbo").setScale(.2)
    this.glorbo2 = this.add.image(0,0,"glorbo").setScale(.2)
    this.tralalero3 = this.add.image(0,0,"tralalero").setScale(.3)
    //this.tralalero4 = this.add.image(0,0,"tralalero").setScale(.3)
    //this.tralalero5 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero6 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero7 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero8 = this.add.image(0,0,"tralalero").setScale(.3)
    this.bombardiro1 = this.add.image(0,0,"bombardiro").setScale(.4)
    this.bombardiro2 = this.add.image(0,0,"bombardiro").setScale(.4)
    this.bombardini1 = this.add.image(0,0,"bombardini").setScale(.4)
    this.bombardini2 = this.add.image(0,0,"bombardini").setScale(.4)

    this.tralalero1.flipX = true
    this.tralalero2.flipX = true
    this.tralalero3.flipX = true
    this.glorbo1.flipX = true
    boxWidth = this.box1.displayWidth * 2;
    console.log(boxWidth);
    landscapeWidth = this.land.displayWidth - boxWidth;
    console.log(landscapeWidth);
    //miniboxW = landscapeWidth/8
    miniboxW = this.box3.displayWidth;
    console.log(miniboxW);
    // textooosss
const title = this.add.text(this.sys.game.config.width/2, 300, 'ITALIAN\nMISSION', {
        fontSize: 120,
        fontFamily: 'titulo',
        color: '#000000',
        align: 'center'
    }).setOrigin(0.5);

    const press = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height - 55, 'PRESS SPACE\nTO START', {
        fontSize: 45,
        fontFamily: 'titulo',
        color: '#000000',
        align: 'center'
    }).setOrigin(0.5);

    const by = this.add.text(34,this.sys.game.config.height - 18, 'Developed by Coding JAR',{
        fontSize: 10,
        color: '#000000',
        align: 'center'
    })

    this.tweens.add({
        targets: press ,
        duration:1000,
        y:this.sys.game.config.height - 65,
        repeat: -1,
        yoyo: true,
        ease:'Power1'
    })

    // Ajusta las posiciones iniciales
    updateBoxPositions.call(this);

    // Escucha el evento de cambio de tamaño
    this.cursor = this.input.keyboard.createCursorKeys();
    console.log(this.cursor)
    console.log("soy create");
    console.log(this.cursor.space)
}

function update(time, delta) {

    if(this.cursor.space.isDown){
        console.log("presionaste")
        this.scene.add("Nivel1", new Nivel1)
        this.scene.start("Nivel1",{
            score:100
        })
        this.bgSound.stop();
    }

    if(this.cursor.shift.isDown){
        console.log("yendo a pantalla final");
        this.scene.add("GameOver", new GameOver)
        this.scene.start("GameOver");
        this.bgSound.stop();
    }


}


function updateBoxPositions() {
    const padding = 102; // Espacio desde el borde
    const boxY = this.scale.height - 100; // Misma altura para ambas
    const boxYmini = (boxY + boxWidth*.10) - 3;
    const boxXmini = (boxWidth+padding) /2 + 11;
    const tralaH = this.scale.height - 168;
    
    this.box12.setPosition(padding*2 + boxXmini*2 + 27 ,boxY*1.8)
    this.box1.setPosition(padding, boxY);
    this.box2.setPosition(this.scale.width - padding, boxY);
    this.box3.setPosition(boxXmini , boxYmini)
    this.box4.setPosition(boxXmini + miniboxW, boxYmini)
    this.box5.setPosition(boxXmini + miniboxW*2, boxYmini)
    this.box6.setPosition(boxXmini + miniboxW*3, boxYmini)
    this.box7.setPosition(boxXmini + miniboxW*4, boxYmini)
    this.box8.setPosition(boxXmini + miniboxW*5, boxYmini)
    this.box9.setPosition(boxXmini + miniboxW*6, boxYmini)
    this.box10.setPosition(boxXmini + miniboxW*7, boxYmini)
    this.box11.setPosition(boxXmini + miniboxW*8, boxYmini)

    this.tralalero1.setPosition(boxXmini, tralaH)
    this.tralalero2.setPosition(boxXmini + miniboxW, tralaH)
    this.tralalero3.setPosition(boxXmini + miniboxW*2, tralaH)
    this.glorbo1.setPosition(boxXmini + miniboxW*3, tralaH + 15)
    this.glorbo2.setPosition(boxXmini + miniboxW*5, tralaH + 15)
    this.tralalero6.setPosition(boxXmini + miniboxW*6, tralaH)
    this.tralalero7.setPosition(boxXmini + miniboxW*7, tralaH)
    this.tralalero8.setPosition(boxXmini + miniboxW*8, tralaH)

    this.bombardiro1.setPosition(260,80,"bombardiro")
    this.bombardiro1.flipX = true;
    this.bombardiro2    .setPosition(this.scale.width - 260 ,80,"bombardiro")
    this.bombardini1.setPosition(520,100,"bombardini")
    this.bombardini2.setPosition(this.scale.width - 520, 100 ,"bombardini")
    this.bombardini2.flipX = true;

    this.chimp1.setPosition(padding,boxY-240)
    this.chimp2.setPosition(this.scale.width - padding,boxY-240)
    this.chimp2.flipX = true
}