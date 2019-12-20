import GeoViewport from "@mapbox/geo-viewport";
import { Dimensions } from "react-native";
import { RV } from './responsive'

const { width, height } = Dimensions.get("window");

export const isMarker = child =>
  child &&
  child.props &&
  child.props.coordinate &&
  child.props.cluster !== false;

export const calculateBBox = region => {
  let lngD;
  if (region.longitudeDelta < 0) lngD = region.longitudeDelta + 360;
  else lngD = region.longitudeDelta;

  return [
    region.longitude - lngD, // westLng - min lng
    region.latitude - region.latitudeDelta, // southLat - min lat
    region.longitude + lngD, // eastLng - max lng
    region.latitude + region.latitudeDelta // northLat - max lat
  ];
};

export const returnMapZoom = (region, bBox, minZoom) => {
  const viewport =
    region.longitudeDelta >= 40
      ? { zoom: minZoom }
      : GeoViewport.viewport(bBox, [width, height]);

  return viewport.zoom;
};

export const markerToGeoJSONFeature = (marker, index) => {
  return {
    type: "Feature",
    geometry: {
      coordinates: [
        marker.props.coordinate.longitude,
        marker.props.coordinate.latitude
      ],
      type: "Point"
    },
    properties: {
      point_count: 0,
      index,
      ..._removeChildrenFromProps(marker.props)
    }
  };
};

export const returnMarkerStyle = points => {
  if (points >= 50) {
    return {
      width: RV(64),
      height: RV(64),
      size: RV(44),
      fontSize: RV(16)
    };
  }

  if (points >= 25) {
    return {
      width: RV(58),
      height: RV(58),
      size: RV(38),
      fontSize: RV(15)
    };
  }

  if (points >= 15) {
    return {
      width: RV(52),
      height: RV(52),
      size: RV(34),
      fontSize: RV(14)
    };
  }

  if (points >= 10) {
    return {
      width: RV(46),
      height: RV(46),
      size: RV(30),
      fontSize: RV(13)
    };
  }

  if (points >= 8) {
    return {
      width: RV(40),
      height: RV(40),
      size: RV(26),
      fontSize: RV(12)
    };
  }

  if (points >= 4) {
    return {
      width: RV(34),
      height: RV(34),
      size: RV(20),
      fontSize: RV(11)
    };
  }

  return {
    width: RV(28),
    height: RV(28),
    size: RV(16),
    fontSize: RV(10)
  };
};

const _removeChildrenFromProps = props => {
  const newProps = {};
  Object.keys(props).forEach(key => {
    if (key !== "children") {
      newProps[key] = props[key];
    }
  });
  return newProps;
};
