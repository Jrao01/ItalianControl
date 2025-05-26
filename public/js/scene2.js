import GameOver from "./gameOver.js"
import Win from "./win.js"

class Nivel2 extends Phaser.Scene {
    constructor(){
        super({key:"Nivel2"});
        this.boxWidth = 0;
        this.landscapeWidth = 0;
        this.miniboxW = 0;
        this.chimpSpeed = -150; // Velocidad hacia arriba
        this.respawnY = this.scale?.height - 10 || 800; // Posición de reaparecer
         this.bombardiroSpeed = 500; // Velocidad de movimiento horizontal
    this.minX = 0; // Mismo límite izquierdo que aim0
    this.maxX = 0; // Mismo límite derecho que aim0
    this.Points = 0
    this.tralalerosKilled = 0
    this.bombardirosKilled = 0
    }

       init(data) {
        // Accede a los datos mediante data.nombreParametro
        this.Points += data.score;
        console.log(`Puntuación final: ${this.finalScore}`);
    }

    preload() {
        console.log("soy preload");
        this.load.image("bondito", "./assets/bobrito.png");
        this.load.image("land", "./assets/landscape.png");
        this.load.image("box", "./assets/box.png"); 
        this.load.image("bullet","./assets/bullet4.png");
        this.load.image("tralalero","./assets/tralalero.png");
        this.load.image("aim0","./assets/aim2.png");
        this.load.image("chimpanzini","./assets/chimpanzini.png");
        this.load.image("glorbo","./assets/glorbo.png")
        this.load.image("Nikess","./assets/tralalerodead.png")
        this.load.audio("explodes","./assets/Impact15.wav")
        this.load.audio("bgFS","./assets/Start.mp3")
        this.load.audio("shot","./assets/shot.wav")
        this.load.audio("drop","./assets/drop.wav")
        this.load.audio("Chimp","./assets/chimpS.mp3");
        this.load.audio("upgrade","./assets/uplong.wav")
        this.load.image("gussini","./assets/bombardini.png")
    }

    create() {
    this.bgsound = this.sound.add("bgFS",{loop:true})
    this.bgsound.play()
    this.BombardiDestroyed = this.sound.add("explodes",{loop:false});
    this.shot = this.sound.add("shot",{loop:false});
    this.drop = this.sound.add("drop",{loop:false});
    this.ChimpS = this.sound.add("Chimp",{loop:false});
    this.upgradee = this.sound.add("upgrade",{loop:false});
    
        this.bullets = this.physics.add.group();
        this.minX = 270;
        this.maxX = this.sys.game.config.width - 270; 
        
        this.glorbos = this.physics.add.group();

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.land = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"land");
        this.box12 = this.physics.add.image(0, 0, "box").setScale(2.187);

        this.bondito = this.add.image(this.scale.width / 2 - 23, this.scale.height - 200, "bondito").setScale(0.5).setOrigin(.33,.5);

        this.chimp1 = this.physics.add.image(102, this.respawnY, "chimpanzini").setScale(0.9);
        this.chimp2 = this.physics.add.image(this.scale.width - 102, this.respawnY, "chimpanzini").setScale(0.9);
        this.chimp2.flipX = true;
        this.chimp1.setImmovable()
        this.chimp2.setImmovable()
        // Establecer velocidad en el eje Y
        this.chimp1.body.setVelocityY(this.chimpSpeed);
        this.chimp2.body.setVelocityY(this.chimpSpeed);

        // Configurar físicas en el mundo
        this.physics.world.enable([this.chimp1, this.chimp2]);

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

