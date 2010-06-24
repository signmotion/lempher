/*
 * Embed EnvJS engine.
 * @see http://www.envjs.com/doc/apis
 * 
 * @todo optimize Компилировать включаемые в модуль скрипты
 *       (и сам скрипт?) и подключать их через loadClass().
 *       https://developer.mozilla.org/en/Rhino_Shell
 */

/* - Not loaded this. Don't wait JS - run and error on fast compiler...
load('http://localhost:5984/lempher/_design/lempher/vendor/engine/env.rhino.js')
*/
eval( readUrl('http://localhost:5984/lempher/_design/lempher/vendor/engine/env.rhino.js', 'UTF-8') );
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


/**
 * Работа с веб-страницами.
 */
/*
console.log('Request jQuery library...');
load('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
console.log('Request jQuery library - OK');

url = 'http://yandex.ru/';
console.log('Loading %s...', url);
window.location = url;
console.log('Loading %s - OK', document.location);

console.log('\n\n');
console.log('Заголовок: %s', document.title);
console.log('\n\n');
console.log( $('body').text() );
*/



/**
 * Работа с CouchDB.
 */
eval( readUrl('http://localhost:5984/_utils/script/couch.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/_utils/script/jquery.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/_utils/script/sha1.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/_utils/script/json2.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/_utils/script/jquery.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/_utils/script/jquery.couch.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.couch.app.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.couch.app.util.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.mustache.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/lempher/_design/lempher/vendor/couchapp/jquery.evently.js', 'UTF-8') );
eval( readUrl('http://localhost:5984/lempher/_design/lempher/vendor/engine/print-with-header.js', 'UTF-8') );


//p("Строка-тест. String-test. 12345");

window.location = 'http://localhost:5984/';

var db = new CouchDB("t", { "X-Couch-Full-Commit": "false" } );
var response;
response = db.info();
p('Информация о базе: ' + JSON.stringify(response));
