(function(){ //declare variables and first colomn
var downtown, capitolHill, southLake, wedgewood, ballard;
var open = 7;
var close = 18;

function StoreLocation(minCustPH,maxCustPH, avgDonPC){
  this.minCustPH = minCustPH;
  this.maxCustPH = maxCustPH;
  this.avgDonPC = avgDonPC;
  this.donutsPerHour = [];
  this.totalDonuts = 0;
  this.byHour = [];
}

//generates random number of customers
StoreLocation.prototype.custPerHour = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//takes random # customers above and multiplies per customer for a total donuts per hour
StoreLocation.prototype.hourlyDonuts = function() {
  return parseInt((this.avgDonPC * this.custPerHour(this.minCustPH,this.maxCustPH)));
}
StoreLocation.prototype.dailyDonuts = function(open, close) {
  var total = 0;
  var hourly =0;
  var hoursOpen = close - open;
  for (var i = hoursOpen; i > 0; i--) {
    hourly = this.hourlyDonuts();
    this.byHour[i] = hourly;
    total += hourly;
  }
  this.byHour[0] = total;
}

//var headings = ["", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm"];  render creates a row for the object call. create the element with th tag. then store in td (text)elements then append row to table.
StoreLocation.prototype.render = function(name) {
var table = document.getElementById('table-body');
    var row = document.createElement('tr');
    var cell = document.createElement('th');
    var cellText = document.createTextNode(name);
      cell.appendChild(cellText);
      row.appendChild(cell);
for (var i = this.byHour.length - 1; i >= 0; i--) {
      cell = document.createElement('td'); // Insert a cell in the row
      cellText = document.createTextNode(this.byHour[i]); //node to the cell
      cell.appendChild(cellText); // Append a text
      row.appendChild(cell);
    }
table.appendChild(row);
}         //initialize the table
tableInit = function(open, close) {
    var tableValues = [];
    var tableHead = document.getElementById('table-head');
    var row = document.createElement('tr');
    for(var j = 0; j < close - open; j++) {
      var time = (j + open + 1);
      if (time <= 12){
        tableValues[j] = time + '-am ';
      } else {
        tableValues[j] = (time - 12) + '-pm';
      }
    }
    tableValues.unshift(' ');
    tableValues.push('Total');
    for (var i = 0; i < tableValues.length; i++) {
      var cell     = document.createElement('th');
      var cellText = document.createTextNode(tableValues[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableHead.appendChild(row);
  }
//capturing the data from the input buttons

 document.getElementById('submit').addEventListener('click', function(e) { //when user submits forms
  var location=document.getElementById("location").value; //store elements
  var minCustPH=document.getElementById("minCustPH").value;
  var maxCustPH=document.getElementById("maxCustPH").value;
  var avgDonPC=document.getElementById("avgDonPC").value;

  var newLocation = new StoreLocation(minCustPH, maxCustPH,avgDonPC);
  newLocation.custPerHour(newLocation.minCustPerHour, newLocation.maxCustPerHour);
  newLocation.dailyDonuts(open, close);
  newLocation.render(location);
 });

  //Initialize the table and shop locations. call the method to calculate donuts per day called to create the estimates and then the renders is called to print them to the table

  tableInit(open, close);

  downtown = new StoreLocation(8, 43, 4.50);
  downtown.custPerHour(downtown.minCustPerHour, downtown.maxCustPerHour);
  downtown.dailyDonuts(open, close);
  downtown.render("Downtown ");

  capitolHill = new StoreLocation(4, 37, 2.00);
  capitolHill.custPerHour(capitolHill.minCustPerHour, capitolHill.maxCustPerHour);
  capitolHill.dailyDonuts(open, close);
  capitolHill.render("Capitol Hill ");

  southLake = new StoreLocation(9, 23, 6.33);
  southLake.custPerHour(southLake.minCustPerHour, southLake.maxCustPerHour);
  southLake.dailyDonuts(open, close);
  southLake.render("South Lake Union ");

  wedgewood = new StoreLocation(2, 28, 1.25);
  wedgewood.custPerHour(wedgewood.minCustPerHour, wedgewood.maxCustPerHour);
  wedgewood.dailyDonuts(open, close);
  wedgewood.render("Wedgewood ");

  ballard = new StoreLocation(8, 58, 3.75);
  ballard.custPerHour(ballard.minCustPerHour, ballard.maxCustPerHour);
  ballard.dailyDonuts(open, close);
  ballard.render("Ballard ");
})();











