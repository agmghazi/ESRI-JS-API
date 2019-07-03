class AttributeTable {

    //"https://sampleserver6.arcgisonline.com/arcgis/rest/services/" + selectdService + "/MapServer/";
    constructor(mapserviceLayerUrl, mapview) {
        this.buttonPages = [];

        this.mapview = mapview;
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
        const AttributeTableInstance = this;
        return new Promise((resolve, reject) => {

            let queryUrl = this.mapserviceLayerUrl + "query";

            // for show and check checkbox is true or not. 
            let extent = undefined;
            if (this.mapview.useExtent) extent = JSON.stringify(this.mapview.extent);

            let queryOption = {
                responseType: "json",
                query: {
                    f: "json",
                    where: "1=1",
                    geometry: extent,
                    inSR: JSON.stringify(AttributeTableInstance.mapview.extent.spatialReference),
                    geometryType: "esriGeometryEnvelope",
                    spatialRel: "esriSpatialRelIntersects",
                    returnCountOnly: true
                }
            }

            Request(queryUrl, queryOption)
                .then(response => resolve(response.data.count))
                .catch(err => reject(0));
        });
    }


    //to paging all recordes
    populatePages(featureCount, initPage = 1) {
        let pageCount = Math.ceil(featureCount / DefaultPageSize);
        let pagesDiv = document.getElementById("Pages");
        // pagesDiv.innerHTML = "";
        while (pagesDiv.firstChild)    // this to remove data after change layer
            pagesDiv.removeChild(pagesDiv.firstChild);

        let AttributeTableinstance = this;
        for (let i = 0; i < pageCount; i++) {
            let page = document.createElement("button");
            page.textContent = i + 1;
            this.buttonPages.push(page);
            page.attributeTable = this;
            page.pageNumber = i + 1;
            // heighlight the first page.
            if (i + 1 === initPage) page.style.color = "red";
            page.featureCount = featureCount;
            page.addEventListener("click", function (e) {
                AttributeTableinstance.restPages();
                e.target.style.color = "red";
                AttributeTableinstance.populateAtributeTable(i + 1, featureCount);
            })
            pagesDiv.appendChild(page);
        }
        // alert("page count : " + pageCount);
    }

    zoom(e) {
        let oid = e.target.oid;
        let url = e.target.url;
        // alert(oid + "-" + url)

        let queryUrl = url + "query";

        let queryOption = {
            responseType: "json",
            query: {
                f: "json",
                objectIds: oid,
                returnGeometry: true,
                outSR: 4326
            }
        }

        Request(queryUrl, queryOption)
            .then(response => {
                // when we get the geometry back, create graphic and zoom...
                //  alert("Sucess"+ JSON.stringify(response))
                //   alert(JSON.stringify(response.data));
                drawGeometry(response.data.features[0].geometry);
            })
            .catch(err => reject(alert("ERRor" + Rerr)));
    }

    //populate the attribute of a given layer
    populateAtributeTable(page, featureCount) {

        let queryUrl = this.mapserviceLayerUrl + "query";
        
        // for show and check checkbox is true or not. 
        let extent = undefined;
        if (this.mapview.useExtent) extent = JSON.stringify(this.mapview.extent);
        
        let attributeTable = document.getElementById("attributeTable");
        attributeTable.innerHTML = "";
        let queryOption = {
            responseType: "json",
            query: {
                f: "json",
                where: "1=1",
                geometry: extent,
                inSR: JSON.stringify(this.mapview.extent.spatialReference),
                geometryType: "esriGeometryEnvelope",
                spatialRel: "esriSpatialRelEnvelopeIntersects",
                returnCountOnly: false,
                outFields: "*",
                resultOffset: (page - 1) * DefaultPageSize,
                resultRecordCount: DefaultPageSize
            }
        }


        Request(queryUrl, queryOption).then(response => {

            //alert(response.data.fields.length);
            let table = document.createElement("table");
            table.border = 2;
            let header = document.createElement("tr");
            table.appendChild(header);

            //populate zoom column
            let zoomHeader = document.createElement("th");
            zoomHeader.textContent = "zoom";
            header.appendChild(zoomHeader);

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
                let zoomColumn = document.createElement("td");
                let img = document.createElement("img");
                img.style.width = "32px";
                img.style.height = "32px";
                img.src = "zoom.png";
                img.url = this.mapserviceLayerUrl;
                img.addEventListener("click", this.zoom);
                zoomColumn.appendChild(img);
                row.appendChild(zoomColumn);


                table.appendChild(row);
                for (let i = 0; i < response.data.fields.length; i++) {

                    let field = response.data.fields[i];

                    let column = document.createElement("td");

                    // this to convert datetime from EPOCH(this to use samply to use by any thing in programming
                    //  (samply to convert to mile second)) to Date
                    if (field.type === "esriFieldTypeOID") {
                        img.oid = feature.attributes[field.name];
                    }
                    if (field.type === "esriFieldTypeDate") {

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