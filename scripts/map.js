import 'ol/ol.css';
import{Map,View} from 'ol/';
import{Image as ImageLayer} from 'ol/Layer'; 
import ImageWMS from 'ol/source/ImageWMS';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Projection from 'ol/proj/Projection';

const serverUrl = "http://localhost:8080/geoserver/wms";

const mapProjection = new Projection ({
    code : 'EPSG:28191',
    units : 'm',
    axisOrientation : 'neu',
    global:false
});
const orthophotoSource = new TileWMS ({
    url :serverUrl,
    params :{"LAYERS":"Training:Orthophoto","VERSION":"1.1.1","FORMAT":"image/jpeg"}
});
const orthophotoLayer = new TileLayer({
    source : orthophotoSource,
    // @ts-ignore
    name:'Orthophoto',
    

});

const parcelsSource= new ImageWMS({
    url:serverUrl,
    params:{"LAYERS":"Training:Parcels","VERSION":"1.1.1","FORMAT":"image/png"},
});

const parcelsLayer=new ImageLayer({
    source:parcelsSource,
    // @ts-ignore
    name:'Parcels',
});

const buildingsSource= new ImageWMS({
    url:serverUrl,
    params:{"LAYERS":"Training:Buildings","VERSION":"1.1.1","FORMAT":"image/png"},
});

const buildingsLayer=new ImageLayer({
    source:buildingsSource,
    // @ts-ignore
    name:'Buildings',
});

const view=new View({
    extent:[165217.233, 151185.7259, 172973.3239, 155713.6059], 
    center:[168540,153370],
    zoom:0,
    projection : mapProjection,
});
const map=new Map({
    target:"Map",
    layers:[orthophotoLayer,parcelsLayer, buildingsLayer],
    view:view,

})
$('#Map').data('map',map);