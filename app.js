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
      break;
    case 'no':
      searchResults = chooseIndividual(wideSearch(people));
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}
function chooseIndividual(people){

}
function wideSearch(people){
  let searchType = promptFor("Enter the type of information you would like to search by(Choices are: First Name, Last Name, ID Number, Height, Weight, Age, Date of Birth, Eye Color, Spouse's ID Number, Parents ID Number.):", yesNo).toLowerCase();
  searchType = searchType.trim().toLowerCase().split("").filter(isLetter).reduce(function(output,input){
    return output += input;
  },"");
  let searchResults;
  /*switch(searchType){
    case 'firstname':*/

}
function getDescendants(people,person){
  let output = searchByParentsId(people,person.id);
  if(output){
    for(let i = 0; i < output.length; i++){
       output = output.concat(getDescendants(people,output[i]));
     }
  }
  return output;
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
      displayPerson(person);
    break;
    case "family":
      displayFamily(person);
    break;
    case "descendants":
      displayPeople(getDescendants(people,person));
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

function searchByName(people, firstName, lastName){
  if(!firstName){
  firstName = promptFor("What is the person's first name?", isTextString);
  }
  if(!lastName){
  lastName = promptFor("What is the person's last name?", isTextString);
  }
  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson[0];
}
function searchByFirstName(people, firstName){
  if(!firstName){
  firstName = promptFor("What is the person's first name?", isTextString);
  }
  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchByLastName(people, lastName){
  if(!lastName){
  lastName = promptFor("What is the person's last name?", isTextString);
  }
  let foundPerson = people.filter(function(person){
    if(person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchById(people, id){
  if(!id){
    id = promptFor("What is the person's ID number?", isId);
  }
  id = id.toString().trim().split("").filter(isNumber).reduce(function(output,input){
    return output += input;
  },"");
  let foundPerson = people.filter(function(person){
    if(person.id == id){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson[0];
}
function searchByEyeColor(people, eyeColor){
  if(!eyeColor){
    eyeColor = promptFor("What is the person's eye color?", isTextString);
  }
  eyeColor = eyeColor.toLowerCase().trim();
  let foundPerson = people.filter(function(person){
    if(person.eyeColor == eyeColor){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchByDateOfBirth(people, dob){
  if(!dob){
    dob = promptFor("What is the person's date of birth?", isDOB);
  }
  let foundPerson = [];
    dob = formatDOBInput(dob);
    foundPerson.push(people.filter(function(person){
      if(person.dob == dob){
        return true;
      }
      else{
        return false;
      }
    }));
  return foundPerson;
}
function searchByAge(people, age){
if(!age){
    age = promptFor("What is the person's age?", isAgeHeightWeight);
  }
  let foundPerson = [];
  foundPerson.push(people.filter(function(person){
      if(getAge(person.dob) == age){
        return true;
      }
      else{
        return false;
      }
    }));
  return foundPerson;
}
function searchByHeight(people, height){
  if(!height){
    height = promptFor("What is the person's height?", isAgeHeightWeight);
  }
  height = height.toString().trim();
  let foundPerson = people.filter(function(person){
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchByWeight(people, weight){
  if(!weight){
    weight = promptFor("What is the person's weight?", isAgeHeightWeight);
  }
  weight = weight.toString().trim();
  let foundPerson = people.filter(function(person){
    if(person.weight == weight){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchByGender(people, gender){
  if(!gender){
    gender = promptFor("What is the person's gender?", isTextString);
  }
  gender = gender.toString().trim();
  let foundPerson = people.filter(function(person){
    if(person.gender == gender){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchByOccupation(people, job){
  if(!job){
    job = promptFor("What is the person's occupation?", isTextString);
  }
  job = job.toString().trim();
  let foundPerson = people.filter(function(person){
    if(person.job == job){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchBySpousesId(people, id){
  if(!id){
    id = promptFor("What is the ID number of the person's spouse?", isId);
  }
  id = id.toString().trim().split("").filter(isNumber).reduce(function(output,input){
    return output += input;
  },"");
  let foundPerson = people.filter(function(person){
    if(person.currentSpouse == id){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson[0];
}
function searchByParentsId(people, id){
  if(!id){
    id = promptFor("What is the ID number of one of the person's parents?", isId);
  }
  id = id.toString().trim().split("").filter(isNumber).reduce(function(output,input){
    return output += input;
  },"");
  let foundPerson = people.filter(function(person){
    for(let i = 0; i < person.parents.length; i++){
      if(person.parents[i] == id){
        return true;
      }
    }
        return false;
  });
  return foundPerson;
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
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor.toUpperCase() + "\n";
  personInfo += "Occupation: " + person.occupation.toUpperCase() + "\n";
  if(person.parents){ 
    for(let i = 0; i < person.parents.length; i++){
      personInfo += "Parent: "
      personInfo += person.parents[i] + "\n";
    }
  }
  if(person.currentSpouse != null && printSpouse){
    personInfo += "Current Spouse: " + "\n" + displayPerson(searchById(data, person.currentSpouse), false);
  }
  if(printSpouse){
    alert(personInfo);
  }
  return personInfo;
}

function displayFamily(person, printSpouse = true){
  let personInfo = "";
 
  if(person.parents){ 
    for(let i = 0; i < person.parents.length; i++){
      personInfo += "Parent: "
      personInfo += person.parents[i] + "\n";
    }
  }
  if(person.currentSpouse != null && printSpouse){
    personInfo += "Current Spouse: " + "\n" + displayPerson(searchById(data, person.currentSpouse), false);
  }
  if(printSpouse){
    alert(personInfo);
  }
  return personInfo;
}

// function that prompts and validates user input
function promptFor(question, valid){
    let response;
  do{
    response = prompt(question);
}while(!valid(response));
  return response;
}
function getAge(dob){
  let now = new Date();
  now = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  dob = dob.toString().trim().split("/");
  let age = now[2] - dob[2];
  if(now[0] < dob[0] || (now[0] == dob[0] && now[1] > dob[1])){
    age--;
  }
  return age;
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
function isId(input){
  input = input.toString().trim().split("");
  return (input.filter(isNumber).length == 9) && (input.filter(isLetter).length == 0);
}
function isNumber(input){
  for(let i = 0; i < input.length; i++){
    if("1234567890".indexOf(input.charAt(i)) < 0){
      return false;
    }
  }
  return true;
}
function isLetter(input){
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(input.toUpperCase()) >= 0;
}
function isDOB(input){
  input = input.toString().trim().split("/");
  return (input.length == 3 
    && isNumber(parseInt(input[0])) 
    && isNumber(parseInt(input[1])) 
    && isNumber(parseInt(input[2])) 
    && (input[0].toString().length == 1 || input[0].toString().length == 2) 
    && (input[1].toString().length == 1 || input[1].toString().length == 2) 
    && (input[2].toString().length == 2 || input[2].toString().length == 4));
}
function isAgeHeightWeight(input){
  input = input.toString().trim();
    return (input.length > 0 && input.length <= 3) && isNumber(input);
}
function getHeight(input){
  input = input.toString().trim().toLowerCase();
  let testArray;
  let output = 0;
  if(input.indexOf("ft") > 0 || input.indexOf("foot") > 0){
    output += parseInt(input.split("ft")[0].split("foot")[0])*12;
    if(input.indexOf("in") > 0 || input.indexOf("inches") > 0){
      if(input.indexOf("ft") > 0){
      output += parseInt(input.split("ft")[1].split("inches")[0].split("in")[0]);
      }
      if(input.indexOf("foot") > 0){
      output += parseInt(input.split("foot")[1].split("inches")[0].split("in")[0]);
      }
    }
  }
  else if(input.indexOf("in") > 0 || input.indexOf("inches") > 0){
    output += parseInt(input.split("inches")[0].split("in")[0]);
  }
  return output;
}
function isDOBOrAge(input){
  return isDOB(input) || isAgeHeightWeight(input);
}
function formatDOBInput(input){
  input = input.toString().trim().split("/");
  if(input[0].charAt(0) == "0"){
    input[0] = input[0].charAt(1);
  }
  if(input[1].charAt(0) == "0"){
    input[1] = input[1].charAt(1);
  }
  if(input[2].length == 2){
    if(input[2].charAt(0) > 1){
      input[2] = "19" + input[2];
    }
    else{
      input[2] = "20" + input[2];
    }
  }
  return input.reduce(function(output, input){
    if(input.length != 4){
      return output += input + "/";
    }
    else{
      return output += input;
    }
  },"");
}
function isTextString(input){
  input = input.toString().trim();
  for(let i = 0; i< input.length; i++){
    if(!isLetter(input.charAt(i))){
      return false;
    }
  }
  return true;
}
