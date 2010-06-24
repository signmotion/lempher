/**
 * @return Информация о слове в формате JSON.
 *         Источник: view/list-by-suggest-i
 * 
 * @example http://localhost:5984/lempher/_design/lempher/_list/word-json/list-by-suggest-i?startkey=["садовые"]&endkey=["садовые",{}]&group=true&limit=10
 */
function(head, req)
{
	start( {
        "headers": {
	        "Content-Type": "application/json"
	      , "Accept-Charset": "utf-8"
		  , "X-My-Own-Header": "Lempher"
		}
	} );

	var nf = [];
	while (row = getRow())
	{
		if ( row.key )
		{
		    nf.push(row.key[1]);
		}
	}
	nf.sort();

	var r = {
	    lemma: nf
	};
	send( JSON.stringify(r) );

}