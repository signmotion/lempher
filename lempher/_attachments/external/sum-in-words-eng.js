/**
 * @todo ! Проверить работу. Расширить до понимания отрицательных чисел.
 * 
 * @return Сумма прописью.
 * 
 * @source http://andrew-hoyer.com/experiments/numbers
 * 
 * @example http://localhost:5984/lempher/_design/lempher/_show/sum-in-words-eng/123456789
 */

eval('var req = ' + readline());
if ( !req.query || !req.query.value )
{
	p();
}

var d = (
     req.query.value
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/, '')
) * 1;

if ( isNaN(d) || (d % 1) || ((d === 0) && (req.query.value != d)) )
{
	p(d);
}

p( f(d) );




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



function f(d)
{
	var names = [{"0":"zero","1":"one","2":"two","3":"three","4":"four","5":"five","6":"six","7":"seven","8":"eight","9":"nine" },{"0":"ten","1":"eleven","2":"twelve","3":"thirteen","4":"fourteen","5":"fifteen","6":"sixteen","7":"seventeen","8":"eighteen","9":"nineteen"},{"2":"twenty","3":"thirty","4":"forty","5":"fifty","6":"sixty","7":"seventy","8":"eighty","9":"ninety"},["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion","undecillion","duodecillion","tredecillion"]];
	var to_words = function(s, n) {
		var ns = s.slice(0, 3);
		return (ns.length < 1)?"":to_words(s.slice(3,s.length),n+1)+((ns.length>1)?((ns.length==3&&ns[2]!="0")?names[0][ns[2]]+" hundred "+((ns[1]=="1")?names[1][ns[0]]+" ":(ns[1]!="0")?names[2][ns[1]]+" "+((ns[0]!="0")?names[0][ns[0]]+" ":""):(ns[0]!="0"?names[0][ns[0]]+" ":"")):((ns[1]=="1")?names[1][ns[0]]+" ":(ns[1]!="0")?names[2][ns[1]]+" "+((ns[0]!="0")?names[0][ns[0]]+" ":""):(ns[0]!="0"?names[0][ns[0]]+" ":""))) + (((ns.length==3&&(ns[0]!="0"||ns[1]!="0"||ns[2]!="0"))||(ns.length==2&&(ns[0]!="0"||ns[1]!="0"))||(ns.length==1&&ns[0]!="0"))?"<span class='magnitude'>"+names[3][n]+"</span> ":""):((ns.length==1&&ns[0]!="0")?names[0][ns[0]]+" ":"") + (((ns.length==3&&(ns[0]!="0"||ns[1]!="0"||ns[2]!="0"))||(ns.length==2&&(ns[0]!="0"||ns[1]!="0"))||(ns.length==1&&ns[0]!="0"))?"<span class='magnitude'>"+names[3][n]+"</span> ":""));
	};

	return to_words(
        (d + '')
        .replace(/^\s+|\s+$/, '')
        .split("")
        .reverse()
      , 0
	);
}
