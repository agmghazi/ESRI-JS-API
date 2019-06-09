class Toc {
    
    constructor(mapServiceLayer,tocElementString){
        
        this.tocElement = document.getElementById(tocElementString);

        //this code to generate table of content (visible & not visible)
        let toc = this.tocElement ;
        toc.innerHTML = "";
        let layerList = document.createElement("ul");
        toc.appendChild(layerList);
        //populate layer in list
        this.populateLayerRecursive(mapServiceLayer, layerList);
    }

     // populate layer Recursive in the input element
      populateLayerRecursive(thislayer, layerList) {

        let chk = document.createElement("input");
        chk.type = "checkbox";
        chk.value = thislayer.id;
        chk.checked = thislayer.visible;

        chk.addEventListener("click", e => { thislayer.visible = e.target.checked })

        let lbl = document.createElement("label");
        lbl.textContent = thislayer.title + "   ";

        let btn = document.createElement("button");
        btn.textContent = "view";

        //this method to get count for every layer
        //getCount(thislayer.id, btn);
        //on click, open attribut table
        btn.layerId = thislayer.id;
        btn.layerUrl =thislayer.url;
        btn.addEventListener("click", this.openAttributeTable);

        let layerItem = document.createElement("li");
        layerItem.appendChild(chk);
        layerItem.appendChild(lbl);
        layerList.appendChild(layerItem);
        layerItem.appendChild(btn);
        if (thislayer.sublayers != null && thislayer.sublayers.items.length > 0) {

            let newList = document.createElement("ul");
            layerList.appendChild(newList);

            for (let i = 0; i < thislayer.sublayers.length; i++) {

              this.populateLayerRecursive(thislayer.sublayers.items[i], newList)
            }
        }
    }
    
    openAttributeTable(e) {
        
        let attributeTable = new AttributeTable(e.target.layerUrl);

    }
}