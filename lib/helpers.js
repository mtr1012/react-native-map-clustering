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
      width: RV(69),
      height: RV(69),
      size: RV(49),
      fontSize: RV(17)
    };
  }

  if (points >= 25) {
    return {
      width: RV(63),
      height: RV(63),
      size: RV(43),
      fontSize: RV(16)
    };
  }

  if (points >= 15) {
    return {
      width: RV(57),
      height: RV(57),
      size: RV(39),
      fontSize: RV(15)
    };
  }

  if (points >= 10) {
    return {
      width: RV(51),
      height: RV(51),
      size: RV(35),
      fontSize: RV(14)
    };
  }

  if (points >= 8) {
    return {
      width: RV(45),
      height: RV(45),
      size: RV(31),
      fontSize: RV(13)
    };
  }

  if (points >= 4) {
    return {
      width: RV(39),
      height: RV(39),
      size: RV(25),
      fontSize: RV(12)
    };
  }

  return {
    width: RV(33),
    height: RV(33),
    size: RV(21),
    fontSize: RV(11)
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
