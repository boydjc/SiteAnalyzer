document.addEventListener("DOMContentLoaded", function(){

    /*********************************
     *     Function Declaration      *
     ********************************/

    function getDataUpdate() {
        var xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
            var connectionData = this.responseText;
	}
	xhttp.open("GET", "/data", true);
	xhttp.send();
    }


    function drawChart(connDataInput) {

	console.log(connDataInput);

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
    connectionData = getDataUpdate();

    // Get updated connection data from server
    this.getElementById("refreshButton").addEventListener("click", function(){
	getDataUpdate();
    });

    drawChart(connectionData);

});
