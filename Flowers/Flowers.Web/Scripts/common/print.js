// strPrintName 打印任务名
// printDatagrid 要打印的datagrid

var tableString = "";
function CreateFormPage(ptitle,strPrintName, printDatagrid) {






    tableString = ' <h1 style="text-align:center">' + ptitle + '</h1> <table cellspacing="0" class="pb" width="100%">';
    var frozenColumns = printDatagrid.datagrid("options").frozenColumns;  // 得到frozenColumns对象
    var columns = printDatagrid.datagrid("options").columns;    // 得到columns对象
    var nameList = '';

    // 载入title
    if (typeof columns != 'undefined' && columns != '') {
        $(columns).each(function (index) {
            tableString += '\n<tr>';
            if (typeof frozenColumns != 'undefined' && typeof frozenColumns[index] != 'undefined') {
                for (var i = 0; i < frozenColumns[index].length; ++i) {
                    if (!frozenColumns[index][i].hidden) {
                        tableString += '\n<th width="' + frozenColumns[index][i].width + '"';
                        if (typeof frozenColumns[index][i].rowspan != 'undefined' && frozenColumns[index][i].rowspan > 1) {
                            tableString += ' rowspan="' + frozenColumns[index][i].rowspan + '"';
                        }
                        if (typeof frozenColumns[index][i].colspan != 'undefined' && frozenColumns[index][i].colspan > 1) {
                            tableString += ' colspan="' + frozenColumns[index][i].colspan + '"';
                        }
                        if (typeof frozenColumns[index][i].field != 'undefined' && frozenColumns[index][i].field != '') {
                            nameList += ',{"f":"' + frozenColumns[index][i].field + '", "a":"' + frozenColumns[index][i].align + '"}';
                        }
                        tableString += '>' + frozenColumns[0][i].title + '</th>';
                    }
                }
            }
            for (var i = 0; i < columns[index].length; ++i) {
                if (!columns[index][i].hidden) {
                    tableString += '\n<th width="' + columns[index][i].width + '"';
                    if (typeof columns[index][i].rowspan != 'undefined' && columns[index][i].rowspan > 1) {
                        tableString += ' rowspan="' + columns[index][i].rowspan + '"';
                    }
                    if (typeof columns[index][i].colspan != 'undefined' && columns[index][i].colspan > 1) {
                        tableString += ' colspan="' + columns[index][i].colspan + '"';
                    }
                    if (typeof columns[index][i].field != 'undefined' && columns[index][i].field != '') {

                      
                        nameList += ',{"f":"' + columns[index][i].field + '", "a":"' + columns[index][i].align + '"}';
                    }
                    tableString += '>' + columns[index][i].title + '</th>';
                }
            }
            tableString += '\n</tr>';
        });
    }

    // 载入内容
    var rows = printDatagrid.datagrid("getRows"); // 这段代码是获取当前页的所有行

    var nl = eval('([' + nameList.substring(1) + '])');


    
    for (var i = 0; i < rows.length; ++i) {
        tableString += '\n<tr>';
        $(nl).each(function (j) {
            var e = nl[j].f.lastIndexOf('_0');

            tableString += '\n<td';
            if (nl[j].a != 'undefined' && nl[j].a != '') {
                tableString += ' style="text-align:' + nl[j].a + ';"';
            }
            tableString += '>';
            if (e + 2 == nl[j].f.length) {
               tableString += rows[i][nl[j].f.substring(0, e)];


            }
            else {

                var dateFlied = formatTime(rows[i][nl[j].f]);
                if (dateFlied!=null) {
                    tableString += dateFlied;
                }
             
            }
            tableString += '</td>';

        });
        tableString += '\n</tr>';
    }
    tableString += '\n</table>';
    tableString+='<style type="text/css"> body{background:white;margin:0px;padding:0px;font-size:13px;text-align:left;}.pb{font-size:13px;border-collapse:collapse;}.pb th{font-weight:bold;text-align:center;border:1px solid #333333;padding:2px;}.pb td{border:1px solid #333333;padding:2px;}</style>';
    window.showModalDialog("/print.htm", tableString, "location:No;status:No;help:No;dialogWidth:1200px;dialogHeight:800px;scroll:auto;");

}


function formatTime(val) {
    var result = "";
    var sear = new RegExp('Date');
  
    if (sear.test(val)) {
      
        var strDate = val.toString();
        strDate = strDate.replace("/Date(", "");
        strDate = strDate.replace(")/", "");
        var tt = new Date(parseInt(strDate)).toLocaleString();
     
        if (tt == "Invalid Date") {
            tt = "";
        }
        result = tt;

    }
    else {

        result = val;
    }

    return result;
    }
           