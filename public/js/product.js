// set endpoint and your access key
var endpoint = "live";
var access_key = "f8115b1e547e6215feb92b33114aed62";


// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: "https://apilayer.net/api/" + endpoint + "?access_key=" + access_key,
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

console.log($("#avg").attr("value"))

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

// Get references to page elements
var $exampleText = $("#example-userID");
var $exampleDescription = $("#example-description");
var $examplePrice = $("#example-price");
var $exampleProduct = $("#example-productID");
var $submitBtn = $("#submitPrice");
var $exampleList = $("#example-list");
var avg;
var std;

//AJAX calls
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
    console.log("STD "+ std);
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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();

    var priceInput = $examplePrice.val().trim();

    var doubleStd = std*2;

    var lowerBound = avg - doubleStd;
    var upperBound = avg + doubleStd;
    if (priceInput < lowerBound || priceInput > upperBound) {
        priceFiller = null;
        console.log("fail" + priceFiller);
    }
    else {
        priceFiller = $examplePrice.val().trim();
        console.log("pass" + priceFiller);
    }
    console.log(doubleStd+"double standard deviation");
    console.log(avg+"average");

    //Creating the Object to Input to Database
    var example = {
        /*
        text: $exampleText.val().trim(),
        description: $exampleDescription.val().trim(),
        */
        price: priceInput,
        description: $exampleDescription.val().trim(),
        location: parseInt($("#avg").attr("data-location")),
        product: parseInt($("#avg").attr("data-product"))
    };

    console.log(example);



    if (!(example.product && example.location && example.description && example.price)) {
        alert("Not All Text Fields Completed or Above Standard Deviation Threshold");
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
        location.reload();
    }
    );


};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);
