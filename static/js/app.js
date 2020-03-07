// from data.js
var tableData = data;

// YOUR CODE HERE!

// get table references or all attributes of targeted body
var tbody = d3.select("tbody");


function buildTable(data)
{
    // first clear out any existing data (drop)
    tbody.html("");

    // second loop through each object in the data
    // append a row and cell for each value in the row
    data.forEach(function(dataRow)
        {
        //Append a row to the table body
        var row = tbody.append("tr");
        
        // Loop through each field in the dataRow and add
        // each value as a table cell
        Object.values(dataRow).forEach(function(val)
            {
            var cell = row.append("td");
            cell.text(val);
            })
        })


}

// Keep track of all the filters
var filters = {};

function filterTable()
{
    // Set the filterData to tableData
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(function([key,value])
    {
        filteredData = filteredData.filter((row) => row[key] == value);
    })

    buildTable(filteredData);
}

function updateFilters()
{
    // save the elements, values and id of the filter 
    //that was changed
    var changeElement = d3.select(this).select("input");
    var elementValue = changeElement.property("value");
    var filterId = changeElement.attr("id");

    // if a filter value was entered then add that filterId
    // and value to the filters list. Otherwise clear filter
    //from the filter object
    if (elementValue)
    {
        filters[filterId] = elementValue;
    }
    else 
    {
        delete filters[filterId];
    }

    // Call function to apply all filters and rebuild table
    // to do create a filterTable function
    filterTable()

}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);


// call the function to use it
// build the table when the page loads
buildTable(tableData);