/*jshint node:true*/

'use strict';

var fs = require('fs');
var csv = require('dsv').csv;

var hash = csv.parse(fs.readFileSync(process.argv[2], {
		encoding: 'utf8'
	}), function(d) {
	return {
		code: d.ID,
		name: d['Cantón'],
		tonsPerMonth: d['Total toneladas de residuos por mes'],
		tonsRecoverablePerMonth: d['Toneladas de residuos valorizables por mes'],
		percentageRecovarablePerMonth: d['Porcentaje de valorizables del total'],
		separateAtCollection: d['Recoge residuos por separado en casas (total o parcialmente en el cantón)'].toLowerCase(),
		recyclingProgram: d['Tiene programas de reciclaje al menos 1 vez al mes'].toLowerCase(),
		percentLocationsSeparate: d['Porcentaje de hogares que separan'],
		notes: d.Notas
	};

}).reduce(function(hash, row) {
	hash[row.code] = row;
	delete row.code;

	return hash;
}, {});

console.log(JSON.stringify(hash, null, '\t'));
