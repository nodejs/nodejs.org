'use strict';

var fs = require('fs');
var path = require('path');

var dir = './vulnerability/';

fs.readdirSync(dir).forEach(function (file) {

	if (path.extname(file) !== '.md') { return; }
	var content = fs.readFileSync(dir + file, {encoding: 'utf8'});

    content = content.replace(/date: (.*)/m, function(match, p1, offset, string) {
        // console.log(p1);
        // console.log('date: ' + (new Date(p1)).toISOString());
        return 'date: ' + (new Date(p1)).toISOString();
    });

	// content = content.split(/\n\n/);

	// var metadata = content.shift(0);
	// metadata = '---\n' + metadata + '\n---\n\n';

	// var newContent = metadata + content.join('\n\n');
	fs.writeFileSync(dir + file, content);
});
