var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleRunner = require('role.runner');

var spawnModel = require('spawns');



module.exports.loop = function () {
    var creepCount = new Array();
	creepCount['harvester'] = 0;
	creepCount['upgrader'] = 0;
	creepCount['builder'] = 0;
    creepCount['repairer'] = 0;
    creepCount['runner'] = 0;
	
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // Clear memory
        } else {
			var creep = Game.creeps[name];
			creepCount[creep.memory.role]++;
		}
    }


    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'runner') {
            roleRunner.run(creep);
        }

    }
    
    if(!Game.spawns['Spawn1'].spawning){
        spawnModel.run(creepCount);
    }

    // Room Defense Basic
    //     var hostiles = Game.rooms['E33N41'].find(FIND_HOSTILE_CREEPS);
    //     if(hostiles.length > 0) {
    //         var username = hostiles[0].owner.username;
    //         var towers = Game.rooms['E33N41'].find(
    //             FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    //         towers.forEach(tower => tower.attack(hostiles[0]));
    //         Game.notify('User ' +  username + ' spotted and engaged!');
    //     }
};
