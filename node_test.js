const http = require("http");
const url =
  "http://api.myapifilms.com/imdb/idIMDB?idIMDB=tt0426883&token=192453f5-4f1d-49cb-91d4-e0cb991ab10f&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=2";
http.get(url, res => {
  console.log("began call")
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
    console.log("data")
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(
      body.data.movies[0].title
    );
  });
});