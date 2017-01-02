var totalHouseCombo = 0;

var COLORS = [
  "YE", "BL", "RE", "GR", "WH"
];

var NATIONS = [
  "NO", "GE", "DA", "BR", "SW"
];

var BEVERAGES = [
  "WA", "TE", "MI", "CO", "BE"
];

var CIGARS = [
  "DU", "PR", "BL", "PM", "BM"
];

var PETS = [
  "CA", "BI", "HO", "DO", "FI"
];

var permArr = [];
var usedChars = [];

function m(message) {
  console.log(message);
}

function permute(input) {
  var i;
  var ch;
  for (i = 0; i < input.length; i+=1) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

function generateHouseCombo(nationPerm, beveragePerm, cigarPerm, petPerm) {
  var colorPerm = [0,1,2,3,4];
  var houseCombo = [];
  for (var colorIndex = 0; colorIndex < COLORS.length; colorIndex+=1) {
    houseCombo.push({
      color: COLORS[colorPerm[colorIndex]],
      nation: NATIONS[nationPerm[colorIndex]],
      beverage: BEVERAGES[beveragePerm[colorIndex]],
      cigar: CIGARS[cigarPerm[colorIndex]],
      pet: PETS[petPerm[colorIndex]]
    });
  }
  return houseCombo;
}

function writeHouseCombo(houseCombo) {
  houseCombo.forEach(function(house) {
    m(house.color+"-"+house.nation+"-"+house.beverage+"-"+house.cigar+"-"+house.pet);
  });
}

function testBritRed(houseCombo) {
  return _.get(_.find(houseCombo, ["color", "RE"]), "nation") === "BR";
}

function testSwedeDog(houseCombo) {
  return _.get(_.find(houseCombo, ["pet", "DO"]), "nation") === "SW";
}

function testDaneTea(houseCombo) {
  return _.get(_.find(houseCombo, ["beverage", "TE"]), "nation") === "DA";
}

function testGreenLeftWhite(houseCombo) {
  return _.findIndex(houseCombo, ["color", "GR"]) === _.findIndex(houseCombo, ["color", "WH"]) - 1;
}

function testGreenCoffee(houseCombo) {
  return _.get(_.find(houseCombo, ["beverage", "CO"]), "color") === "GR";
}

function testPallMallBirds(houseCombo) {
  return _.get(_.find(houseCombo, ["cigar", "PM"]), "pet") === "BI";
}

function testYellowDunhill(houseCombo) {
  return _.get(_.find(houseCombo, ["cigar", "DU"]), "color") === "YE";
}

function testCenterMilk(houseCombo) {
  return _.get(houseCombo[2], "beverage") === "MI";
}

function testNorvegianFirst(houseCombo) {
  return _.get(houseCombo[0], "nation") === "NO";
}

function testBlendNextCats(houseCombo) {
  return _.findIndex(houseCombo, ["cigar", "BL"]) === _.findIndex(houseCombo, ["pet", "CA"]) - 1
    || _.findIndex(houseCombo, ["cigar", "BL"]) === _.findIndex(houseCombo, ["pet", "CA"]) + 1;
}

function testHorseNextDunhill(houseCombo) {
  return _.findIndex(houseCombo, ["cigar", "DU"]) === _.findIndex(houseCombo, ["pet", "HO"]) - 1
    || _.findIndex(houseCombo, ["cigar", "DU"]) === _.findIndex(houseCombo, ["pet", "HO"]) + 1;
}

function testBlueMasterBeer(houseCombo) {
  return _.get(_.find(houseCombo, ["cigar", "BM"]), "beverage") === "BE";
}

function testGermanPrince(houseCombo) {
  return _.get(_.find(houseCombo, ["cigar", "PR"]), "nation") === "GE";
}

function testNorvegianNextBlue(houseCombo) {
  return _.findIndex(houseCombo, ["nation", "NO"]) === _.findIndex(houseCombo, ["color", "BL"]) - 1
    || _.findIndex(houseCombo, ["nation", "NO"]) === _.findIndex(houseCombo, ["color", "BL"]) + 1;
}

function testBlendNextWater(houseCombo) {
  return _.findIndex(houseCombo, ["cigar", "BL"]) === _.findIndex(houseCombo, ["beverage", "WA"]) - 1
    || _.findIndex(houseCombo, ["cigar", "BL"]) === _.findIndex(houseCombo, ["beverage", "WA"]) + 1;
}



function testHouseCombo(houseCombo) {
  totalHouseCombo += 1;
  if (totalHouseCombo % 1000000 === 0) {
    m(totalHouseCombo);
  }
  if (testBritRed(houseCombo)
    && testSwedeDog(houseCombo)
    && testDaneTea(houseCombo)
    && testGreenLeftWhite(houseCombo)
    && testGreenCoffee(houseCombo)
    && testPallMallBirds(houseCombo)
    && testYellowDunhill(houseCombo)
    && testCenterMilk(houseCombo)
    && testNorvegianFirst(houseCombo)
    && testBlendNextCats(houseCombo)
    && testHorseNextDunhill(houseCombo)
    && testBlueMasterBeer(houseCombo)
    && testGermanPrince(houseCombo)
    && testNorvegianNextBlue(houseCombo)
    && testBlendNextWater(houseCombo)) {
    m("WINNER!");
    writeHouseCombo(houseCombo);
    m("Fish owner is " + _.get(_.find(houseCombo, ["pet", "FI"]), "nation"));
  }
}

function allHouseCombos() {
  var permutations = permute([0,1,2,3,4]);

  permutations.forEach(function(nationPerm) {
    permutations.forEach(function(beveragePerm) {
      permutations.forEach(function(cigarPerm) {
        permutations.forEach(function(petPerm) {
          var houseCombo = generateHouseCombo(nationPerm, beveragePerm, cigarPerm , petPerm);
          testHouseCombo(houseCombo);
        });
      });
    });
  });

  m(totalHouseCombo);
}

allHouseCombos();
