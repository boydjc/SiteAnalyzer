document.addEventListener("DOMContentLoaded", function(){

    var connectionData;

    /*********************************
     *     Function Declaration      *
     ********************************/

    // gets connection data from the database
    function getDataUpdate() {
        var xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
            connectionData = JSON.parse(this.responseText);
	    timeSeriesSelect = document.getElementById("chartTimeSeries");
	    if(Chart.getChart('myChart')){
                Chart.getChart('myChart').destroy();
		drawConnChart(connectionData, timeSeriesSelect.value);
	    }else{
	        drawConnChart(connectionData, timeSeriesSelect.value);
	    }

	    drawVisitorBarChart(connectionData);

	    if(Chart.getChart('geoChart')){
		Chart.getChart('geoChart').destroy();
		drawGeoMap(connectionData, 'us');
	    }else{
		drawGeoMap(connectionData, 'us');
	    }
	}
	xhttp.open("GET", "/data", true);
	xhttp.send();
    }

    // draws chart for connections, 
    function drawConnChart(connDataInput, timeSeries) {

	var connDataKeys = Object.keys(connDataInput);

	var labels = {};
	var data = {};
	var config = {};
	var dataset = [];

	if(timeSeries === "monthly"){

	    var janCount = 0; var febCount = 0; var marCount = 0;
	    var aprCount = 0; var mayCount = 0; var junCount = 0;
	    var julCount = 0; var augCount = 0; var sepCount = 0;
	    var octCount = 0; var novCount = 0; var decCount = 0;

	    // counts the occurance of connections per month
	    for(let i=0; i<=connDataKeys.length-1; i++){
		
	        if(connDataInput[connDataKeys[i]].dateVisited){
	            visitedMonth = connDataInput[connDataKeys[i]].dateVisited[5] + 
			        connDataInput[connDataKeys[i]].dateVisited[6];

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
	
	    labels = [
	        'January','February','March','April',
		'May','June','July','August',
	        'September','October','November','December',
	    ];
	    
	    dataset = [{
	        label: 'Connections',
		backgroundColor: 'rgb(0,0,0)',
		borderColor: 'rgb(0,0,0)',
		data: [janCount, febCount, marCount, 
		       aprCount, mayCount, junCount,
		       julCount, augCount, sepCount,
		       octCount, novCount, decCount],
	    }]

	}else if(timeSeries === "daily"){

	    // get today's date so we can count for the right month
	    var today = new Date();
	    var todayMonth = String(today.getMonth() + 1).padStart(2, '0');

	    // 31 slots in this array corresponding to 
	    // 31 max days in a month
	
            var dayCount = [0, 0, 0, 0, 0, 0, 0,
			    0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0, 0, 0, 0, 0,
		            0, 0, 0];

	    // counts the occurance of connections per month
	    for(let i=0; i<=connDataKeys.length-1; i++){
	        if(connDataInput[connDataKeys[i]].dateVisited){
			
		    visitedMonth = connDataInput[connDataKeys[i]].dateVisited[5] +
				  connDataInput[connDataKeys[i]].dateVisited[6];

		    if(visitedMonth === todayMonth){

	                visitedDay = connDataInput[connDataKeys[i]].dateVisited[8] + 
			            connDataInput[connDataKeys[i]].dateVisited[9];

		        switch(visitedDay){
		            case "01": dayCount[0] += 1; break;
		            case "02": dayCount[1] += 1; break;
		            case "03": dayCount[2] += 1; break;
		            case "04": dayCount[3] += 1; break;
		            case "05": dayCount[4] += 1; break;
		            case "06": dayCount[5] += 1; break;
		            case "07": dayCount[6] += 1; break;
		            case "08": dayCount[7] += 1; break;
		            case "09": dayCount[8] += 1; break;
		            case "10": dayCount[9] += 1; break;
		            case "11": dayCount[10] += 1; break;
		            case "12": dayCount[11] += 1; break;
		            case "13": dayCount[12] += 1; break;
			    case "14": dayCount[13] += 1; break;
			    case "15": dayCount[14] += 1; break;
			    case "16": dayCount[15] += 1; break;
			    case "17": dayCount[16] += 1; break;
			    case "18": dayCount[17] += 1; break;
			    case "19": dayCount[18] += 1; break;
			    case "20": dayCount[19] += 1; break;
			    case "21": dayCount[20] += 1; break;
			    case "22": dayCount[21] += 1; break;
			    case "23": dayCount[22] += 1; break;
			    case "24": dayCount[23] += 1; break;
			    case "25": dayCount[24] += 1; break;
			    case "26": dayCount[25] += 1; break;
			    case "27": dayCount[26] += 1; break;
			    case "28": dayCount[27] += 1; break;
			    case "29": dayCount[28] += 1; break;
			    case "30": dayCount[29] += 1; break;
			    case "31": dayCount[30] += 1; break;
		        }
		    }
	        }
	    }
	
	    labels = [
		'01','02','03','04','05','06','07',
		'08','09','10','11','12','13','14',
		'15','16','17','18','19','20','21',
		'22','23','24','25','26','27','28',
		'29','30','31',
	    ];
	    
	    
	    dataset = [{
	        label: 'Connections',
		backgroundColor: 'rgb(0,0,0)',
		borderColor: 'rgb(0,0,0)',
		data: [dayCount[0], dayCount[1], dayCount[2],
		       dayCount[3], dayCount[4], dayCount[5],
		       dayCount[6], dayCount[7], dayCount[8],
		       dayCount[9], dayCount[10], dayCount[11],
		       dayCount[12], dayCount[13], dayCount[14],
		       dayCount[15], dayCount[16], dayCount[17],
		       dayCount[18], dayCount[19], dayCount[20],
		       dayCount[21], dayCount[22], dayCount[23],
		       dayCount[24], dayCount[25], dayCount[26],
		       dayCount[27], dayCount[28], dayCount[29],
		       dayCount[30]]
	    }]
	
	}

	data = {
            labels: labels,
	    datasets: dataset
	};

        config = {
            type: 'line',
	    data, 
	    options: {
	        plugins: {
                    legend: {
			display: false,
		    },
		}, 
	    }
	}

	var myChart = new Chart(document.getElementById('myChart'), config);
    }


    // draws the small bar graph next to the top visitor list
    function drawVisitorBarChart(connDataInput) {
        var connDataKeys = Object.keys(connDataInput);
	var ipCount = {};
	var maxVisits = 0;

	// count the number of times each unique IP has connected
	for(let i=0; i<=connDataKeys.length-1; i++){
	    
	    visitorIP = connDataInput[connDataKeys[i]].ipAddress;

	    if(visitorIP) {
		if(visitorIP in ipCount){
		    ipCount[visitorIP] += 1;
		}else {
		    ipCount[visitorIP] = 1;
		}
	    }
	}

	// now that our ip count object has been created,
	// sort the values from largest to smallest

	ipCount = Object.fromEntries(
	    Object.entries(ipCount).sort(([,a],[,b]) => b-a)
	);

	var uniqueIPs = Object.keys(ipCount);
	
	// find the max number of visits to set the axis on the charts
	for(let i=0; i<=uniqueIPs.length-1; i++){
            if(ipCount[uniqueIPs[i]] > maxVisits){
                maxVisits = ipCount[uniqueIPs[i]];
	    }
	}

	// for each unique IP, add a new row to the 
	// topVisitorDiv table on the page
	
	var visitorTable = document.getElementById("topVisitorTable");

	// delete any old rows while keeping the header rows
	while(visitorTable.rows.length > 1){
	    visitorTable.deleteRow(1);
	}

	
	for(let i=0; i<=uniqueIPs.length-1; i++){
	
	    // only put the top 10 visitors
	    if(visitorTable.rows.length < 12) { 

	        var tableRow = visitorTable.insertRow(i+1);
	    
	        var ipCell = tableRow.insertCell(0);
	        var ipCountCell = tableRow.insertCell(1);

	        ipCell.innerHTML = uniqueIPs[i];
	        ipCell.setAttribute('class', 'textAlignCenter');

	        ipCountCell.innerHTML = ipCount[uniqueIPs[i]];
	        ipCountCell.setAttribute('class', 'textAlignRight');
			
	        var barCanvasDiv = document.createElement("DIV");
	        barCanvasDiv.setAttribute('class', 'visitorBarDiv');
	        var barCanvas = document.createElement("CANVAS");
	        barCanvas.setAttribute('id', 'visitorBarCanvas' + i);
	        barCanvasDiv.appendChild(barCanvas);
	 
	        ipCountCell.appendChild(barCanvasDiv);

	        // draw the bar chart in the div
	        barCanvas = document.getElementById("visitorBarCanvas" + i);
	   
	        const labels = [''];

	        const data = {
		    labels: labels,
		    datasets: [{
		        label: 'Visits',
		        backgroundColor: 'rgb(0, 0, 255)',
		        borderColor: 'rgb(0, 0, 255)',
		        data: [ipCount[uniqueIPs[i]]],
		    }]
	        };

	        const config = {
		    type: 'bar',
		    data,
		    options: {
		        plugins: {
                            legend: {
			        display: false,
			    },
			    title: {
			        display: false,
			    }
		        }, 
		        scales: {
			    x: {
			        display: false,
			        min: 0,
			        max: maxVisits, 
			        title: {
				    display: false,
			        },
			        grid: {
				    display: false,
			        }
			    },
			    y: {
                                title: {
			            display: false,
			        },
			        grid: {
				    display: false,
			        }
			    }
		        },

		        indexAxis: 'y',
		        responsive: true,
		        maintainAspectRatio: false
		    }
	        };
	    
	        var barChart = new Chart(barCanvas, config);
	    }
	}	
    }

    // second parameter is different nations
    // either worldwide or a specific country
    // TODO: implement different maps for 2nd parameter
    function drawGeoMap(connDataInput, nation){

	var connDataKeys = Object.keys(connDataInput);

	if(nation === "us"){
	
            const us = fetch ('https://unpkg.com/us-atlas/states-10m.json')
	    .then((r) => r.json())
	    .then((us) => {

	        // Whole US for the outline
	        const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
	        // individual states
	        const states = ChartGeo.topojson.feature(us, us.objects.states).features;

	        const stateLabels = [];

	        const stateData = [];

	        const stateCount = {};
	    
	        // store the labels for each state we have and then count them
	        for(var i=0; i<=connDataKeys.length-1; i++) {
		    if(connDataInput[connDataKeys[i]].state){
		        if(stateLabels.includes(connDataInput[connDataKeys[i]].state)){
			    // + 1 if it is there
			    stateCount[connDataInput[connDataKeys[i]].state] += 1;
		        }else{
			    // store it if its not
		            stateLabels.push(connDataInput[connDataKeys[i]].state);
			    stateCount[connDataInput[connDataKeys[i]].state] = 1;
		        }
		    }
	        }
	   
	        // once we have the correct count for each state, make the data object
	    
	        for(var i=0; i<stateLabels.length; i++){
                    stateData.push({feature: states.find((d) => d.properties.name === stateLabels[i]),
	    	                value: stateCount[stateLabels[i]]});
	        }
	    
                const data = {
                    labels: stateLabels,
	            datasets: [{
		        label: 'States',
		        outline: nation,
		        outlineBorderColor: "#000000",
		        showOutline: true,
		        data: stateData
	            }]
	        };

	        const config = {
	            type: 'choropleth',
	            data,
                    options: {
	                plugins: {
		            legend: {
		                display: false,
		            },
	                },
		        scales: {
		            xy: {
		                projection: 'albersUsa',
		            },
		            color: {
		                quantize: 10,
			        // changes the color scale for the data
			        interpolate: 'blues',
			        legend: {
			            position: 'bottom-right',
			            align: 'right',
			        },
		            },
		        },
	            },
	        };

	        const chart = new Chart(document.getElementById('geoChart').getContext('2d'), config);
	    });
	}
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

    this.getElementById("chartTimeSeries").addEventListener("change", function(){
	Chart.getChart('myChart').destroy();
	drawConnChart(connectionData, this.value);
    });
});
