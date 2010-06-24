/**
 * Нормализует текст, стоящий в очереди
 * dq (сокр. от desire queue).
 * Результат возвращается в очередь
 * fq (сокр. от fulfilment queue).
 * в формате HTML.
 * 
 * @call lowlevel /usr/bin/rhino -opt 0 /home/dalion/workspace/www/lempher-com/www/lempher/_attachments/external/text-html.js
 * 
 * @param string text
 */

eval(readUrl('http://localhost:5984/lempher/_design/lempher/vendor/engine/external-helpers.js'));

/* - Для SpiderMonkey.
eval('var req = ' + readline());
if ( !req.query || !req.query.text )
{
	p();
}
*/

/* - Rhino упорно не желает принимать параметры от CouchDB.
 * Решено работать через очередь желаний/исполнений.
 * 
p(arguments);
*/


p("req");

/*
 * Embed EnvJS engine.
 * @see http://www.envjs.com/doc/apis
 */
eval(readUrl('http://localhost:5984/lempher/_design/lempher/vendor/engine/env.rhino.js'));
Envjs( {
    appName: "Lempher"
  , scriptTypes: {
        '': true
      , 'text/javascript': true
    }
  , os_name: "Debian"
  , os_arch: "VDS server"
  , os_version: "Lempher 0.01"
  , lang: "ru"
  , platform: "CouchDB, Rhino"
} );

eval(readUrl('http://localhost:5984/_utils/script/couch.js'));
eval(readUrl('http://localhost:5984/_utils/script/jquery.js'));
eval(readUrl('http://localhost:5984/_utils/script/sha1.js'));
//eval(readUrl('http://localhost:5984/_utils/script/json2.js')); - Загружается в external-helpers.js
eval(readUrl('http://localhost:5984/_utils/script/jquery.js'));
eval(readUrl('http://localhost:5984/_utils/script/jquery.couch.js'));
eval(readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.couch.app.js'));
eval(readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.couch.app.util.js'));
eval(readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.mustache.js'));
eval(readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.evently.js'));

//p("Тест. Test. 123");


window.location = 'http://localhost:5984/';

var db = new CouchDB("t", { "X-Couch-Full-Commit": "false" } );
var response;
response = db.info();
//p('Информация о базе: ' + JSON.stringify(response));


var req = '<div class="lempher-text-analyze">' + t + '</div>';

t = t.split(' ');

var tf = [];
for (var i = 0; i < t.length; i++)
{
	if (t[i].length < 3)
	{
		tf.push( [t[i]] );
		continue;
	}
	
	var w = t[i].toLowerCase();
    
    //var db = new CouchDB("t", { "X-Couch-Full-Commit": "false" } );
    //var n = CouchDB.request("GET", "/_all_dbs");
    //var x = CouchDB.login('dalion', 'visor888');
    /*
    var x = CouchDB.request(
    	'GET'
      , 'http://localhost:5984/lempher/_design/lempher/_list/word-json/list-by-suggest-i'
          + '?startkey=["' + w + '"]'
          + '&endkey=["' + w + '",{}]'
          + '&group=true'
          + '&limit=10'
    );
    */
    //var x = CouchDB.request("GET", "../../../../../_config");
    //var config = JSON.parse(x.responseText);
    p(1);


    var nf = [1,2];
	/*
	while (row = getRow())
	{
	    var nf = [];
		if ( row.key && (row.key[0] === t[i]) )
		{
			nf.push(row.key[1]);
		}
	}
	*/
	if (nf.length > 0)
	{
		nf.sort();
		tf.push(nf);
	}
	else
	{
		tf.push( ['-' + t[i]] );
	}

} /* for (var i = 0; i < t.length; i++) */

for (var i = 0; i < tf.length; i++)
{
	req += ('<div class="lempher-text-lemma">' + tf[i].join(', ') + '</div>');
}


p(req);
