/**
 * @return Информация о слове в формате HTML.
 *         Источник: view/list-by-suggest-i
 * 
 * @example http://localhost:5984/lempher/_design/lempher/_list/word-html/list-by-suggest-i?startkey=["садовые"]&endkey=["садовые",{}]&group=true&limit=10
 */
function(head, req)
{
	start( {
        "headers": {
		    "Content-Type": "text/html"
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

	for (var i = 0; i < nf.length; i++)
	{
		send('<div class="lempher-word-lemma">' + nf[i] + '</div>');
	}

}