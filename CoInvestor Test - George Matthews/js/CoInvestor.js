//Author - George Matthews
//Work Date - 22/04/2017 - 23/04/2017
//Tested on Google Chrome and Firefox
 
 
//The number of Managers to be displayed before moving onto the next row. Recommended number is 4. 
//Potential future improvement, allow users to change this number with option in corner of page.
var rowWidth = 4; 

 
/**
*	When the document is ready, display the managers of the first page. 
*/
$(document).ready(function(){
	console.log("Document Ready Call started");
	displayManagers(1);	


/**
*	Retrieves the number of pages of managers in the data and creates custom buttons to navigate to each page. Serves as wrapper for all functions.
*	@param {object} data the JSON data of all Managers. 
*/	
function getPageButtons(data){
		for(i=1; i <= data.meta.pagination.total_pages; i++){
			var button = $('<button value="click" class="pageButton" id="'+ i +'">Page ' + i + '</button>'); 
			$('#pages').append(button);
		}
}

/**
*	Decides which JSON link is required for the requested page, and then calls functions that build the managers of that page and assembles the buttons for navigation.
*	@param {integer} page the requested page. 
*/
function displayManagers(page){
	var pageDataLink = "http://demo.api.coinvestor.co.uk/sponsor?page="+page;
	if(page == 1) pageDataLink = "http://demo.api.coinvestor.co.uk/sponsor";
	$.get(pageDataLink, {}, function(data) {
		buildManager(data);
		getPageButtons(data);
	}, 'json');
}

/**
*	When a page button is clicked, the Managers on the page are removed, as well as the page buttons for refreshing. displayManagers is called with the id of the pressed button.
*/	
$('#pages').on('click', '.pageButton', function() {
	$('#TableData').remove();
	$('.pageButton').remove();
	displayManagers(this.id);

});

/**
*	Displays a list of all the managers with CoInvestor. 
*	@param {object} input the JSON input data recieved from the above request. 
*/
function buildManager(input){
	//Opens the first row of the table, remaining openings and closings are handled below.
	$('#ManagersTable').append('<tr>');
	
	$('#ManagersTable').append('<div id="TableData"></div>');
	
	for(var i=0; i < input.data.length; i++){
		var manager = input.data[i];
		var managerBox = $(
		//Creation of the Manager Box
		"<td><div id='"+manager.id+"' class='manager'>"+
		//The Manager Name
		"<div class='name'>"+manager.attributes.name+"</div>"+
		//The Logo and link to website as a single element. Error with Json, Placeholder used. 
		"<a href='https://www.coinvestor.co.uk/managers/"+manager.attributes.url_slug+"'><img src = 'css/logo-placeholder.png' id='sponsorLogoPlaceholder' alt='View'></a>"+
		//The Manager's Investment Phases
		"<div class='venPhases'>"+getInvestmentPhases(manager)+"</div>"+
		//The Manager description
		"<div class='description'>"+manager.attributes.marketing.description_header+"</div>"+
		//The address of the Manager.
		"<div class='address'>"+getAddresses(manager)+"</div>"+
		//The sponsor types of the manager.
		"<div class='sponTypes'>"+getSponsorTypes(manager)+"</div>"+
		"</div><td>");
		$('#TableData').append(managerBox);
		
		if((i+1) % rowWidth == 0){
			$('#TableData').append("</tr><tr>");
		}
	}
}

/**
*	Retrieves and assembles the address of the inputted Manager. 
*	@param {Object} manager the manager who's address will be returned. 
*	@return {string} the assembled address of the Manager.
*/	
function getAddresses(manager){
	var addresses = "";
	for(var i = 0; i < manager.attributes.addresses.length; i++){
		var address = manager.attributes.addresses[i];
		addresses += "<br>"+address.address1+"<br>"+address.address2+"<br>"+address.address3+"<br>"+address.city+"<br>"+address.post_code+getCountry(address.country);
	}
	return addresses;
}

/**
*	Retrieves the country name of a manager from it's countrycode. Currently not functioning, requires post-build amendment. 
*	@param {integer} code the Manager's country code. 
*	@return {string}  the name of the manager's country.  
*/	
function getCountry(code){
	$.get("http://data.okfn.org/data/core/country-codes/r/country-codes.json", {}, function(data) {
		for(var i = 0; i < data.length; i++){
			if(data[i].M49 == code){
				console.log(data[i].official_name_en);
				return "<br>"+data[i].official_name_en;
			}
		}
	}, 'json');
	return "";
}

/**
*	Returns the Investment Phases of the Manager. 
*	@param {object} manager the manager who's investment phases will be returned. 
*	@return {string} the investment phases of the manager. 
*/
function getInvestmentPhases(manager){
	var investmentPhases = "<div class='phases'>";
	for(var i = 0; i < manager.attributes.investment_phases.length; i++){
		var phase = manager.attributes.investment_phases[i];
		investmentPhases += phase.value + " ";
	}
	investmentPhases += "</div>"
	return investmentPhases;
}

/**
*	Returns the Sponsor Types of the Manager. 
*	@param {Object} manager the manager who's Sponsor Types will be returned. 
*	@return {string} the Sponsor Types of the manager 
*/
function getSponsorTypes(manager){
	var sponsorTypes = "<br><div class = 'types'>" + manager.attributes.primary_sponsor_type.value + " ";
		for(var i = 0; i < manager.attributes.other_sponsor_types.length; i++){
		var type = manager.attributes.other_sponsor_types[i];
		sponsorTypes += type.value + " ";
	}
	sponsorTypes += "</div>"
	return sponsorTypes;
}

});