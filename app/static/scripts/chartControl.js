document.addEventListener("DOMContentLoaded", function(){

    // Get updated connection data from server
    this.getElementById("refreshButton").addEventListener("click", function(){
        var xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
            var connectionData = this.responseText;
	}
	xhttp.open("GET", "/data", true);
	xhttp.send();
    });


    function drawChart() {
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
	        label: 'My First dataset',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
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

    drawChart();

});
