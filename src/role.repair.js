var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if(creep.carry.energy == 0 && !creep.memory.harvesting) {
            creep.memory.repairing = false;
            creep.memory.harvesting = true;
            creep.say('harvest');
        }

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.memory.harvesting = false;
            creep.say('repairing');
        }
        // if(!creep.memory.repairing) {
        //     var source = creep.pos.findClosestByPath(FIND_SOURCES);
        //     console.log(source);
        //     if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        //         console.log('Moving to source');
        //     }
        // }
         if(!creep.memory.repairing) {
             var source = creep.room.find(FIND_SOURCES);
             if(creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(source[0], {visualizePathStyle: {stroke: '#ffaa00'}});
             }
         }
        else {
             var targets = creep.room.find(Game.STRUCTURES, {
                 filter: function(structure) {
                     return structure.hits < structure.hitsMax;
                 }
             });

            if(targets.length > 0) {
                console.log('found targets');
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    console.log('Moving to target' + targets[0]);
                    creep.moveTo(targets[0]);
                }
            } else {
                console.log('No Targets');
                console.log(targets);
            }
        }
    }
};

module.exports = roleRepair;
