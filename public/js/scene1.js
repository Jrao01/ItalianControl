class Nivel1 extends Phaser.Scene {
    constructor(){
        super({key:"Nivel1"});
        this.boxWidth = 0;
        this.landscapeWidth = 0;
        this.miniboxW = 0;
        this.chimpSpeed = -150; // Velocidad hacia arriba
        this.respawnY = this.scale?.height - 10 || 800; // Posición de reaparecer
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
    }

    create() {
        this.bullets = this.physics.add.group();

    // Detectar la tecla espacio
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Fondo centrado
        this.land = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,"land");
        this.box12 = this.add.image(0, 0, "box").setScale(2.187);

        // Personaje centrado en la parte inferior
        this.bondito = this.add.image(this.scale.width / 2 - 15, this.scale.height - 200, "bondito").setScale(0.5);

        // Crear chimpancés con física
        this.chimp1 = this.physics.add.image(102, this.respawnY, "chimpanzini").setScale(0.9);
        this.chimp2 = this.physics.add.image(this.scale.width - 102, this.respawnY, "chimpanzini").setScale(0.9);
        this.chimp2.flipX = true; // Voltear chimp2
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

        this.tralalero1 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero2 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero3 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero4 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero5 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero6 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero7 = this.add.image(0, 0, "tralalero").setScale(.3);
        this.tralalero8 = this.add.image(0, 0, "tralalero").setScale(.3);

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

        // Ajusta las posiciones iniciales
        this.updateBoxPositions();
        this.physics.add.collider(this.bullets,this.chimp1,this.rebote,null,this)
        this.physics.add.collider(this.bullets,this.chimp2,this.rebote,null,this)

        // Configuración de controles
        this.cursor = this.input.keyboard.createCursorKeys();
        console.log(this.cursor);
        console.log("soy create");
    }

rebote(bullet, chimp) {
    console.log("¡Bala impactó en el chimpancé!");

    this.activeBullet.setVelocityY(0);
    this.activeBullet.setBounce(3)
    this.activeBullet.setVelocityX(this.activeBullet.body.velocity.x > 0 ? 800 : -800);
}

shootBullet() {
    if (this.activeBullet) {
        return; // No disparar si ya hay una bala activa
    }

    // Crear bala en la posición de bondito
    this.activeBullet = this.bullets.create(this.bondito.x, this.bondito.y, "bullet").setScale(0.05);

    // Calcular dirección hacia aim0
    let angle = Phaser.Math.Angle.Between(this.bondito.x, this.bondito.y, this.aim.x, this.aim.y);
    let speed = 500;

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
        console.log("Chimp1:", this.chimp1.x, this.chimp1.y, this.chimp1.visible);
        console.log("Chimp2:", this.chimp2.x, this.chimp2.y, this.chimp2.visible);


        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.shootBullet(); // Llamar función de disparo
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

export default Nivel1;
