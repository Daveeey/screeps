var spawnModel = {

    /** @param {Creep} creep **/
    run: function(creepCount) {
        if(creepCount['harvester'] < 4){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], 'Harvester' + Game.time, {memory: {role: 'harvester'}})){
                //console.log('Spawning new Harvester ');
            }
        }
        //else if(creepCount['runner'] < 3){
        //    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Runner' + Game.time, {memory: {role: 'runner', upgrading: false}});
        //    console.log('Spawning new Runner ');
        //
        //}
        else if(creepCount['upgrader'] < 2){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader', upgrading: false}})){
                //console.log('Spawning new Upgrader ');
            }
        }
        else if(creepCount['repairer'] < 2){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Repairer' + Game.time, {memory: {role: 'repairer', repairing: false}})){
                //console.log('Spawning new Repairer ');
            }
        }
        else if(creepCount['builder'] < 2){
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // Only if there is something to build!
                if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Builder' + Game.time, {memory: {role: 'builder', building: false}})){
                    //console.log('Spawning new Builder ');
                }
            }
        }
    }
};

module.exports = spawnModel;