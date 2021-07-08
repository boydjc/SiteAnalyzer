document.addEventListener("DOMContentLoaded", function(){

    /*********************************
     *     Function Declaration      *
     ********************************/

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


    function drawChart(connDataInput) {

	var connDataKeys = Object.keys(connDataInput);
	
	for(key in connDataKeys){
            console.log(connDataInput[connDataKeys[key]].id));
	}

	const labels = [
	    'January',
	    'February',
	    'March',
	    'April',
	    'May',
	    'June',
	];

	const data = {
            labels: labels,
	    datasets: [{
	        label: 'Connections',
		backgroundColor: 'rgb(0,0,0)',
		borderColor: 'rgb(0,0,0)',
		data: [0, 10, 5, 2, 20, 30, 45],
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
