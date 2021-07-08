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
		drawChart(connectionData);
	    }else{
	        drawChart(connectionData);
	    }
	}
	xhttp.open("GET", "/data", true);
	xhttp.send();
    }

    // takes a JSON object of connection data and counts the 
    // dates of occurance
    // TODO: make 2nd parameter to count either months, days or years
    function getDateCount(connCountDataInput) {

	connCountData = {};

	var connDataKeys = Object.keys(connCountDataInput);

        for(key in connDataKeys){
	    if(connCountDataInput[connDataKeys[key]].dateVisited in connCountData){
	        connCountData[connDataKeys[key]] += 1;
	    }else{
                connCountData[connDataKeys[key]] = 1;
	    }
	}

	console.log(connCountData);
    }

    // draws chart for connections, 
    // TODO: make 2nd parameter to draw different time series
    function drawChart(connDataInput) {

	/*var connDataKeys = Object.keys(connDataInput);
	
	for(key in connDataKeys){
            console.log(connDataInput[connDataKeys[key]].dateVisited);
	}*/

	getDateCount(connDataInput);

	const labels = [
	    'January',
	    'February',
	    'March',
	    'April',
	    'May',
	    'June',
	    'July',
	    'August',
	    'September',
	    'October',
	    'November',
	    'December',
	];

	var janCount, febCount, marCount, aprCount, mayCount, junCount, 
	    julCount, augCount, sepCount, octCount, novCount, decCount;



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
