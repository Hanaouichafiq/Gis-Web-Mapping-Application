import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';


const map=$("#Map").data("map");

const mousePosition = new MousePosition({
    coordinateFormat:createStringXY(2),
    className:"badge badge-pill badge-warning",
    target:"coordinates"
});
map.addControl(mousePosition);