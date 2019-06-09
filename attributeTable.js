class AttributeTable {

    //"https://sampleserver6.arcgisonline.com/arcgis/rest/services/" + selectdService + "/MapServer/";
    constructor(mapserviceLayerUrl) {
        this.buttonPages = [];

        this.mapserviceLayerUrl = mapserviceLayerUrl + "/";

        this.getCount()
            .then(c => {
                this.populatePages(c);
                this.populateAtributeTable(1, c)
            })
            .catch(err => ("error! " + err));
    }


    restPages() {
        this.buttonPages.forEach(b => {
            b.style.color = "black";
        })
    }


    getCount() {
        return new Promise((resolve, reject) => {

            let queryUrl = this.mapserviceLayerUrl + "query";

            let queryOption = {
                responseType: "json",
                query: {
                    f: "json",
                    where: "1=1",
                    returnCountOnly: true
                }
            }

            Request(queryUrl, queryOption)
                .then(response => resolve(response.data.count))
                .catch(err => reject(0));
        });
    }


    //to paging all recordes
    populatePages(featureCount) {
        let pageCount = Math.ceil(featureCount / DefaultPageSize);
        let pagesDiv = document.getElementById("Pages");
        pagesDiv.innerHTML = "";
        let AttributeTableinstance = this;

        for (let i = 0; i < pageCount; i++) {
            let page = document.createElement("button");
            page.textContent = i + 1;
            this.buttonPages.push(page);
            page.addEventListener("click", function (e) {
                AttributeTableinstance.restPages();
                e.target.style.color = "red";
                AttributeTableinstance.populateAtributeTable(i + 1, featureCount);
            })
            pagesDiv.appendChild(page);
        }
        // alert("page count : " + pageCount);
    }



    //populate the attribute of a given layer
    populateAtributeTable(page, featureCount) {

        let queryUrl = this.mapserviceLayerUrl + "query";

        let attributeTable = document.getElementById("attributeTable");
        attributeTable.innerHTML = "";
        let queryOption = {
            responseType: "json",
            query: {
                f: "json",
                where: "1=1",
                returnCountOnly: false,
                outFields: "*",
                resultOffset: (page - 1) * DefaultPageSize + 1,
                resultRecordCount: DefaultPageSize
            }
        }

        Request(queryUrl, queryOption).then(response => {

            //alert(response.data.fields.length);
            let table = document.createElement("table");
            table.border = 2;
            let header = document.createElement("tr");
            table.appendChild(header);
            //populate the fileds / columns
            for (let i = 0; i < response.data.fields.length; i++) {

                let column = document.createElement("th");
                column.textContent = response.data.fields[i].alias;
                header.appendChild(column);
            }

            //loop through all features
            for (let j = 0; j < response.data.features.length; j++) {
                let feature = response.data.features[j];
                let row = document.createElement("tr");
                table.appendChild(row);
                for (let i = 0; i < response.data.fields.length; i++) {

                    let field = response.data.fields[i];

                    let column = document.createElement("td");

                    // this to convert datetime from EPOCH(this to use samply to use by any thing in programming
                    //  (samply to convert to mile second)) to Date
                    if (field.type == "esriFieldTypeDate") {

                        let date = new Date(feature.attributes[field.name]);
                        column.textContent = date.toLocaleDateString('en-US');;
                    }
                    else {
                        column.textContent = feature.attributes[field.name];

                    }
                    row.appendChild(column);
                }
            }


            attributeTable.appendChild(table);

        }, response => el.style.visibility = "hidden");
    }


}