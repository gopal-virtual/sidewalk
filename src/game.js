class Game extends Phaser.State {

    create() {
        this.input.onDown.add(this.onInputDown, this);
        this.character = this.add.sprite(340, 420, 'character');
        this.character.anchor.setTo(0.5, 0.5);
        this.character.scale.setTo(1.7, 1.7);
        this.school = this.add.sprite(50, 600, 'button-school');
        this.social = this.add.sprite(240, 600, 'button-social');
        this.health = this.add.sprite(430, 600, 'button-health');
        this.school.scale.setTo(0.3,0.3);
        this.social.scale.setTo(0.3,0.3);
        this.health.scale.setTo(0.3,0.3);
        this.challenges = this.game.cache.getJSON('challenge');

        this.character.animations.add('walk', [1, 2, 3, 4, 5, 6], 10, false);
        this.character.animations.add('die', [9, 10, 11, 12, 13, 14, 15], 10, false);
        this.character.animations.add('fall', [6, 7, 8], 10, false);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.diary = this.add.graphics(10, 10);
        this.diary.lineStyle(2, 0x000000, 1);
        this.diary.drawRect(0, 0, this.game.width - 10, 300);

        var challenge = this.getChallenge(this.challenges, 20);
        challenge = 'Dear Diary,\n\n' + challenge.health + '\n' + challenge.school + '\n' + challenge.social + '\n\n- Talk soon';
        var style = {
            font: "15px Courier",
            fill: "#000",
            wordWrap: true,
            wordWrapWidth: 600,
        }
        this.challenge = this.game.add.text(20, 20, challenge, style);
    }

    // function create() {
    //     var message = "Glen's Invaders";

    //     var textObject = game.add.bitmapText(game.world.centerX, eighthScreen * 1, 'minecraftia', message, fontHeight);
    //     textObject.x = game.width / 2 - textObject.textWidth / 2;

    //     displayLetterByLetterText(textObject, message, function() {
    //         // stuff you want to do at the end of the animation
    //         // eg. this.input.onDown.addOnce(this.start, this);
    //     });
    // }


    // function displayNextLetter() {

    //     this.textObject.text = this.message.substr(0, this.counter);
    //     this.counter += 1;

    // }

    // function displayLetterByLetterText(textObject, message, onCompleteCallback) {

    //     var timerEvent = game.time.events.repeat(80, message.length, displayNextLetter, { textObject: textObject, message: message, counter: 1 });

    //     timerEvent.timer.onComplete.addOnce(onCompleteCallback, this);

    // }

    update() {

        if (this.cursors.left.isDown) {
            this.character.animations.play('die');
        }
        if (this.cursors.right.isDown) {
            this.character.animations.play('walk');
        }
        if (this.cursors.down.isDown) {
            this.character.animations.play('fall');
        }


    }

    setText(diaryText, challenge) {
        diaryText.text = 'Dear Diary,\n\n' + challenge.health + '\n' + challenge.school + '\n' + challenge.social + '\n\n- Talk soon';
    }

    getChallenge(challenges, level) {
        // init
        var challenge = {}

        // pick challenge
        for (var key in challenges) {
            var length = challenges[key].challenge[level].length;
            challenge[key] = challenges[key].challenge[level][Math.floor(Math.random() * length)];
        }

        // return current challenge
        console.log(challenge);
        return challenge;
    }

    onInputDown() {
        this.setText(this.challenge, this.getChallenge(this.challenges, 20));
    }

}

export default Game;
