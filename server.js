var http = require('http')
  , fs = require('fs')
  , jf = require('jsonfile')
  , util = require('util')
  , _ = require('underscore');

// var parseBookmarks = require('./parseBookmarks');

var file = 'C:/Users/IGEN829/AppData/Local/Google/Chrome/User Data/Default/Bookmarks';


http.createServer(function (req, res) {
  jf.readFile(file, function(err, obj) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    renderPage(res, obj); 
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');


function renderPage(response, bookmarksObj) {
  var bookmarksObj = bookmarksObj.roots.bookmark_bar.children;
  var bookmarks = util.inspect(bookmarksObj, { showHidden: false, depth: null });
  
  var html = fs.readFile('./template.html', function (err, data) {
    if (err) throw err;    
    var data = data.toString();
    
    var template = _.template(data);
    var compiled = template({ bookmarksJson: bookmarks, bookmarks: bookmarksObj});
               /** bookmarks: [ 
                 {
                  name: 'dmcelligott.com', 
                  url: 'http://dmcelligott.com' 
                 } 
               ] 
             }); */
    console.log(compiled.toString());
    response.end(compiled);
    return compiled;
    
  });
  
  return html;
  
  // console.log(bookmarksObj);
  /*
  html = "<!DOCTYPE html>\n<html>\n<head>\n<script>\n"
              + 'var bookmarks = ' + bookmarks + ';'
              + "console.log(bookmarks);\n</script>\n</head>\n<body>\n"
              + "<pre>" + bookmarks + "</pre>\n";
  */       
  /*
  var compiled = _.template(html);
  compiled()
  return compiled;
  */
}

