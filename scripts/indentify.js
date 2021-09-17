import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import {toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {getLayerByName} from './customFunctions';

const map = $('#Map').data('map');

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  if($('#draggable-title').text()!=="Measure")
  {
    const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

// Get the layer by its name
const parcelsLayer = getLayerByName('Parcels');
const parcelsSource = parcelsLayer.getSource();
const buildingsLayer = getLayerByName('Buildings');
const buildingsSource = buildingsLayer.getSource();
const view=map.getView();
const resolution=view.getResolution();
const projection=view.getProjection();


const parcelInfo=$('#parcel-info');
parcelInfo.html('');

const buildingInfo=$('#building-info');
buildingInfo.html('');

const noFeatures=$('#no-features');
noFeatures.html('<P>No Features</P>')


const parcelUrl=parcelsSource.getFeatureInfoUrl(coordinate,resolution,projection,{'INFO_FORMAT':'application/json'});

const buildingUrl=buildingsSource.getFeatureInfoUrl(coordinate,resolution,projection,{'INFO_FORMAT':'application/json'});


if(parcelUrl)
{
    $.ajax({
        url: parcelUrl,
        method : 'GET',
        success : function(result){
            const parcel=result.features[0];
            if(parcel){
              const parcelNumber=parcel.properties.parcel_n;
              const blockNumber=parcel.properties.block_n;
              const parcelArea=parcel.properties.shape_area;
  
              parcelInfo.html(`
              <h5>Parcels info</h5> <p>Parcel Number:${parcelNumber}</p>
              <p>Block Number:${blockNumber} </p>
              <p>Area (sqm) :${parcelArea.toFixed(2)} </p>`);
              noFeatures.html('');

            }
        }
    }) 
}

if(buildingUrl)
{
    $.ajax({
        url: buildingUrl,
        method : 'GET',
        success : function(result){

            const building=result.features[0];
            if(building){

            const buildingNumber=building.properties.building_n;
            const buildingArea=building.properties.shape_area;
            buildingInfo.html(`
            <h5>Building info</h5> <p>building Number:${buildingNumber}</p> <p>building (sqm) :${buildingArea.toFixed(2)} </p>`);
            noFeatures.html('')
            }
            
        }
    }) 
}
 
  overlay.setPosition(coordinate);
  }
  
});