        this.box13 = this.physics.add.image(470, 240 , "box").setScale(0.07);
        const tinyBoxW = this.box13.displayWidth + 1
        this.box14 = this.physics.add.image(this.sys.game.config.width - 470, 240 , "box").setScale(0.07);
        this.box15 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW , 240 , "box").setScale(0.07);
        this.box16 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 2, 240 , "box").setScale(0.07);
        this.box17 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 3, 240 , "box").setScale(0.07);
        this.box18 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 4, 240 , "box").setScale(0.07);
        this.box19 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 5, 240 , "box").setScale(0.07);
        this.box20 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 6, 240 , "box").setScale(0.07);
        this.box21 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 7, 240 , "box").setScale(0.07);
        this.box22 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 8, 240 , "box").setScale(0.07);
        this.box23 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 9, 240 , "box").setScale(0.07);
        this.box24 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 10, 240 , "box").setScale(0.07);
        this.box25 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 11, 240 , "box").setScale(0.07);
        this.box26 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 12, 240 , "box").setScale(0.07);
        this.box27 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 13, 240 , "box").setScale(0.07);
        this.box28 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 14, 240 , "box").setScale(0.07);
        this.box29 = this.physics.add.image(this.sys.game.config.width - 470 - tinyBoxW * 15, 240 , "box").setScale(0.07);
        

        this.tralalero1 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero2 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero3 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero4 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero5 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero6 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero7 = this.physics.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero8 = this.physics.add.image(0, 0, "tralalero").setScale(.3);

        this.bombardiros = this.physics.add.group();
    
    // Posiciones iniciales (usa this.minX y this.maxX para posicionarlos dentro de los límites)
    const bombardiroPositions = [
        { x: this.minX + 50, y: 40 },  // 50 píxeles desde el borde izquierdo
        { x: this.maxX - 50, y: 160 }, // 50 píxeles desde el borde derecho
        { x: (this.minX + this.maxX) / 2, y: 100 } // Centro horizontal
    ];
    
    bombardiroPositions.forEach(pos => {
        const bombardiro = this.bombardiros.create(pos.x, pos.y, "gussini")
            .setScale(0.2)
            .refreshBody(); // Actualiza el cuerpo físico
        
        // Asigna velocidad inicial aleatoria para variedad
        const speed = this.bombardiroSpeed
        bombardiro.body.setVelocityX(-speed);
        bombardiro.flipX= true 
    });
        this.aim = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "aim0").setScale(.03);

        this.tralalero1.flipX = true;
        this.tralalero2.flipX = true;
        this.tralalero3.flipX = true;
        this.tralalero4.flipX = true;

        this.boxWidth = this.box1.displayWidth * 2;
        console.log(this.boxWidth);
        this.landscapeWidth = this.land.displayWidth - this.boxWidth;
        console.log(this.landscapeWidth);
        this.miniboxW = this.box3.displayWidth;
        console.log(this.miniboxW);

        // collidersss
        
        this.updateBoxPositions();
        this.physics.add.collider(this.bullets,this.chimp1,this.rebote,null,this)
        this.physics.add.collider(this.bullets,this.chimp2,this.rebote,null,this)
        this.physics.add.collider(this.bullets,this.glorbos,this.destroy,null,this)

        this.physics.add.collider(this.bullets, this.bombardiros, this.destroyy, null, this);
        
        // Colisión entre glorbos y tralaleros
        this.physics.add.collider(
        this.glorbos, 
        [
            this.tralalero1, this.tralalero2, this.tralalero3, this.tralalero4,
            this.tralalero5, this.tralalero6, this.tralalero7, this.tralalero8
        ],
        this.destroyTralalero,
        null,
        this);

        this.physics.add.collider(this.bullets,[this.box13,this.box14,this.box15,this.box16,
            this.box17,this.box18,this.box19,this.box20,this.box21,this.box22,this.box23,
            this.box24,this.box25,this.box26,this.box27,this.box28,this.box29
        ],
    this.destroyyy,null,this)

        this.physics.add.collider(this.glorbos,this.box12,this.destroyGLorbo,null,this)
        
        // Configuración de controles
        this.cursor = this.input.keyboard.createCursorKeys();

    this.pointsText = this.add.text(
        this.sys.game.config.width/2, 
        this.sys.game.config.height - 60, 
        `Puntos: ${this.Points}`, // Usa template literals
        {
            fontSize: 50,
            fontFamily: 'titulo',
            color: '#000000',
            align: 'center'
        }
    ).setOrigin(0.5);


    }

    destroyGLorbo(glorbo,box12){

        box12.destroy();
        glorbo.body.setImmovable(true);
    glorbo.body.moves = false; 
    }


    destroyTralalero(glorbo, tralalero) {
    glorbo.body.setVelocity(0, 0);
    glorbo.body.setAngularVelocity(0);
    
    glorbo.setTexture('Nikess');
    
    glorbo.body.setImmovable(true);
    glorbo.body.moves = false;  
    glorbo.body.enable = false; 
    
    if (tralalero) {
        this.tralalerosKilled += 1
        this.tweens.add({
            targets: tralalero,
            alpha: 0,
            duration: 300,
            onComplete: () => tralalero.destroy()
        });
    }
    
}


