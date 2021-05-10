// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: 'The year or genre is not defined' // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {

      // Sort out the movies that matches wiht the query parameters
      if (moviesFromCsv[i].startYear == year && moviesFromCsv[i].genres.includes(`${genre}`)){
        
        // Count the number of movies filtered by the query parameters
        returnValue.numResults = returnValue.numResults + 1

        // Store the values of the movies in the object
        let movie = moviesFromCsv[i]

        returnListing = {
          Title: movie.primaryTitle,
          Realesd Year: movie.startYear,
          Genre: movie.genres
        }

      }  

    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Hello from the back-end!` // a string of data
    }
  }
}