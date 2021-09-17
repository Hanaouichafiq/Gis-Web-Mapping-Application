const { default: LayerRenderer } = require("ol/src/renderer/Layer");

const map = $('#Map').data('map');
const mapLayers=map.getLayers();

export function getLayerByName(layerName){
     let layer = null;

     mapLayers.forEach(lyr => {
         if(lyr.get('name')===layerName)
         layer=lyr;
    
     });
     return layer;
}