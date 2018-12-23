var compiled = _.template(
  "<div class='movie'>" + 
    "<h2><%= movie_title %></h2>" + 
    "<p><%= movie_desc %></p>" + 
  "</div>"
);

var i, toAppendString = "";

for (i = 0; i < data.movies.length; i++) {
  toAppendString += compiled(data.movies[i]);
}  

$("body").append(toAppendString);