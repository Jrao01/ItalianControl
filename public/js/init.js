import Nivel1 from "./scene1.js"

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "container",
    type: Phaser.AUTO,
    scene: [
        Nivel1
    ],physics:{
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
    console.log("soy preload");
    this.load.image("bondito", "./assets/bobrito.png");
    this.load.image("land", "./assets/landscape.png");
    this.load.image("box", "./assets/box.png"); 
    this.load.image("tralalero","./assets/tralalero.png")
    this.load.image("aim0","./assets/aim2.png" );
    this.load.image("chimpanzini","./assets/chimpanzini.png")
}

function create() {
    // Fondo centrado
    this.land = this.add.image(this.scale.width / 2.4, this.scale.height / 2, "land");
    this.box12 = this.add.image(0, 0, "box").setScale(2.187);
    
    // Personaje centrado en la parte inferior
    this.bondito = this.add.image(this.scale.width / 2 - 15, this.scale.height - 200, "bondito").setScale(0.5);
    this.chimp1 = this.add.image(0,0,"chimpanzini").setScale(.9)
    this.chimp2 = this.add.image(0,0,"chimpanzini").setScale(.9)

    this.physics.world.enable([this.chimp1, this.chimp2]);
    
    // Configurar propiedades de movimiento
    this.chimpSpeed = 150; // Velocidad de movimiento (píxeles por segundo)
    this.respawnDelay = 2000; // Tiempo de espera antes de reaparecer (ms)
    
    // Iniciar el movimiento de los chimpancés
    startChimpMovement.call(this);

    // Cajas en las esquinas inferiores
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
    this.tralalero3 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero4 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero5 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero6 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero7 = this.add.image(0,0,"tralalero").setScale(.3)
    this.tralalero8 = this.add.image(0,0,"tralalero").setScale(.3)
    this.aim = this.add.image(this.scale.width/2,this.scale.height/2,"aim0").setScale(.03)
    this.tralalero1.flipX = true
    this.tralalero2.flipX = true
    this.tralalero3.flipX = true
    this.tralalero4.flipX = true
    boxWidth = this.box1.displayWidth * 2;
    console.log(boxWidth);
    landscapeWidth = this.land.displayWidth - boxWidth;
    console.log(landscapeWidth);
    //miniboxW = landscapeWidth/8
    miniboxW = this.box3.displayWidth;
    console.log(miniboxW);

    // Ajusta las posiciones iniciales
    updateBoxPositions.call(this);
    
    // Escucha el evento de cambio de tamaño
    this.scale.on("resize", resize, this);
    this.cursor = this.input.keyboard.createCursorKeys();
    console.log(this.cursor)
    console.log("soy create");
    this
}

function update(time, delta) {
    // console.log(delta); // Puedes dejarlo si lo necesitas
    //this.bondito.angle++;
    //this.bondito.y++;
    //console.log("-----------------------");
    //console.log(this.bondito.displayHeight);
    if(this.cursor.right.isDown){
        this.aim.x = this.aim.x + 12
    }
    
    if(this.cursor.left.isDown){
        this.aim.x = this.aim.x - 12
    }
    
    if(this.cursor.down.isDown){
        this.aim.y = this.aim.y + 12
    }

    if(this.cursor.up.isDown){
        this.aim.y = this.aim.y  - 12
    }else {}
    moveChimps.call(this, delta);
}

function startChimpMovement() {
    // Posición inicial (justo debajo de las cajas)
    const padding = 102;
    const boxY = this.scale.height - 100;
    
    this.chimp1.y = boxY + this.chimp1.displayHeight;
    this.chimp2.y = boxY + this.chimp2.displayHeight;
    
    this.chimp1.x = padding;
    this.chimp2.x = this.scale.width - padding;
    
    this.chimp1.visible = true;
    this.chimp2.visible = true;
    
    // Estado de los chimpancés
    this.chimpState = {
        chimp1: { moving: true, respawnTimer: 0 },
        chimp2: { moving: true, respawnTimer: 0 }
    };
}

function moveChimps(delta) {
    const boxY = this.scale.height - 100;
    const padding = 102;
    
    // Mover chimp1
    if (this.chimpState.chimp1.moving) {
        this.chimp1.y -= this.chimpSpeed * (delta / 1000);
        
        // Verificar si ha salido de la pantalla
        if (this.chimp1.y < -this.chimp1.displayHeight) {
            this.chimp1.visible = false;
            this.chimpState.chimp1.moving = false;
            this.chimpState.chimp1.respawnTimer = this.respawnDelay;
        }
    } else {
        // Contar tiempo para respawn
        this.chimpState.chimp1.respawnTimer -= delta;
        if (this.chimpState.chimp1.respawnTimer <= 0) {
            this.chimp1.y = boxY + this.chimp1.displayHeight;
            this.chimp1.x = padding;
            this.chimp1.visible = true;
            this.chimpState.chimp1.moving = true;
        }
    }
    
    // Mover chimp2 (misma lógica)
    if (this.chimpState.chimp2.moving) {
        this.chimp2.y -= this.chimpSpeed * (delta / 1000);
        
        if (this.chimp2.y < -this.chimp2.displayHeight) {
            this.chimp2.visible = false;
            this.chimpState.chimp2.moving = false;
            this.chimpState.chimp2.respawnTimer = this.respawnDelay;
        }
    } else {
        this.chimpState.chimp2.respawnTimer -= delta;
        if (this.chimpState.chimp2.respawnTimer <= 0) {
            this.chimp2.y = boxY + this.chimp2.displayHeight;
            this.chimp2.x = this.scale.width - padding;
            this.chimp2.visible = true;
            this.chimpState.chimp2.moving = true;
        }
    }
}


function resize(gameSize) {
    // Actualiza el tamaño del juego
    this.scale.setGameSize(gameSize.width, gameSize.height);
    
    // Reubica el fondo y el personaje
    //this.land.setPosition(this.scale.width / 2, this.scale.height / 2);
    //this.bondito.setPosition(this.scale.width / 2, this.scale.height - 200);
    
    // Reubica las cajas
    updateBoxPositions.call(this);

    if (this.chimpState) {
        const boxY = this.scale.height - 100;
        const padding = 102;
        
        if (this.chimpState.chimp1.moving) {
            this.chimp1.x = padding;
        } else {
            this.chimp1.x = padding;
            this.chimp1.y = boxY + this.chimp1.displayHeight;
        }
        
        if (this.chimpState.chimp2.moving) {
            this.chimp2.x = this.scale.width - padding;
        } else {
            this.chimp2.x = this.scale.width - padding;
            this.chimp2.y = boxY + this.chimp2.displayHeight;
        }
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
    this.tralalero4.setPosition(boxXmini + miniboxW*3, tralaH)
    this.tralalero5.setPosition(boxXmini + miniboxW*5, tralaH)
    this.tralalero6.setPosition(boxXmini + miniboxW*6, tralaH)
    this.tralalero7.setPosition(boxXmini + miniboxW*7, tralaH)
    this.tralalero8.setPosition(boxXmini + miniboxW*8, tralaH)

    this.chimp1.setPosition(padding,boxY)
    this.chimp2.setPosition(this.scale.width - padding,boxY)
    this.chimp2.flipX = true
}