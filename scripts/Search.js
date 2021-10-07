import {Style,Stroke} from "ol/style";
import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { WFS,GeoJSON } from "ol/format";
import { and, equalTo,or } from "ol/format/filter";

const map = $('#Map').data('map');

const searchBtn=$('#search');

const wfsUrl = 'http://localhost:8080/geoserver/Training/wfs';

const vectorSource=new VectorSource();
const style=new Style({
    stroke:new Stroke({
        color:'blue',
        width:2
    })
})
const vector = new Vector  ({
    source:vectorSource,
    style : style

});

map.addLayer(vector);

searchBtn.click(function(){

    const parcel = $('#parcelInput').val().toString();
    const block = $('#blockInput').val().toString();

    // if(parcel.length==0){
    //     window.alert ('please enter parcel number');
    // }
    // if(block.length==0){
    //     window.alert ('please enter block number');
    // }

    const featureRequest = new WFS().writeGetFeature({

        srsName:'EPSG:28191',
        featureNS:'http://localhost:8080/geoserver/Trainig',
        featurePrefix:'Parcels',
        featureTypes:['Parcels'],
        outputFormat:'application/json',
        filter: or(
            equalTo('parcel_n',parcel),
            equalTo('block_n',block),
        )
    });

    fetch(wfsUrl,{
        method:'Post',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(function(response){
        return response.json();
    }).then(function(json){

        if (json.features.length>0)
        {
            const features = new GeoJSON().readFeatures(json);
            vectorSource.clear(true);
            vectorSource.addFeatures(features);

            map.getView().fit(vectorSource.getExtent(),{'padding':[100,100,100,100]});
        }
        else {
            window.alert('No features found');
        }

    })

});
