document.addEventListener("DOMContentLoaded", function(){

    /*********************************
     *     Function Declaration      *
     ********************************/

    // gets connection data from the database
    function getDataUpdate() {
        var xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
            var connectionData = JSON.parse(this.responseText);
	    if(Chart.getChart('myChart')){
                Chart.getChart('myChart').destroy();
		drawConnChart(connectionData, "month");
	    }else{
	        drawConnChart(connectionData);
	    }
	}
	xhttp.open("GET", "/data", true);
	xhttp.send();
    }

    // draws chart for connections, 
    // TODO: make 2nd parameter to draw different time series
    function drawConnChart(connDataInput, timeSeries) {

	var connDataKeys = Object.keys(connDataInput);

	if(timeSeries === "month"){

	    var janCount = 0; var febCount = 0; var marCount = 0;
	    var aprCount = 0; var mayCount = 0; var junCount = 0;
	    var julCount = 0; var augCount = 0; var sepCount = 0;
	    var octCount = 0; var novCount = 0; var decCount = 0;

	    // counts the occurance of connections per month
	    for(key in connDataKeys){
	        if(connDataInput[connDataKeys[key]].dateVisited){

	            visitedMonth = connDataInput[connDataKeys[key]].dateVisited[5] + 
			        connDataInput[connDataKeys[key]].dateVisited[6];

		    switch(visitedMonth){
		        case "01":
			    janCount += 1;
			    break;
		        case "02":
			    febCount += 1;
			    break;
		        case "03":
			    marCount += 1;
			    break;
		        case "04":
			    aprCount += 1;
		 	    break;
		        case "05":
			    mayCount += 1;
			    break;
		        case "06":
			    junCount += 1;
			    break;
		        case "07":
		 	    julCount += 1;
		 	    break;
		        case "08":
			    augCount += 1;
			    break;
		        case "09":
			    sepCount += 1;
			    break;
		        case "10":
			    octCount += 1;
			    break;
		        case "11":
			    novCount += 1;
			    break;
		        case "12":
			    decCount += 1;
			    break;
		        default:
			    break;
		    }
	        }
	    }
	
	    const labels = [
	        'January','February','March','April',
		'May','June','July','August',
	        'September','October','November','December',
	    ];
	    
	    // TODO: clean up the code redundance of this data obj
	    // for when we have multiple time series
	    // maybe some sort of object to hold the data values
	    const data = {
                labels: labels,
	        datasets: [{
	            label: 'Connections',
		    backgroundColor: 'rgb(0,0,0)',
		    borderColor: 'rgb(0,0,0)',
		    data: [janCount, febCount, marCount, 
		           aprCount, mayCount, junCount,
		           julCount, augCount, sepCount,
		           octCount, novCount, decCount],
	        }]
	    };
	}

        const config = {
            type: 'line',
	    data, 
	    options: {}
	}

	var myChart = new Chart(document.getElementById('myChart'), config);
    }

    /*********************************
     *    End Function Declaration   *
     ********************************/

    // get the data once when the page loads
    // and then again if the refresh data button is clicked
    getDataUpdate();

    // Get updated connection data from server
    this.getElementById("refreshButton").addEventListener("click", function(){
	getDataUpdate();
    });

});
