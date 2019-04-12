var spawnModel = {

    /** @param {Creep} creep **/
    run: function(creepCount, creeo) {
        if(creepCount['harvester'] < 2 && Game.room.energyAvailable >= 300){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'Harvester' + Game.time, {memory: {role: 'harvester'}})){
                console.log('Spawning new Harvester ');
            }
        }
        else if(creepCount['runner'] < 1 && Game.room.energyAvailable >= 300){
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE], 'Runner' + Game.time, {memory: {role: 'runner', upgrading: false}});
            console.log('Spawning new Runner ');

        }
        else if(creepCount['upgrader'] < 1 && Game.room.energyAvailable >= 300){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader', upgrading: false}})){
                console.log('Spawning new Upgrader ');
            }
        }
        else if(creepCount['builder'] < 2 && Game.room.energyAvailable >= 300){
            const targets = Game.rooms['W9N28'].find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // Only if there is something to build!
                if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'Builder' + Game.time, {memory: {role: 'builder', building: false}})){
                    console.log('Spawning new Builder ');
                }
            }
        }
         // else if(creepCount['repairer'] < 1){
         //     if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Repairer' + Game.time, {memory: {role: 'repairer', repairing: false}})){
         //         console.log('Spawning new Repairer ');
         //     }
         // }
    }
};

module.exports = spawnModel; 