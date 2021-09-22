function buildPlot() {

    /* data route */
    const url = "/api/pals";
    d3.json(url).then(function(response) {

        console.log(response);

        const data = response;

        const layout = {
            scope: "usa",
            title: "Pet Pals",
            showlegend: false,
            height: 600,
            // width: 980,
            geo: {
                scope: "usa",
                projection: {
                    type: "albers usa"
                },
                showland: true,
                landcolor: "rgb(217, 217, 217)",
                subunitwidth: 1,
                countrywidth: 1,
                subunitcolor: "rgb(255,255,255)",
                countrycolor: "rgb(255,255,255)"
            }
        };

        Plotly.newPlot("plot", data, layout);
        //buildTable();

    });
}

function buildTable() {
    /* data route */
    const url = "/api/palsdata";
    d3.json(url).then(function(response) {
        console.log(response);
        const data = response;
        dataArr = [];
        for (let i = 0; i < data[0].text.length; i++) {
            dataArr.push({ "NAME": data[0].text[i], "LAT": data[0].lat[i], "LONG": data[0].lon[i] });
        }
        // render the table(s)
        tabulate(dataArr, ['NAME', 'LAT', 'LONG']);
    });
}

function tabulate(data, columns) {
    console.log(data);
    var table = d3.select('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {

                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append('td')
        .text(function(d) { return d.value; });

    return table;
}
buildPlot();