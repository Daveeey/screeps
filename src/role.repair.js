var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repair');
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
             if(creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(source[1], {visualizePathStyle: {stroke: '#ffaa00'}});
             }
         }
        else {
             const targets = creep.room.find(FIND_STRUCTURES, {
                 filter: object => object.hits < object.hitsMax
             });

             targets.sort((a,b) => a.hits - b.hits);

             if(targets.length > 0) {
                 if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(targets[0]);
                 }
             }
        }
    }
};

module.exports = roleRepair;
