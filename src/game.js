class Game extends Phaser.State {

    create() {
        // this.input.onDown.add(this.onInputDown, this);
        this.sidewalk = this.add.tileSprite(0, 550, 1024, 82, 'sidewalk');
        // this.character = this.add.sprite(340, 420, 'character');
        this.character = this.add.sprite(340, 460, 'character');
        this.character.anchor.setTo(0.5, 0.5);
        this.character.scale.setTo(0.3, 0.3);
        this.character.alive = true;
        this.school = this.add.button(140, 680, 'button-school', function() {
            this.setTask('school');
            this.add.tween(this.school.scale).to({ x: [0.25, 0.3], y: [0.35, 0.3] }, 500, Phaser.Easing.Back.Out, true, 0);
        }, this, 0, 0, 0, 0);
        this.school.anchor.setTo(0.5, 0.5);
        // this.school.anchor.setTo(0.5,0.5);
        this.social = this.add.button(320, 680, 'button-social', function() {
            this.setTask('social');
            this.add.tween(this.social.scale).to({ x: [0.25, 0.3], y: [0.35, 0.3] }, 500, Phaser.Easing.Back.Out, true, 0);
        }, this, 0, 0, 0, 0);
        this.social.anchor.setTo(0.5, 0.5);
        this.health = this.add.button(500, 680, 'button-health', function() {
            this.setTask('health');
            this.add.tween(this.health.scale).to({ x: [0.25, 0.3], y: [0.35, 0.3] }, 500, Phaser.Easing.Back.Out, true, 0);
        }, this, 0, 0, 0, 0);
        this.health.anchor.setTo(0.5, 0.5);
        this.school.scale.setTo(0.3, 0.3);
        this.social.scale.setTo(0.3, 0.3);
        this.health.scale.setTo(0.3, 0.3);
        this.challenges = this.game.cache.getJSON('challenge');

        this.character.animations.add('walk', [0, 1, 2, 3, 4, 5], 8, true);
        this.character.animations.add('slouch-fat-walk', [6, 7, 8, 9, 10, 11], 3, true);
        this.character.animations.add('slouch-walk', [12, 13, 14, 15, 16, 17], 3, true);
        this.character.animations.add('fit-walk', [18, 19, 20, 21, 22, 23], 10, true);
        this.character.animations.add('fat-walk', [24, 25, 26, 27, 28, 29], 5, true);
        this.character.animations.add('die', [30, 31, 32, 33, 34, 35, 36], 5, false);

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

        this.TASK = {
            "school": 0,
            "health": 0,
            "social": 0
        }

        this.counter = {
        	"count" : 0,
        	"limit" : 10
        };
        //  Create our Timer
        this.timer = this.game.time.create(false);
        this.timer.loop(1000, this.updateCounter, this);
        this.timer.start();

        //  Create question Timer
        this.question_timer = this.game.time.create(false);
        this.question_timer.loop(1000, this.updateQuestion, this);
        this.question_timer.start();
    }

    updateCounter() {
        this.counter.count++;
    }

    setTask(task) {
        var total = this.TASK.school + this.TASK.health + this.TASK.social
            // console.log(total);
            // console.log(this.TASK[task]);
            // console.log(this.challenges[task].tap);
        if ((100 - total) >= this.challenges[task].tap) {
            this.TASK[task] = this.TASK[task] + this.challenges[task].tap;
        }
        console.log(this.TASK);
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

    	this.sidewalk.tilePosition.x -=2 ;

        // die
        if (    ((this.counter.count) > this.counter.limit) &&
            ((this.TASK.school < this.challenges.school.min || this.TASK.school > this.challenges.school.max) ||
            (this.TASK.health < this.challenges.health.min || this.TASK.health > this.challenges.health.max) ||
            (this.TASK.social < this.challenges.social.min || this.TASK.social > this.challenges.social.max))
        ) {
            if (this.character.alive) {
                this.character.animations.play('die');
                this.character.alive = false;
            }
        }
        // this.character.animations.add('walk', [0, 1, 2, 3, 4, 5], 8, true); done
        // this.character.animations.add('slouch-fat-walk', [6, 7, 8, 9, 10, 11], 3, true); done
        // this.character.animations.add('slouch-walk', [12, 13, 14, 15, 16, 17], 3, true); done
        // this.character.animations.add('fit-walk', [18, 19, 20, 21, 22, 23], 10, true); done
        // this.character.animations.add('fat-walk', [24, 25, 26, 27, 28, 29], 5, true);
        // this.character.animations.add('die', [30, 31, 32, 33, 34, 35, 36], 5, false);
        else if(this.TASK.school > this.challenges.school.max/2 && this.TASK.health < this.challenges.health.max/2) {
            this.character.alive = true;
            this.character.animations.play('slouch-fat-walk');
        }
        else if(this.TASK.school > this.challenges.school.max/2) {
            this.character.alive = true;
            this.character.animations.play('slouch-walk');
        }
        else if(this.TASK.health > this.challenges.health.max/2) {
            this.character.alive = true;
            this.character.animations.play('fit-walk');
        }
        else if(this.TASK.social > this.challenges.social.max/2 && this.TASK.health > this.challenges.health.max/2) {
            this.character.alive = true;
            this.character.animations.play('fit-walk');
        }
        else {
            this.character.alive = true;
            this.character.animations.play('walk');
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

    updateQuestion() {
        this.setText(this.challenge, this.getChallenge(this.challenges, 20));
    }

}

export default Game;
