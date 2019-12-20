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
      width: 74,
      height: 74,
      size: 54,
      fontSize: 18
    };
  }

  if (points >= 25) {
    return {
      width: RV(68),
      height: RV(68),
      size: RV(48),
      fontSize: RV(17)
    };
  }

  if (points >= 15) {
    return {
      width: RV(62),
      height: RV(62),
      size: RV(44),
      fontSize: RV(16)
    };
  }

  if (points >= 10) {
    return {
      width: RV(56),
      height: RV(56),
      size: RV(40),
      fontSize: RV(15)
    };
  }

  if (points >= 8) {
    return {
      width: RV(50),
      height: RV(50),
      size: RV(36),
      fontSize: RV(14)
    };
  }

  if (points >= 4) {
    return {
      width: RV(44),
      height: RV(44),
      size: RV(30),
      fontSize: RV(13)
    };
  }

  return {
    width: RV(38),
    height: RV(38),
    size: RV(26),
    fontSize: RV(12)
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
