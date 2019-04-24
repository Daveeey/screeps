var roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep, targetContainers = true) {
    if (creep.memory.distributing && creep.carry.energy == 0) {
      creep.memory.distributing = false;
      creep.say('harvest');
    }

    if (!creep.memory.distributing && creep.carry.energy == creep.carryCapacity) {
      creep.memory.distributing = true;
      creep.say('distribute');
    }

    if (!creep.memory.distributing) {
      var sources = creep.room.find(FIND_SOURCES);

      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    } else {
      if (targetContainers) {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: structure => {
            return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
          }
        });

        if (targets.length > 0) {
          creep.say('Put Target');

          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: {
                stroke: '#ffffff'
              }
            });
          }
        } else {
          // If can store somewhere otherwise upgrade controller
          if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            creep.say('Dist. Spawn');

            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(Game.spawns['Spawn1']);
            }
          } else {
            creep.say('Upgrade');

            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
            }
          }
        }
      } else {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: structure => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
          }
        });

        if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: {
                stroke: '#ffffff'
              }
            });
          }
        } else {
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
            }
          });

          if (targets.length > 0) {
            creep.say('Put Target');

            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], {
                visualizePathStyle: {
                  stroke: '#ffffff'
                }
              });
            }
          } else {
            creep.say('Upgrading');

            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
            }
          }
        }
      }
    }
  }
};
module.exports = roleHarvester;

//# sourceMappingURL=role.harvester-compiled.js.map