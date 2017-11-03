var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

module.exports.loop = function () {
    var creepCount = new Array();
	creepCount['harvester'] = 0;
	creepCount['upgrader'] = 0;
	creepCount['builder'] = 0;
    creepCount['repair'] = 0;
	
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
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
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }
    
    if(Game.spawns['Spawn1'].energy === Game.spawns['Spawn1'].energyCapacity && !Game.spawns['Spawn1'].spawning){
        // We can build a new unit - we decide based on priority
        // if(creepCount['repair'] < 1){
        //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Repair' + Game.time, {memory: {role: 'repair'}});
        //     console.log('Created new Repairer ');
        //
        // }
        if(creepCount['harvester'] < 4){
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Harvester' + Game.time, {memory: {role: 'harvester'}});
            console.log('Created new Harvester ');
           
        }
        else if(creepCount['upgrader'] < 2){
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader', upgrading: false}});
            console.log('Created new Builder ');
           
        }
        else if(creepCount['builder'] < 4){
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Builder' + Game.time, {memory: {role: 'builder'}});
            console.log('Created new Upgrader ');
            
        }
    }
    
}