destroyyy(bullet, target) {
    if (bullet) {
        bullet.destroy(); // Destruye la bala al impactar
        this.activeBullet = null; // Limpia la referencia
    }

    if (target) {
        target.destroy(); // Destruye el objeto si es necesario
    }

    this.BombardiDestroyed.play({volume:0.6});
    
}

destroy(bullet, target) {
    if (bullet) {
        bullet.destroy(); // Destruye la bala al impactar
        this.activeBullet = null; // Limpia la referencia
    }

    if (target) {
        target.destroy(); // Destruye el objeto si es necesario
    }
    this.Points += 100
    console.log("has sumado 100 puntos")
}

destroyy(bullet, target) {
    this.bombardirosKilled += 1;
    console.log(this.bombardirosKilled)
    this.BombardiDestroyed.play();
    if (bullet) {
        bullet.destroy(); // Destruye la bala al impactar
        this.activeBullet = null; // Limpia la referencia
    }

    if (target) {
        target.destroy(); // Destruye el objeto si es necesario
    }
    this.Points += 500;
    console.log("has sumado 500 puntos")
}


rebote(bullet, chimp) {
    console.log("¡Bala impactó en el chimpancé!");
    this.ChimpS.play();
    this.activeBullet.setVelocityY(0);
    this.activeBullet.setBounce(3)
    this.activeBullet.setVelocityX(this.activeBullet.body.velocity.x > 0 ? 800 : -800);
}

moveBombardiro(bombardiro) {
    
    if (!bombardiro.active) return;

    if (bombardiro.x <= this.minX) {
        bombardiro.body.setVelocityX(this.bombardiroSpeed);
        bombardiro.flipX = false 
    } 
    else if (bombardiro.x >= this.maxX) {
        bombardiro.body.setVelocityX(-this.bombardiroSpeed);
        bombardiro.flipX= true 
    }
    if (Phaser.Math.Between(1, 240) <= 1) {
        this.dropGlorbo(bombardiro);
    }
}

dropGlorbo(bombardiro) {
    
    this.drop.play()
    const glorbo = this.glorbos.create(
        bombardiro.x,
        bombardiro.y + 30, // 30 píxeles debajo del bombardiro
        "glorbo"
    ).setScale(0.125);

    // Configura la física del glorbo
    glorbo.body.setVelocityY(200); // Caída hacia abajo
    //glorbo.body.setVelocityX(Phaser.Math.Between(-50, 50)); // Pequeño movimiento horizontal aleatorio
    
    // Destruir el glorbo si sale de la pantalla
    glorbo.body.setCollideWorldBounds(false);
    //glorbo.setDepth(1); // Para que aparezca sobre otros objetos
}

