// set endpoint and your access key
var endpoint = "live";
var access_key = "fdefafcae0d2e512ba85f64693e2f861";

// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: "http://apilayer.net/api/" + endpoint + "?access_key=" + access_key,
    dataType: "jsonp",
    success: function (json) {
        var averageValue = $("#avg").attr("value");
        var euroCurrency = averageValue * json.quotes.USDEUR;
        var gbpCurrency = averageValue * json.quotes.USDGBP;
        var chineseCurrency = averageValue * json.quotes.USDCNY;
        var japaneseCurrency = averageValue * json.quotes.USDJPY;
        var australianCurrency = averageValue * json.quotes.USDAUD;
        var hkCurrency = averageValue * json.quotes.USDHKD;
        var skCurrency = averageValue * json.quotes.USDKRW;
        var indiaCurrency = averageValue * json.quotes.USDINR;
        var bitcoinCurrency = averageValue * json.quotes.USDBTC;


        var newEuroCurrency = parseFloat(euroCurrency).toFixed(2);
        var newGBPCurrency = parseFloat(gbpCurrency).toFixed(2);
        var newChineseCurrency = parseFloat(chineseCurrency).toFixed(2);
        var newJapaneseCurrency = parseFloat(japaneseCurrency).toFixed(2);
        var newAustralianCurrency = parseFloat(australianCurrency).toFixed(2);
        var newHongKongCurrency = parseFloat(hkCurrency).toFixed(2);
        var newSouthKoreaCurrency = parseFloat(skCurrency).toFixed(2);
        var newIndiaCurrency = parseFloat(indiaCurrency).toFixed(2);
        var newBitcoinCurrency = parseFloat(bitcoinCurrency).toFixed(5);

        $("#convertedEUR").text(newEuroCurrency);
        $("#convertedGBP").text(newGBPCurrency);
        $("#convertedCNY").text(newChineseCurrency);
        $("#convertedJPY").text(newJapaneseCurrency);
        $("#convertedAUD").text(newAustralianCurrency);
        $("#convertedHKD").text(newHongKongCurrency);
        $("#convertedKRW").text(newSouthKoreaCurrency);
        $("#convertedINR").text(newIndiaCurrency);
        $("#convertedBTC").text(newBitcoinCurrency);

    }
});

//Chart JS

var ctx = $("#myChart");

var dataArray = [];
var dataArray2 = [];

//Latitude Array
var dataArray3 = [];
//Longtitude Array
var dataArray4 = [];

console.log($("#avg").attr("value"))

/*
API.getExamples().then(function (data) {
    for (var i = 0; i < data.length; i++) {
        dataArray3.push(data[i].latitude);
        dataArray4.push(data[i].longitude);
    }
});
*/

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
                ctx = this.chart.ctx,
                x = activePoint.tooltipPosition().x,
                topY = this.chart.scales['y-axis-0'].top,
                bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(219, 21, 21, 0.8)';
            ctx.stroke();
            ctx.restore();
        }
    }
});

var myChart = new Chart(ctx, {
    type: 'LineWithLine',
    data: {
        labels: dataArray,
        datasets: [{
            label: 'T-Shirt Price $',
            data: dataArray2,
            fill: true,
            backgroundColor: [
                "rgba(220,220,220,0.3)"
            ],
            borderColor: [
                "rgba(0,0,0,1)"
            ],
            pointBorderColor: "rgba(0,0,0,0.5)",
            pointBackgroundColor: "rgba(66, 134, 244, 0.7)",
            pointBorderWidth: 8,
            pointHoverRadius: 10,
            borderWidth: 1,
            pointHoverBackgroundColor: "rgba(66, 134, 244, 0.5)",
            pointHoverBorderColor: "rgba(0,0,0,0.5)"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        labels: {
            // This more specific font property overrides the global property
            fontColor: 'white'
        },
        tooltips: {
            intersect: false,
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return {
                        borderColor: 'rgb(0, 0, 0)',
                        backgroundColor: 'rgb(247, 247, 247)'
                    }
                },
                labelTextColor: function (tooltipItem, chart) {
                    return '#f2c71a';
                }
            }

        },
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 20,
                bottom: 20
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                },
                gridLines: {
                    display: true,
                    color: "#ffffff63"

                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return '$' + value;
                    }

                },
                gridLines: {
                    display: true,
                    color: "#ffffff63"
                }
            }]
        }
    }


});

