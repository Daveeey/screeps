var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if(creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repairing');
        }
        if(!creep.memory.repairing) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(Game.STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < structure.hitsMax / 2;
                }
            });

            //targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleRepair;
