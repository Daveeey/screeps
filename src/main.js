var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleRunner = require('role.runner');

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
            if(creepCount['runner'] > 0){
                roleHarvester.run(creep, true);
            } else {
                roleHarvester.run(creep);
            }
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

    // Room Defense Basic
        var hostiles = Game.rooms['W74N21'].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            var towers = Game.rooms['W74N21'].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
            Game.notify('User ' +  username + ' spotted and engaged!');
        }

};
