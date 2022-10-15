function createEffect(duration, template) {
    var e = new Effect(duration);
    // Fill in all keys
    template = typeof template === 'undefined' ? {} : template;
    var keys = Object.keys(template);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        e[key] = template[key];
    }
    return e;
}


var effects = {};


effects.slow = {
    // Display
    color: [0, 191, 255],
    // Misc
    name: 'slow',
    // Methods
    onEnd: function(e) {
        e.speed = this.oldSpeed;
    },
    onStart: function(e) {
        this.oldSpeed = e.speed;
        this.speed = e.speed / 2;
        e.speed = this.speed;
    }
};

effects.poison = {
    // Display
    color: [127, 255, 0],
    // Misc
    name: 'poison',
    // Methods
    onTick: function(e) {
        e.dealDamage(1, 'poison');
    }
};

effects.regen = {
    // Display
    color: [0, 100, 0],
    // Misc
    name: 'regen',
    // Methods
    onTick: function(e) {
        if (e.health < e.maxHealth && random() < 0.2) e.health++;
    }
};
