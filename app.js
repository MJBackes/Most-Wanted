"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes', 'no', or 'quit'", yesNo).toLowerCase();
  searchType = searchType.trim();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = wideSearch(people);
      break;
    case 'quit':
      return;
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
      let searchType = promptFor("SINGLE SEARCH:\nEnter the type of information you would like to search by to narrow the search pool,"
          + " type 'multi' to search by multiple criteria in the same line, type 'quit' to exit, or 'restart' to start a new search"  
          + "(Choices are: First Name, Last Name,\n Gender, Occupation,\n ID Number, Height,\n Weight, Age,\n"
          + " Date of Birth, Eye Color,\n Minimum Age, Maximum Age, \n Spouses ID Number,\n Parents ID Number.):", isTextString).toLowerCase();
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
            searchResults = [searchById(pool)];
            break;
        case 'id':
            searchResults = [searchById(pool)];
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
        case 'dob':
            searchResults = searchByDateOfBirth(pool);
            break;
        case 'eyecolor':
            searchResults = searchByEyeColor(pool);
            break;
        case 'spousesidnumber':
            searchResults = [searchBySpousesId(pool)];
            break;
        case 'spousesid':
            searchResults = [searchBySpousesId(pool)];
            break;
        case 'parentsidnumber':
            searchResults = searchByParentsId(pool);
            break;
        case 'parentsid':
            searchResults = searchByParentsId(pool);
            break;
         case 'minage':
            searchResults = searchByMinAge(pool);
            break;
        case 'minimumage':
            searchResults = searchByMinAge(pool);
            break;
        case 'maxage':
            searchResults = searchByMaxAge(pool);
            break;
        case 'maximumage':
            searchResults = searchByMaxAge(pool);
            break;
        case 'multi':
            searchResults = multiSearch(pool);
            break;
        case 'quit':
          willContinue = false;
            return {willQuitProgram:true};
        case "restart":
            app(people); // restart
            break;
        default:
            searchResults = wideSearch(pool);
          break;
      }
      if(searchResults.length == 0 || !searchResults[0]){
        alert("No matches for that search.")
      }
      else {
        pool = searchResults;
        if(searchResults[0] && !searchResults[0].willQuitProgram){
           displayPeople(pool,true);
        }
      }
      if(pool.length == 1){
        willContinue = false;
      }
   }
  return searchResults[0];
  }
