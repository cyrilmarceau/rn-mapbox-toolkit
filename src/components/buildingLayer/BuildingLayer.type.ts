import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type BuildingLayerProps = {
  /**
   * The unique identifier for the layer.
   */
  layerID: string;
  /**
   * Data source identifier for the layer.
   */
  sourceID: string;

  /**
   * Minimum zoom level at which the layer is visible.
   * @default undefined (no minimum)
   */
  minZoom?: number;

  /**
   * Maximum zoom level at which the layer is visible.
   * @default undefined (no maximum)
   */
  maxZoom?: number;

  layerStyle?: {
    /**
     * This parameter defines the range for the fade-out effect before an automatic content cutoff on pitched map views.
     * Fade out is implemented by scaling down and removing buildings in the fade range in a staggered fashion.
     * Opacity is not changed. The fade range is expressed in relation to the height of the map view.
     * A value of 1.0 indicates that the content is faded to the same extent as the map's height in pixels, while a value close to zero represents a sharp cutoff.
     * When the value is set to 0.0, the cutoff is completely disabled.
     * Note: The property has no effect on the map if terrain is enabled.
     * @default 0
     */
    'building-cutoff-fade-range'?: Value<number>;
    /**
     * Given as a fraction specifies the likelihood for the facades to be emissive when building-facade is enabled.
     * A value of 0.0 means the window will never be emissive, while a value of 1.0 means the window will always be emissive.
     * This can be used to create variations on a building where some windows are lit and some are not.
     * @default 0
     */
    'building-facade-emissive-chance'?: Value<number>;
    /**
     * Number of floors created when building-facade is enabled.
     * @requires `building-facade`
     * @default 3
     */
    'building-facade-floors'?: Value<number>;

    /**
     * Width of a floor. Think of this as measure how wide each unit should be.
     * This effectively determines the number of units per each floor.
     * Note that this does not affect the ground level facades (i.e. number of windows).
     * @requires `building-facade`
     * @default 3.1
     */
    'building-facade-unit-width'?: Value<number>;

    /**
     * Given as fractions, specifies the percentage of unit area covered by windows when building-facade is enabled.
     * Note that the area of a unit is ultimately determined by `building-facade-unit-width` and `building-facade-floors`.
     * Must be between 0.1 and 1 inclusive
     * @requires `building-facade`
     * @default [0.9,0.9]
     */
    'building-facade-window'?: Value<[number, number]>;

    /**
     * Flips the orientation of the roofs for the buildings.
     * This only affects simple geometries. Namely buildings whose footprints form a quadrilateral.
     * By default (false), the roof ridge takes the direction of the longer edge of the quadrilateral.
     * @default false
     */
    'building-flip-roof-orientation'?: Value<boolean>;

    /**
     * The color of the flood light effect on the walls of the extruded buildings. Requires `lights`.
     * @default "#ffffff"
     */
    'building-flood-light-color'?: Value<string>;

    /**
     * Provides a control to futher fine-tune the look of the flood light on the ground beneath the extruded buildings.
     * Lower values give the effect a more solid look while higher values make it smoother. Requires `lights`.
     * @default 0.69
     */
    'building-flood-light-ground-attenuation'?: Value<number>;

    /**
     * The extent of the flood light effect on the ground beneath the buildings in meters. Requires `lights`.
     * @default 0
     */
    'building-flood-light-ground-radius'?: Value<[number, number]>;

    /**
     * The intensity of the flood light color. Requires `lights`.
     * Must be between 0 and 1 inclusive
     * @default 0
     */
    'building-flood-light-intensity'?: Value<number>;

    /**
     * The extent of the flood light effect on the walls of the buildings in meters.
     * @default 0
     */
    'building-flood-light-wall-radius'?: Value<number>;
  };

  /**
   * An expression specifying conditions on source features.
   * Only features that match the filter are displayed.
   * Zoom expressions in filters are only evaluated at integer zoom levels
   */
  filter?: Expression;

  /**
   * Event triggered when adding or updating a layer style *properties* fails.
   *
   * Note:
   * - If a style properties is add and fail but not typed in definitions files, this event will be trigger
   * - Currently, detailed error information may be limited.
   * @example 
   * 'Cannot set layer property: circle-radiuss error: circle layer doesn\'t support this property: circle-radiuss' => 'circle-radiuss': 5,
   * 'Cannot set layer property: circle-color error: value must be a valid color' => 'circle-color': '#fefe',
   
   */
  onLayerStyleError?: (e: OnLayerStyleError) => void;
};

/**
 * Type defining the style properties for a "circle" layer according to the Mapbox Style Specification.
 * @see https://docs.mapbox.com/style-spec/reference/layers/#background
 */
export type BackgroundStyle = Pick<BuildingLayerProps, 'layerStyle'>;
