import { Component } from '@angular/core';
import { tileLayer, latLng, polyline, icon, marker, Map, point, LatLng, LatLngBounds, featureGroup, layerGroup, circleMarker, circle, geoJSON, divIcon, GeoJSONOptions } from 'leaflet';
import { customIcon, CustomIconContainerType } from './customicon.control';
import { GeoJsonObject } from 'geojson';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private mapReference: Map;
  private toggleRoutes: boolean = true;
  private toggleMarkers: boolean = true;

  /*
    https://www.openstreetmap.org base
  */
  openStreetMapsBase = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    detectRetina: true
  });

  /*
    https://maps.google.com base
  */
  googleMapsBase = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });

  /*
    https://www.opentopomap.org base
  */
  openTopMapsBase = tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    detectRetina: true
  })

  /*
    AMCS Maumee office

    Standard marker with a standard built-in leaflet icon
  */
  amcsMaumeeMarker = marker([41.586731, -83.681754], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  }).bindPopup('<div>AMCS Maumee</div><div>1701 Indianwood Circle</div><div>Maumee, OH 43537</div>');

  /*
    Restaraunt marker

    This is a GeoJSON example
  */
  buffaloWildWingsMarker = geoJSON({
    "type": "Feature",
    "properties": {
      "name": "Buffalo Wild Wings",
      "amenity": "Restaraunt",
      "popupContent": "This is a tasty restaraunt"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-83.677389, 41.581863]
    },
    "id": 1
  } as GeoJsonObject, {
    pointToLayer: (feature, latLng) => {
      return marker(latLng, {icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
      })});
    }
  }).bindPopup('Buffalo Wild Wings! (GeoJSON marker)');

  /*
    Home marker for jay's fortress of solitude.

    This is a standard marker, but uses a divIcon which allows us to put in custom HTML code in place
    of the built-in leaflet marker images

    Note: The CSS and sprite used for this example is taken from the Leaflet.awesome-markers package
  */
  homeMarker = marker([ 41.595911, -83.696077 ], {
    icon: divIcon({
      iconAnchor: [ 18, 41 ],
      className: "leaflet-div-icon-transparent-background",
      html: "<div class='awesome-marker awesome-marker-icon-darkred'><i style='color: #fff' class='fas fa-recycle'></i></div>"
    })
  }).bindPopup('<div>Home Station</div><div>Valley Stream Blvd.</div><div>Maumee OH, 43537</div>');

  /*
    Marker that uses the customIcon class
  */
  customFontAwesomeMarker = marker([ 41.585631, -83.687254 ], {
    icon: customIcon({
      containerType: CustomIconContainerType.GpsMarker,
      iconName: "flag-checkered",
      containerColor: "#841ca4"
    })
  });

  /*
    Same marker type as above, but uses a "box" container type instead of a GpsMarker
  */
  customFontAwesomeBlock = marker([41.590864, -83.689203], {
    icon: customIcon({
      containerType: CustomIconContainerType.Box,
      iconName: "flag-checkered",
      containerColor: "#098124"
    })
  });

  /*
    Radius circle around jay's ( radius is in meters )
  */
  homeMarkerRadius = circle([ 41.595911, -83.696077 ], {
    radius: 804.344,
    color : 'red',
    opacity: 0.3
  });

  // Route from home to amcs maumee
  routeFromHomeToWork = polyline([[41.595911, -83.696077],
    [41.595582, -83.696077],
    [41.595571, -83.694514],
    [41.595537, -83.693316],
    [41.595503, -83.692694],
    [41.595163, -83.687732],
    [41.595026, -83.686306],
    [41.594675, -83.684197],
    [41.594516, -83.684000],
    [41.593835, -83.683089],
    [41.592904, -83.681784],
    [41.590453, -83.678659],
    [41.589670, -83.677642],
    [41.589353, -83.678097],
    [41.588978, -83.678674],
    [41.588694, -83.679417],
    [41.588456, -83.680070],
    [41.588286, -83.680555],
    [41.588013, -83.680449],
    [41.587440, -83.680176],
    [41.587174, -83.680062],
    [41.586731, -83.681754]])
      .setStyle({ color: 'black', opacity: .5, weight: 6})
      .bindTooltip('Jay\'s route from home to work');

  routeFromWorkToFood = polyline([
    [41.587174, -83.680062],
    [41.586731, -83.681754],
    [41.587204, -83.680080],
    [41.586739, -83.679780],
    [41.586161, -83.679426],
    [41.585768, -83.679115],
    [41.585246, -83.678653],
    [41.584564, -83.678181],
    [41.584356, -83.678600],
    [41.584019, -83.679190],
    [41.583738, -83.679834],
    [41.583601, -83.680284],
    [41.583417, -83.680810],
    [41.583361, -83.681293],
    [41.582494, -83.681100],
    [41.582044, -83.681014],
    [41.581324, -83.680892],
    [41.581276, -83.680400],
    [41.581233, -83.679986],
    [41.581233, -83.679737],
    [41.581305, -83.679182],
    [41.581863, -83.677389]], { color : 'red', opacity: 0.5, weight : 6})
      .bindTooltip('Route from AMCS Maumee to Buffalo Wild Wings');

  // Layers control object with our two base layers and the marker overlay layers
  layersControl = {
    baseLayers: {
      'OpenStreetMaps Base': this.openStreetMapsBase,
      'Google Maps Base': this.googleMapsBase,
      'OpenTopographyMaps Base': this.openTopMapsBase
    },
    overlays: {
      'Buffalo Wild Wings': this.buffaloWildWingsMarker,
      'Jay\'s Home': this.homeMarker,
      'AMCS Maumee Office': this.amcsMaumeeMarker,
      'Jay\'s drive to work': this.routeFromHomeToWork,
      'Drive from work to food': this.routeFromWorkToFood,
      'Jay\'s Home Radius': this.homeMarkerRadius,
      'Custom FontAwesomeMarker': this.customFontAwesomeMarker
    }
  };

  options = {
    layers: [ 
      this.openStreetMapsBase,
      this.routeFromHomeToWork, 
      this.buffaloWildWingsMarker, 
      this.homeMarker, 
      this.amcsMaumeeMarker, 
      this.routeFromWorkToFood, 
      this.customFontAwesomeMarker,
      this.customFontAwesomeBlock
    ],
    zoom: 7,
    center: latLng([ 41.588295, -83.680579 ])
  };

  /*
    Lifecyle method that is called via leafletMapReady event
  */
  onMapReady(map: Map) {

    /*
      Any leaflet layer can be exported to GeoJSON via toGeoJSON method as shown below
    */
    console.log(this.homeMarkerRadius.toGeoJSON());
    console.log(this.routeFromHomeToWork.toGeoJSON());

    /*
      Here we grab a reference to the created map, so we can use throughout our component
    */
    this.mapReference = map;

    /*
      By adding all of the given routes, markers, etc., to a feature group, we can call the getBounds method on the feature group instead of 
      individual layers, which allows us to get the bounds of all of our secondary layers ( markers, polylines, etc., etc. )
    */
    const markerGroup = featureGroup([
      this.routeFromHomeToWork, 
      this.routeFromHomeToWork, 
      this.amcsMaumeeMarker, 
      this.buffaloWildWingsMarker, 
      this.homeMarker,
      this.customFontAwesomeMarker
    ]);

    map.fitBounds(markerGroup.getBounds(), {
      padding: point(15, 15),
      maxZoom: 25,
      animate: true
    });
  }

  /*
    These are crude examples, but they demonstrate at a simplistic level how we can manipulate
    the map layers via our own controls instead of built in leaflet controls
  */

  onToggleRoutesClick(){
    if(this.toggleRoutes){
      this.mapReference.removeLayer(this.routeFromHomeToWork);
      this.mapReference.removeLayer(this.routeFromWorkToFood);
      this.toggleRoutes = false;
    }
    else{
      this.mapReference.addLayer(this.routeFromHomeToWork);
      this.mapReference.addLayer(this.routeFromWorkToFood);
      this.toggleRoutes = true;
    }
  }

  onToggleMarkersClick(){
    if(this.toggleMarkers){
      this.mapReference.removeLayer(this.amcsMaumeeMarker);
      this.mapReference.removeLayer(this.buffaloWildWingsMarker);
      this.mapReference.removeLayer(this.homeMarker);
      this.toggleMarkers = false;
    }
    else {
      this.mapReference.addLayer(this.amcsMaumeeMarker);
      this.mapReference.addLayer(this.buffaloWildWingsMarker);
      this.mapReference.addLayer(this.homeMarker);
      this.toggleMarkers = true;
    }
  }

  onRecenterBoundsClick() {    
    const markerGroup = featureGroup([this.routeFromHomeToWork, this.routeFromHomeToWork, this.amcsMaumeeMarker, this.buffaloWildWingsMarker, this.homeMarker]);

    this.mapReference.fitBounds(markerGroup.getBounds(), {
      padding: point(15, 15),
      maxZoom: 25,
      animate: true
    });
  }
}
