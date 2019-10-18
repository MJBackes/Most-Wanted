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
      searchResults = wideSearch(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}
// function chooseIndividual(people){

// }
function wideSearch(people){
  let pool = people;
  let willContinue = true;
  let searchResults;
  while(willContinue){
      let searchType = promptFor("Enter the type of information you would like to search by or type 'quit' to exit"  
          + "(Choices are: First Name, Last Name,\n Gender, Occupation,\n ID Number, Height,\n Weight, Age,\n"
          + " Date of Birth, Eye Color,\n Spouses ID Number,\n Parents ID Number.):", isTextString).toLowerCase();
      searchType = searchType.toLowerCase().split("").filter(isLetter).reduce(function(output,input){
        return output += input;
      },"");
      switch(searchType){
        case 'firstname':
            searchResults = searchByFirstName(pool);
          break;
        case 'lastname':
            searchResults = searchByLastName(pool);
            break;
        case 'gender':
            searchResults = searchByGender(pool);
            break;
        case 'occupation':
            searchResults = searchByOccupation(pool);
            break;
        case 'idnumber':
            searchResults = searchById(pool);
            break;
        case 'height':
            searchResults = searchByHeight(pool);
            break;
        case 'weight':
            searchResults = searchByWeight(pool);
            break;
        case 'age':
            searchResults = searchByAge(pool);
            break;
        case 'dateofbirth':
            searchResults = searchByDateOfBirth(pool);
            break;
        case 'eyecolor':
            searchResults = searchByEyeColor(pool);
            break;
        case 'spousesidnumber':
            searchResults = searchBySpousesId(pool);
            break;
        case 'parentsidnumber':
            searchResults = searchByParentsId(pool);
            break;
        case 'quit':
          willContinue = false;
            return;
        default:
            searchResults = wideSearch(pool);
          break;
      }
      if(searchResults.length == 0){
        alert("No matches for that search.")
      }
      else{
        pool = searchResults;
        displayPeople(pool,true);
      }
      if(pool.length == 1){
        willContinue = false;
      }
   }
  return searchResults[0];
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
function getSiblings(people, person){
  let siblings = [];
  let output = [];
  if(person.parents.length > 0){
    for(let i = 0; i < person.parents.length; i++){
       siblings = siblings.concat(getDescendants(people,searchById(people,person.parents[i])));
     }
     for(let i = 0; i < siblings.length; i++){
      if(siblings[i] != person){
        output.push(siblings[i]);
      }
     }
  }
  return removeDuplicates(output);
}
function removeDuplicates(array){
  let output = [];
  for (let i = 0; i < array.length; i++){
    if(!output.includes(array[i])){
      output.push(array[i]);
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
      mainMenu(person, people);
    break;
    case "family":
      displayFamily(people,person);
      mainMenu(person, people);
    break;
    case "descendants":
      displayPeople(getDescendants(people,person));
      mainMenu(person, people);
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
    dob = formatDOBInput(dob);
   let foundPerson = people.filter(function(person){
      if(person.dob == dob){
        return true;
      }
      else{
        return false;
      }
    });
  return foundPerson;
}
function searchByAge(people, age){
if(!age){
    age = promptFor("What is the person's age?", isAgeHeightWeight);
  }
  let foundPerson = people.filter(function(person){
      if(getAge(person.dob) == age){
        return true;
      }
      else{
        return false;
      }
    });
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
  id = parseInt(id.toString().split("").filter(isNumber).reduce(function(output,input){
    return output += input;
  },""));
  let foundPerson = people.filter(function(person){
      if(person.parents.includes(id)){
        return true;
      }
      else{
        return false;
      }
  });
  return foundPerson;
}
function removeSpacesAndApost(string){
  let output = "";
  if(string){
    string = string.toString().toLowerCase()
    for(let i = 0; i < string.length; i++){
      if(string.charAt(i) != " " && string.charAt(i) != "'"){
        output += string.charAt(i);
      }
    }
  }
  return output;
}
// alerts a list of people
function displayPeople(people, isSearch = false){
  if(!isSearch){
    alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
  else{
    alert("Current pool of people who match all the criteria you have input: \n" + 
      people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
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
    let spouse = searchById(person.currentSpouse);
    personInfo += "Current Spouse: " + "\n" + spuse.firstName.toUpperCase() + " " + spouse.lastName.toUpperCase();
  }
  if(printSpouse){
    alert(personInfo);
  }
  return personInfo;
}

function displayFamily(people, person, isPrint = true){
  let personInfo = "";
  let siblings = getSiblings(people, person);
  let parent;
  if(person.parents){ 
    for(let i = 0; i < person.parents.length; i++){
      personInfo += "Parent: "
      parent = searchById(people,person.parents[i]);
      personInfo += parent.firstName + " " + parent.lastName + "\n";
    }
  }
  if(person.currentSpouse != null){
    personInfo += "Current Spouse: " + "\n" + searchById(people, person.currentSpouse).firstName + " " + searchById(people, person.currentSpouse).lastName;
    }
  if(siblings.length > 0){
      personInfo += "Siblings: " + "\n";
      for(let i = 0; i < siblings.length; i++){
        personInfo += siblings[i].firstName + " " + siblings[i].lastName + "\n";
      }
  }
  if(personInfo.length > 0){
    alert(personInfo);
  }
  else{
    alert("That person has no parents,siblings or current spouse.")
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
  if(input){
    input = input.toString().trim().split("");
    return (input.filter(isNumber).length == 9) && (input.filter(isLetter).length == 0);
  }
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
  if(input){
    input = input.toString().trim().split("/");
    return (input.length == 3 
      && isNumber(parseInt(input[0])) 
      && isNumber(parseInt(input[1])) 
      && isNumber(parseInt(input[2])) 
      && (input[0].toString().length == 1 
        || input[0].toString().length == 2) 
      && (input[1].toString().length == 1 
        || input[1].toString().length == 2) 
      && (input[2].toString().length == 2 
        || input[2].toString().length == 4));
  }
}
function isAgeHeightWeight(input){
  if(input){
  input = input.toString().trim();
    return (input.length > 0 && input.length <= 3) && isNumber(input);
  }
}
function isHeight(input){
  return indexOf("ft") > 0
    || indexOf("foot") > 0
    || indexOf("feet") > 0
    || indexOf("in") > 0
    || indexOf("inches") > 0;
}
function getHeight(input){
  if(input){
    input = input.toString().trim().toLowerCase();
    let testArray;
    let output = 0;
    if(input.indexOf("ft") > 0 || input.indexOf("foot") > 0 || input.indexOf("feet") > 0){
      output += parseInt(input.split("ft")[0].split("foot")[0].split("feet")[0])*12;
      if(input.indexOf("in") > 0 || input.indexOf("inches") > 0){
        if(input.indexOf("ft") > 0){
        output += parseInt(input.split("ft")[1].split("inches")[0].split("in")[0]);
        }
        if(input.indexOf("foot") > 0){
        output += parseInt(input.split("foot")[1].split("inches")[0].split("in")[0]);
        }
        if(input.indexOf("feet") > 0){
        output += parseInt(input.split("feet")[1].split("inches")[0].split("in")[0]);
        }

      }
    }
    else if(input.indexOf("in") > 0 || input.indexOf("inches") > 0){
      output += parseInt(input.split("inches")[0].split("in")[0]);
    }
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
  if(input){
    input = removeSpacesAndApost(input.toString());
    for(let i = 0; i< input.length; i++){
      if(!isLetter(input.charAt(i))){
        return false;
      }
    }
  }
  return true;
}
