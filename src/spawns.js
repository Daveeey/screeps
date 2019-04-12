var spawnModel = {

    /** @param {Creep} creep **/
    run: function(creepCount, creeo) {
        if(creepCount['harvester'] < 2){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'Harvester' + Game.time, {memory: {role: 'harvester'}})){
                //console.log('Spawning new Harvester ');
            }
        }
        //else if(creepCount['runner'] < 3){
        //    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Runner' + Game.time, {memory: {role: 'runner', upgrading: false}});
        //    console.log('Spawning new Runner ');
        //
        //}
        else if(creepCount['upgrader'] < 1){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader', upgrading: false}})){
                //console.log('Spawning new Upgrader ');
            }
        }
        else if(creepCount['builder'] < 2){
            const targets = Game.rooms['W9N28'].find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // Only if there is something to build!
                if(Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'Builder' + Game.time, {memory: {role: 'builder', building: false}})){
                    //console.log('Spawning new Builder ');
                }
            }
        }
         else if(creepCount['repairer'] < 1){
             if(Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], 'Repairer' + Game.time, {memory: {role: 'repairer', repairing: false}})){
                 //console.log('Spawning new Repairer ');
             }
         }
    }
};

module.exports = spawnModel;