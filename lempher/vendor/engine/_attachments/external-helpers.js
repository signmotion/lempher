/**
 * Декларирует функции для вывода данных в поток в формате CouchDB.
 * Функции оптимизированы для работы с Rhino.
 * 
 * @see http://mozilla.org/rhino/
 */


/* @require */
if (typeof JSON === 'undefined')
{
    eval(readUrl('http://localhost:5984/_utils/script/json2.js'));
}


/**
 * Как загружать скрипт по URL синхронно? Так:
 *     eval( readUrl(url, charset) );
 * 
 *     @param url Адрес js-блока.
 *     @param charset Ожидаемая кодировка потока.
 * 
 * Конструкция полезна, когда в скрипте требуется дождаться получения
 * данных. Стандартный метод load() загружает js-блоки по URL
 * асинхронно, если выбран даже минимальный порог оптимизации.
 * 
 * @see http://www.mozilla.org/rhino/opt.html
 */



/**
 * Вывод в поток.
 * Работа скрипта завершается.
 */
function p(r)
{
    print( JSON.stringify( {
        headers: {
            "Content-Type": "text/html"
          , "Accept-Charset": "utf-8"
          , "X-My-Own-Header": "Lempher"
        }
      , body: (r ? ((typeof r === 'string') ? r : JSON.stringify(r)) : '')
    } ) );
    quit();
}