//GeoLocation

function geoFindMe() {
    var output = document.getElementById("out");

    if (!output) {
        console.log("OUTPUT IS NULL");
        return;
    }

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = "<p>Latitude is " + latitude + "° <br>Longitude is " + longitude + "°</p>";

        /*
            var img = new Image();
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
    
            output.appendChild(img);
            */
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe();


// Get references to page elements
var $exampleText = $("#example-userID");
var $exampleDescription = $("#example-description");
var $examplePrice = $("#example-price");
var $exampleProduct = $("#example-productID");
var $submitBtn = $("#submitPrice");
var $exampleList = $("#example-list");
//var $locationValue = $(this).attr("value");
var avg;
var std;
var priceFiller;

/*
// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function (example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/examples",
            data: JSON.stringify(example)
        });
    },
    getExamples: function () {
        return $.ajax({
            url: "api/examples",
            type: "GET"
        });
    },
    deleteExample: function (id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    }
};
*/

$.ajax({
    url: "/api/examples",
    method: "GET"
}).then(function (data) {
    console.log(data);
    var sumArray = [];
    var sumAvg = 0;
    for (var i = 0; i < data.length; i++) {
        sumArray.push(parseInt(data[i].price));
        sumAvg += parseInt(data[i].price);
        dataArray.push(data[i].createdAt);
        dataArray2.push(data[i].price);
    }
    avg = sumAvg / data.length;
    std = standardDeviation(sumArray);
    console.log("AVG " + avg);
    console.log("STD " + std);
});


//Use of Standard Deviation to Prevent "Troll" Amounts
function standardDeviation(values) {
    var avg = average(values);

    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data) {
    var sum = data.reduce(function (sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}


//Use of Standard Deviation to Prevent "Troll" Amounts
/*
API.getExamples().then(function (data) {
    console.log(data);
    var sumArray = [];
    var sumAvg = 0;
    for (var i = 0; i < data.length; i++) {
        sumArray.push(parseInt(data[i].price));
        sumAvg += parseInt(data[i].price);
    }
    avg = sumAvg / data.length;
    std = standardDeviation(sumArray);
    console.log(avg);
    console.log(std);
});


//Chart Data
API.getExamples().then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        dataArray.push(data[i].createdAt);
        dataArray2.push(data[i].price);
    }
});
*/

console.log($("#avg").attr("data-location"));

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();


    var priceInput = $examplePrice.val().trim();

    var lowerBound = avg - std;
    var upperBound = avg + std;
    if (priceInput < lowerBound || priceInput > upperBound) {
        priceFiller = null;
        console.log("fail" + priceFiller);
    }
    else {
        priceFiller = $examplePrice.val().trim();
        console.log("pass" + priceFiller);
    }
    console.log(std);
    console.log(avg);


    //Creating the Object to Input to Database
    var example = {
        /*
        text: $exampleText.val().trim(),
        description: $exampleDescription.val().trim(),
        */
        price: priceFiller,
        description: $exampleDescription.val().trim(),
        location: parseInt($("#avg").attr("data-location")),
        product: parseInt($("#avg").attr("data-product"))
    };

    console.log(example);



    if (!(example.product && example.location && example.description && example.price)) {
        alert("Input Valid Amounts");
        $exampleText.val("");
        $exampleProduct.val("");
        $exampleDescription.val("");
        $examplePrice.val("");
        return;
    }


    $.ajax("/api/examples", {
        type: "POST",
        data: example
    }).then(function () {
        console.log("It Worked");
        location.reload();
    }
    );


};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
/*
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
        //refreshExamples();
    });
};
*/

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);
