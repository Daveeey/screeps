var spawnModel = {

    /** @param {Creep} creep **/
    run: function(creepCount, creeo) {
        if(creepCount['harvester'] < 2 && Game.rooms['W19N45'].energyAvailable >= 300){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Harvester' + Game.time, {memory: {role: 'harvester'}})){
                console.log('Spawning new Harvester ');
            }
        }
        else if(creepCount['upgrader'] < 2 && Game.rooms['W19N45'].energyAvailable >= 300){
            if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader', upgrading: false}})){
                console.log('Spawning new Upgrader ');
            }
        }
        else if(creepCount['runner'] < 1 && Game.rooms['W19N45'].energyAvailable >= 300){
             Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Runner' + Game.time, {memory: {role: 'runner', upgrading: false}});
             console.log('Spawning new Runner ');

         }
        else if(creepCount['builder'] < 1 && Game.rooms['W19N45'].energyAvailable >= 300){
            const targets = Game.rooms['W19N45'].find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // Only if there is something to build!
                if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], 'Builder' + Game.time, {memory: {role: 'builder', building: false}})){
                    console.log('Spawning new Builder ');
                }
            }
        }
          else if(creepCount['repairer'] < 1 && Game.rooms['W19N45'].energyAvailable >= 300){
              if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Repairer' + Game.time, {memory: {role: 'repairer', repairing: false}})){
                  console.log('Spawning new Repairer ');
              }
          }
    }
};

module.exports = spawnModel;