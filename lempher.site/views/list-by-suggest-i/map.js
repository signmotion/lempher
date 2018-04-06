/**
 * Все словоформы.
 * На сегодня понимаем только существительные и прилагательные.
 * Если в слове встречается буква 'ё', отдаёт в поток дополнительный
 * вариант слова, где 'ё' заменена на 'е'. 
 */
function(doc)
{
	if (   !doc.ps
		|| ( (doc.ps !== 'adjective') && (doc.ps !== 'noun') ) )
	{
		return;
	}
	
	var f = function(word)
	{
		var w = word.toLowerCase();
		var m = w.replace(/ё/g, 'е');
		if (w !== m)
		{
			emit([w, doc._id], null);
		}
		return m;
	};

	/* Ед. число */
	emit([f(doc._id), doc._id], null);
	for (var i = 0; i < doc.singular.length; i++)
	{
	    emit([f(doc.singular[i]), doc._id], null);
	}

	/* Мн. число */
	emit([f(doc.idPlural), doc._id], null);
	for (var i = 0; i < doc.plural.length; i++)
	{
	    emit([f(doc.plural[i]), doc._id], null);
	}

};
