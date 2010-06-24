/**
 * @return Информация о слове в формате JSONP.
 *         Источник: view/list-by-suggest-i
 * 
 * @param callback Название функции для вызова у клиента.
 *        Если не указана, принимается = 'lempher'.
 * 
 * @example http://localhost:5984/lempher/_design/lempher/_list/word-jsonp/list-by-suggest-i?startkey=["садовые"]&endkey=["садовые",{}]&group=true&limit=10
 */
function(head, req)
{
	start( {
        "headers": {
	        "Content-Type": "text/plain"
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
	send(
		( ( req.query && req.query.callback && (req.query.callback !== '') )
			/* 
			 * Сами заботимся о чистоте кода: см. особенности вызова
			 * через jQuery.getJSON() / '=?' (jsonp).
			 */
		    ? req.query.callback.replace(/=/, '')
		    : 'lempher'
		)
	  + '(' + JSON.stringify(r) + ')'
	);

}