function multiSearch(people){
  let pool = people;
  let searchResults;
  let searchType = promptFor("MULTIPLE SEARCH:\nEnter the type of information you want to search for followed by a colon,"
          + "seperate searches with a semi-colon.(eg. eye color: blue;last name: madden)"  
          + "(Choices are: First Name, Last Name,\n Gender, Occupation,\n ID Number, Height,\n Weight, Age,\n"
          + " Date of Birth, Eye Color,\nMinimum Age, Maximum Age, \n  Spouses ID Number,\n Parents ID Number.):", isMultiString).toLowerCase();
      searchType = searchType.toLowerCase().split("").filter(isMultiChar).reduce(function(output,input){
        return output += input;
      },"");
      let searchTypes = getMultiSearchArray(searchType);
      for(let i = 0; i < searchTypes.length; i++){
        switch(searchTypes[i].type){
        case 'firstname':
            searchResults = searchByFirstName(pool,searchTypes[i].value);
          break;
        case 'lastname':
            searchResults = searchByLastName(pool,searchTypes[i].value);
            break;
        case 'gender':
            searchResults = searchByGender(pool,searchTypes[i].value);
            break;
        case 'occupation':
            searchResults = searchByOccupation(pool,searchTypes[i].value);
            break;
        case 'idnumber':
            searchResults = [searchById(pool,searchTypes[i].value)];
            break;
        case 'id':
            searchResults = [searchById(pool,searchTypes[i].value)];
            break;
        case 'height':
            searchResults = searchByHeight(pool,searchTypes[i].value);
            break;
        case 'weight':
            searchResults = searchByWeight(pool,searchTypes[i].value);
            break;
        case 'age':
            searchResults = searchByAge(pool,searchTypes[i].value);
            break;
        case 'dateofbirth':
            searchResults = searchByDateOfBirth(pool,searchTypes[i].value);
            break;
        case 'dob':
            searchResults = searchByDateOfBirth(pool,searchTypes[i].value);
            break;
        case 'eyecolor':
            searchResults = searchByEyeColor(pool,searchTypes[i].value);
            break;
        case 'spousesidnumber':
            searchResults = [searchBySpousesId(pool,searchTypes[i].value)];
            break;
        case 'spousesid':
            searchResults = [searchBySpousesId(pool,searchTypes[i].value)];
            break;
        case 'parentsidnumber':
            searchResults = searchByParentsId(pool,searchTypes[i].value);
            break;
        case 'parentsid':
            searchResults = searchByParentsId(pool,searchTypes[i].value);
            break;
        case 'minage':
            searchResults = searchByMinAge(pool, searchTypes[i].value);
            break;
        case 'minimumage':
            searchResults = searchByMinAge(pool, searchTypes[i].value);
            break;
        case 'maxage':
            searchResults = searchByMaxAge(pool, searchTypes[i].value);
            break;
        case 'maximumage':
            searchResults = searchByMaxAge(pool, searchTypes[i].value);
            break;
        case 'quit':
            return [{willQuitProgram:true}];
        default:
            searchResults = multiSearch(people);
            break;
        } 
        pool = searchResults;
      }
      return pool;
}
function getDescendants(people,person){
  let output = searchByParentsId(people,person.id);
  if(output){
    let  generationSize = output.length;
    for(let i = 0; i < generationSize; i++){
       output = output.concat(getDescendants(people,output[i]));
     }
  }
  return removeDuplicates(output);
}
function getSiblings(people, person){
  let siblings = [];
  let output = [];
  if(person.parents.length > 0){
    for(let i = 0; i < person.parents.length; i++){
       siblings = siblings.concat(people.filter(function(potentialSibling){
        if(potentialSibling.parents.includes(person.parents[i]) && potentialSibling != person){
          return true;
        }
        else{
          return false;
        }
       }));
     }
  }
  return removeDuplicates(siblings);
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

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. 
  We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  if(person.willQuitProgram){
    return;
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info',"
    + " 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  displayOption = displayOption.toLowerCase();
  switch(displayOption){
    case "info":
      displayPerson(people,person);
      mainMenu(person, people);
    break;
    case "family":
      displayFamily(people,person);
      mainMenu(person, people);
    break;
    case "descendants":
      if(getDescendants(people,person).length > 0) {
        displayPeople(getDescendants(people,person));
      }
      else {
        alert("That person has no descendants.");
      }
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
function searchByMinAge(people, minAge){
  if(!minAge){
    minAge = promptFor("Give a minimum age to eliminate all people younger than that from the pool.", isAgeHeightWeight)
  }
  let foundPerson = people.filter(function(person){
    if(getAge(person.dob) > minAge){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}
function searchByMaxAge(people, maxAge){
  if(!maxAge){
    maxAge = promptFor("Give a maximum age to eliminate all people older than that from the pool.", isAgeHeightWeight)
  }
  let foundPerson = people.filter(function(person){
    if(getAge(person.dob) < maxAge){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
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
    dob = promptFor("What is the person's date of birth?(MM/DD/YYYY)", isDOB);
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
  if(isHeight(height)){
    height = getHeight(height);
  }
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
    if(person.occupation == job){
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
    return person.firstName.toUpperCase() + " " + person.lastName.toUpperCase();
  }).join("\n"));
  }
}

function displayPerson(people, person, print = true){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  if(person.parents){ 
    for(let i = 0; i < person.parents.length; i++){
      parent = searchById(people,person.parents[i])
      if(parent.gender == 'male'){
        personInfo += "Father: ";
      }
      else if (parent.gender == 'female'){
        personInfo += "Mother: ";
      }
      else{
        personInfo += "Parent: ";
      }
      personInfo += parent.firstName + " " + parent.lastName + "\n";
    }
  }
  if(person.currentSpouse != null){
    let spouse = searchById(people, person.currentSpouse);
    personInfo += "Current Spouse: " + spouse.firstName + " " + spouse.lastName + "\n";
  }
  if(print){
    alert(personInfo.toUpperCase());
  }
  return personInfo.toUpperCase();
}

function displayFamily(people, person, isPrint = true){
  let personInfo = "";
  let siblings = getSiblings(people, person);
  let parent;
  if(person.parents){
    for(let i = 0; i < person.parents.length; i++){
      parent = searchById(people,person.parents[i]);
      if(parent.gender == 'male'){
        personInfo += "Father: ";
      }
      else if (parent.gender == 'female'){
        personInfo += "Mother: ";
      }
      personInfo += parent.firstName + " " + parent.lastName + "\n";
    }
  }
  if(person.currentSpouse != null){
    personInfo += "Current Spouse: " + "\n" + searchById(people, person.currentSpouse).firstName + " " 
    + searchById(people, person.currentSpouse).lastName + "\n";
    }
  if(siblings.length > 0){
      personInfo += "Siblings: " + "\n";
      for(let i = 0; i < siblings.length; i++){
        personInfo += siblings[i].firstName + " " + siblings[i].lastName + "\n";
      }
  }
  if(personInfo.length > 0){
    alert(personInfo.toUpperCase());
  }
  else{
    alert("That person has no parents,siblings or current spouse.")
  }
  return personInfo.toUpperCase();
}

// function that prompts and validates user input
function promptFor(question, valid){
    let response = "";
  do{
    response = prompt(question);
    if(!valid(response)){
      alert("Improper input, try again.")
    }
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
  if(input){
    input = input.toString().trim().toLowerCase();
    return input == "yes" || input == "no" || input == "quit";
  }
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
    return ((input.length > 0 && input.length <= 3) && isNumber(input)) || isHeight(input);
  }
}
function isHeight(input){
  return input.indexOf("ft") > 0
        || input.indexOf("foot") > 0
        || input.indexOf("feet") > 0
        || input.indexOf("in") > 0
        || input.indexOf("inches") > 0
        ||(input.indexOf("'") > 0 && isNumber(input.charAt(input.indexOf("'") - 1)));
}
function getHeight(input){
  if(input){
    input = input.toString().trim().toLowerCase();
    let testArray;
    let output = 0;
    if((input.indexOf("'") > 0 && isNumber(input.charAt(input.indexOf("'") - 1)))){
      output += parseInt(input.split("'")[0])*12;
      if((input.indexOf('"') > 0 && isNumber(input.charAt(input.indexOf('"') - 1)))){
        output += parseInt(input.split("'")[1].split('"')[0]);
      }
    }
    else if(input.indexOf("ft") > 0 
            || input.indexOf("foot") > 0 
            || input.indexOf("feet") > 0 ){
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
   return output;
  }
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
    return true;
  }
  
}
function isMultiChar(input){
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ;:1234567890/".indexOf(input.toUpperCase()) >= 0;
}
function isMultiString(input){
 if(input){
  let validInputTypes = ['firstname','lastname','gender','occupation','idnumber','id','height','weight','age','dateofbirth','dob','eyecolor','spousesidnumber','spousesid','parentsidnumber','parentsid','minage','maxage','minimumage','maximumage','quit'];
    input = input.toLowerCase().split("").filter(isMultiChar).reduce(function(output,input){
        return output += input;
      },"");
    input = getMultiSearchArray(input);
    for(let i = 0; i < input.length; i++){
      if(!validInputTypes.includes(input[i].type)){
        return false;
      } 
    }
    return true;
  }
  else{
    return false;
  }
}
function getMultiSearchArray(input){
  let searchTypes = input.split(";");
      for(let i = 0; i < searchTypes.length; i++){
        searchTypes[i] = {type: searchTypes[i].split(":")[0], 
                          value: searchTypes[i].split(":")[1]};
      }
      return searchTypes;
}