shootBullet() {
    if (this.activeBullet) {
        return; // No disparar si ya hay una bala activa
    }
    this.shot.play();
    // Crear bala en la posición de bondito
    this.activeBullet = this.bullets.create(this.bondito.x, this.bondito.y, "bullet").setScale(0.035);

    // Calcular dirección hacia aim0
    let angle = Phaser.Math.Angle.Between(this.bondito.x, this.bondito.y, this.aim.x, this.aim.y);
    let speed = 700;

    // Establecer velocidad en la dirección calculada
    this.activeBullet.setVelocityX(Math.cos(angle) * speed);
    this.activeBullet.setVelocityY(Math.sin(angle) * speed);
    //this.activeBullet.setBounce(1)
    // Configurar los límites de la pantalla
    this.activeBullet.setCollideWorldBounds(true);
    this.activeBullet.body.onWorldBounds = true;

    // Destruir la bala cuando salga de los límites de la pantalla
    this.physics.world.on("worldbounds", (body) => {
        if (body.gameObject === this.activeBullet) {
            this.activeBullet.destroy();
            this.activeBullet = null; // Permitir disparar otra bala
        }
    });
}
    update() {

        this.pointsText.setText(`Puntos: ${this.Points}`)

    if (!this.firstWaveComplete && this.chimp1.y < -this.chimp1.displayHeight * 2 && this.chimp2.y < -this.chimp2.displayHeight * 2) {
        this.firstWaveComplete = true;
        this.nextChimp = "chimp1"; // Define cuál chimp sale primero después de la primera ola

        // Activar el primer ciclo intercalado
        this.time.delayedCall(2000, () => { 
            this.chimp1.setPosition(this.chimp1.x, this.respawnY);
            this.chimp1.visible = true;
        });
    }

    // Intercalar después de la primera ola
    if (this.firstWaveComplete) {  
        if (this.nextChimp === "chimp1" && this.chimp2.y < -this.chimp2.displayHeight * 2) {
            this.chimp2.visible = false;
            this.time.delayedCall(2000, () => { 
                this.chimp1.setPosition(this.chimp1.x, this.respawnY);
                this.chimp1.visible = true;
                this.nextChimp = "chimp2"; // Define el siguiente turno
            });
        }

        if (this.nextChimp === "chimp2" && this.chimp1.y < -this.chimp1.displayHeight * 2) {
            this.chimp1.visible = false;
            this.time.delayedCall(2000, () => { 
                this.chimp2.setPosition(this.chimp2.x, this.respawnY);
                this.chimp2.visible = true;
                this.nextChimp = "chimp1"; // Define el siguiente turno
            });
        }
    }

        // Movimiento del objetivo con teclado
    const minX = 200;
    const maxX = this.sys.game.config.width - 200;
    const minY = 250;
    const maxY = 500;

    // Movimiento del objetivo con teclado dentro de los límites
    if (this.cursor.right.isDown && this.aim.x + 12 <= maxX) {
        this.aim.x += 12;
    }
    if (this.cursor.left.isDown && this.aim.x - 12 >= minX) {
        this.aim.x -= 12;
    }
    if (this.cursor.down.isDown && this.aim.y + 12 <= maxY) {
        this.aim.y += 12;
    }
    if (this.cursor.up.isDown && this.aim.y - 12 >= minY) {
        this.aim.y -= 12;
    }

    if(this.aim.x > this.sys.game.config.width/2){
        this.bondito.flipX = true
    }else{
        this.bondito.flipX = false
    }


this.bombardiros.getChildren().forEach(bombardiro => {
        this.moveBombardiro(bombardiro);
    });

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.shootBullet(); // Llamar función de disparo
        }

        if(this.tralalerosKilled == 8){
            this.time.delayedCall(1111,()=>{
                console.log(this.tralalerosKilled)
                this.scene.add("GameOver", new GameOver)
                this.scene.start("GameOver");
                this.bgsound.stop();
            })
        }

        if(this.bombardirosKilled == 3){
            this.time.delayedCall(1111,()=>{

                this.scene.add("WinScene", new Win)
                this.scene.start("WinScene")
                this.bgsound.stop();

            })
        }

    }

    updateBoxPositions() {
        const padding = 102;
        const boxY = this.scale.height - 100;
        const boxYmini = (boxY + this.boxWidth * 0.10) - 3;
        const boxXmini = (this.boxWidth + padding) / 2 + 11;
        const tralaH = this.scale.height - 168;

        this.box12.setPosition(padding * 2 + boxXmini * 2 + 27, boxY * 1.8);
        this.box1.setPosition(padding, boxY);
        this.box2.setPosition(this.scale.width - padding, boxY);
        this.box3.setPosition(boxXmini, boxYmini);
        this.box4.setPosition(boxXmini + this.miniboxW, boxYmini);
        this.box5.setPosition(boxXmini + this.miniboxW * 2, boxYmini);
        this.box6.setPosition(boxXmini + this.miniboxW * 3, boxYmini);
        this.box7.setPosition(boxXmini + this.miniboxW * 4, boxYmini);
        this.box8.setPosition(boxXmini + this.miniboxW * 5, boxYmini);
        this.box9.setPosition(boxXmini + this.miniboxW * 6, boxYmini);
        this.box10.setPosition(boxXmini + this.miniboxW * 7, boxYmini);
        this.box11.setPosition(boxXmini + this.miniboxW * 8, boxYmini);

        this.tralalero1.setPosition(boxXmini, tralaH);
        this.tralalero2.setPosition(boxXmini + this.miniboxW, tralaH);
        this.tralalero3.setPosition(boxXmini + this.miniboxW * 2, tralaH);
        this.tralalero4.setPosition(boxXmini + this.miniboxW * 3, tralaH);
        this.tralalero5.setPosition(boxXmini + this.miniboxW * 5, tralaH);
        this.tralalero6.setPosition(boxXmini + this.miniboxW * 6, tralaH);
        this.tralalero7.setPosition(boxXmini + this.miniboxW * 7, tralaH);
        this.tralalero8.setPosition(boxXmini + this.miniboxW * 8, tralaH);

        this.chimp2.flipX = true;
    }
}

export default Nivel2;
