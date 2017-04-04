// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢 Won\'t you help me by adding some of your own?'

// -------------
// PAGE UPDATERS
// -------------
var rememberButton = document.getElementById('remember')
var rememberAbout = document.getElementById('rememberAbout')
var rememberSetup = document.getElementById('rememberSetup')
var rememberPunchline = document.getElementById('rememberPunchline')
var deleteButton = document.getElementById('delete')
var deleteAbout = document.getElementById('deleteAbout')

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey]['setup'] + '</p> <p>' + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.innerHTML = '<p> No matching joke found. </p>'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------
var stringifiedSavedJokes = window.localStorage.getItem('jokes')
var savedJokes = JSON.parse(stringifiedSavedJokes)

if (!savedJokes) {
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
} else {
  jokes = savedJokes
}
// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

rememberButton.addEventListener('click', function () {
  if (rememberAbout.value.trim() && rememberSetup.value.trim() && rememberPunchline.value.trim()) {
    console.log('True')
    jokes[rememberAbout.value] = {
      setup: rememberSetup.value,
      punchline: rememberPunchline.value
    }
    updatePage()
    stringifiedSavedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedSavedJokes)
  }
})

deleteButton.addEventListener('click', function () {
  if (deleteAbout.value.trim()) {
    console.log('Delete')
    delete jokes[deleteAbout.value]
    updatePage()
    stringifiedSavedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedSavedJokes)
  }
})
// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
