function createEnemy(x, y, template) {
    var e = new Enemy(x, y);
    // Fill in all keys
    template = typeof template === 'undefined' ? {} : template;
    var keys = Object.keys(template);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        e[key] = template[key];
    }
    e.onCreate();
    return e;
}


var enemy = {};


enemy.weak = {
    // Display
    color: [169, 169, 169],
    // Misc
    name: 'weak',
    // Stats
    cash: 1,
    health: 50,
    speed: 2,
};

enemy.strong = {
    // Display
    color: [100, 149, 237],
    radius: 0.6,
    // Misc
    name: 'strong',
    // Stats
    cash: 2,
    health: 90,
    speed: 2,
};

enemy.fast = {
    // Display
    color: [255, 215, 0],
    // Misc
    name: 'fast',
    // Stats
    cash: 2,
    health: 90,
    speed: 4,
    // Methods
    draw: function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());

        stroke(0);
		fill(this.getColor());
        var back = -0.55 * ts / 3;
        var front = back + 0.55 * ts;
        var side = 0.8 * ts / 2;
        quad(back, -side, 0, 0, back, side, front, 0);
        
        pop();
    }
};

enemy.strongFast = {
    // Display
    color: [216, 187, 120],
    // Misc
    name: 'strongFast',
    // Stats
    cash: 4,
    health: 150,
    speed: 4,
    // Methods
    draw: function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        
        stroke(0);
		fill(this.getColor());
        var back = -0.8 * ts / 3;
        var front = back + 0.8 * ts;
        var side = ts / 2;
        quad(back, -side, 0, 0, back, side, front, 0);
        
        pop();
    }
};

enemy.medic = {
    // Display
    color: [53, 182, 62],
    radius: 0.7,
    // Misc
    name: 'medic',
    // Stats
    cash: 4,
    health: 390,
    speed: 3,
    immune: ['regen'],
    // Methods
    onTick: function() {
        var affected = getInRange(this.pos.x, this.pos.y, 2, enemies);
        for (var i = 0; i < affected.length; i++) {
            affected[i].applyEffect('regen', 1);
        }
    }
};

enemy.stronger = {
    // Display
    color: [73, 202, 128],
    radius: 0.8,
    // Misc
    name: 'stronger',
    // Stats
    cash: 3,
    health: 390,
    speed: 3,
};

enemy.faster = {
    // Display
    color: [241, 253, 28],
    // Misc
    name: 'faster',
    // Stats
    cash: 3,
    health: 390,
    resistant: ['explosion'],
    speed: 3,
    // Methods
    draw: function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());

        stroke(0);
		fill(this.getColor());
        var back = -0.7 * ts / 3;
        var front = back + 0.7 * ts;
        var side = 0.9 * ts / 2;
        quad(back, -side, 0, 0, back, side, front, 0);
        
        pop();
    }
};

enemy.tank = {
    // Display
    color: [75, 83, 32],
    radius: 1,
    // Misc
    name: 'tank',
    // Stats
    cash: 9,
    health: 1015,
    speed: 3,
    immune: ['poison', 'slow'],
    resistant: ['physical'],
    weak: ['explosion', 'piercing', 'death'],
    // Methods
    draw: function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        
        stroke(0);
        fill(this.getColor());
        var front = this.radius * ts / 2;
        var side = 0.7 * ts / 2;
        var barrel = 0.15 * ts / 2;
        var length = 0.7 * ts;
        var curve = 0.2 * ts;
        rect(-front, -side, front * 2, side * 2, curve);
        fill(149, 165, 166);
        rect(0, -barrel, length, barrel * 2);
        ellipse(0, 0, 0.2 * ts * 2, 0.2 * ts * 2);

        pop();
    }
};

enemy.taunt = {
    // Display
    color: [144, 7, 253],
    radius: 0.8,
    // Misc
    name: 'taunt',
    sound: 'taunt',
    // Stats
    cash: 7,
    health: 1515,
    speed: 3,
    immune: ['poison', 'slow'],
    resistant: ['physical'],
    taunt: true,
    // Methods
    draw: function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        
        stroke(0);
        fill(this.getColor());
        var edge = this.radius * ts / 2;
        rect(-edge, -edge, this.radius * ts, this.radius * ts);
        stroke(232, 126, 4);
        noFill();
        rect(-0.3 * ts, -0.3 * ts, 0.6 * ts, 0.6 * ts);
        rect(-0.2 * ts, -0.2 * ts, 0.4 * ts, 0.4 * ts);

        pop();
    }
};

enemy.spawner = {
    // Display
    color: [144, 7, 253],
    radius: 0.7,
    // Misc
    name: 'spawner',
    // Stats
    cash: 9,
    health: 1015,
    // Methods
    onKilled: function() {
        if (this.alive) {
            cash += this.cash;
            this.kill();
            if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
                sounds[this.sound].play();
            }
            
            // Add new temporary spawnpoint
            var c = gridPos(this.pos.x, this.pos.y);
            if (c.equals(exit)) return;
            for (var i = 0; i < tempSpawns.length; i++) {
                if (c.equals(tempSpawns[i][0])) return;
            }
            tempSpawns.push([createVector(c.x, c.y), tempSpawnCount]);
        }
    }
};
