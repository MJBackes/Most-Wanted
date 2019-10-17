"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  searchType = searchType.trim();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      alert(JSON.stringify(searchResults));
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, printSpouse = true){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName.toUpperCase() + "\n";
  personInfo += "Last Name: " + person.lastName.toUpperCase() + "\n";
  personInfo += "Gender: " + person.gender.toUpperCase() + "\n";
  personInfo += "Date of Birth: " + person.dob.toUpperCase() + "\n";
  personInfo += "Height: " + person.height.toUpperCase() + "\n";
  personInfo += "Weight: " + person.weight.toUpperCase() + "\n";
  personInfo += "Eye Color: " + person.eyeColor.toUpperCase() + "\n";
  personInfo += "Occupation: " + person.occupation.toUpperCase() + "\n";
  if(person.parents){
    for(let i = 0; i < person.parents.length; i++){
      personInfo += person.parents[i] + "\n";
    }
  }
  if(person.currentSpouse != null && printSpouse){
    //personInfo +="Current Spouse: " + "\n" displayPerson(searchById(person.currentSpouse), false);
  }
  if(printSpouse){
    alert(personInfo);
  }
  return personInfo;
}
// function that prompts and validates user input
function promptFor(question, valid){
    let response = "";
  do{
    response = prompt(question);
}while(!valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  input = input.trim();
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
