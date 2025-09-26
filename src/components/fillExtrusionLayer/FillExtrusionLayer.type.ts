import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type FillExtrusionLayerProps = {
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
     * Provides a control to futher fine-tune the look of the ambient occlusion on the ground beneath the extruded buildings.
     * Lower values give the effect a more solid look while higher values make it smoother.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-ambient-occlusion-ground-attenuation
     * @default 0.69
     */
    'fill-extrusion-ambient-occlusion-ground-attenuation'?: Value<number>;

    /**
     * The extent of the ambient occlusion effect on the ground beneath the extruded buildings in meters.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-ambient-occlusion-ground-radius
     * @default 3
     */
    'fill-extrusion-ambient-occlusion-ground-radius'?: Value<number>;

    /**
     * Controls the intensity of shading near ground and concave angles between walls.
     * Default value 0.0 disables ambient occlusion and values around 0.3 provide the most plausible results for buildings.
     * Must be between 0 and 1 inclusive
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-ambient-occlusion-intensity
     * @default 0.0
     */
    'fill-extrusion-ambient-occlusion-intensity'?: Value<number>;

    /**
     * Shades area near ground and concave angles between walls where the radius defines only vertical impact.
     * Default value 3.0 corresponds to height of one floor and brings the most plausible results for buildings.
     * This property works only with legacy light.
     * When 3D lights are enabled fill-extrusion-ambient-occlusion-wall-radius and fill-extrusion-ambient-occlusion-ground-radius are used instead.
     *
     * Requires `fill-extrusion-edge-radius` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-ambient-occlusion-radius
     * @default 3
     */
    'fill-extrusion-ambient-occlusion-radius'?: Value<number>;

    /**
     * Shades area near ground and concave angles between walls where the radius defines only vertical impact.
     * Default value 3.0 corresponds to height of one floor and brings the most plausible results for buildings.
     *
     * Requires `fill-extrusion-edge-radius` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-ambient-occlusion-wall-radius
     * @default 3
     */
    'fill-extrusion-ambient-occlusion-wall-radius'?: Value<number>;

    /**
     * The height with which to extrude the base of this layer. Must be less than or equal to fill-extrusion-height. Units in meters
     *
     * Requires `fill-extrusion-height` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-base
     * @default 0
     */
    'fill-extrusion-base'?: Value<number>;

    /**
     * Controls the behavior of fill extrusion base over terrain
     * "terrain": The fill extrusion base follows terrain slope.
     * "flat": The fill extrusion base is flat over terrain.
     *
     * Requires `fill-extrusion-base` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-base-alignment
     * @default "terrain"
     */
    'fill-extrusion-base-alignment'?: Value<'terrain' | 'flat'>;

    /**
     * Enable/Disable shadow casting for this layer
     *
     * Requires `fill-extrusion-base` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-cast-shadows
     * @default "false"
     */
    'fill-extrusion-cast-shadows'?: Value<boolean>;

    /**
     * The base color of the extruded fill.
     * The extrusion's surfaces will be shaded differently based on this color in combination with the root light settings.
     * If this color is specified as rgba with an alpha component, the alpha component will be ignored; use fill-extrusion-opacity to set layer opacity.
     *
     * Disabled by `fill-extrusion-pattern` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-color
     * @default "#000000"
     */
    'fill-extrusion-color'?: Value<string>;

    /**
     * This parameter defines the range for the fade-out effect before an automatic content cutoff on pitched map views.
     * Fade out is implemented by scaling down and removing buildings in the fade range in a staggered fashion. Opacity is not changed.
     * The fade range is expressed in relation to the height of the map view.
     * A value of 1.0 indicates that the content is faded to the same extent as the map's height in pixels,
     * while a value close to zero represents a sharp cutoff. When the value is set to 0.0, the cutoff is completely disabled.
     * Note: The property has no effect on the map if terrain is enabled.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-cutoff-fade-range
     */
    'fill-extrusion-cutoff-fade-range'?: Value<number>;

    /**
     * Radius of a fill extrusion edge in meters. If not zero, rounds extrusion edges for a smoother appearance.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-fill-extrusion-fill-extrusion-edge-radius
     * @default 0
     */
    'fill-extrusion-edge-radius'?: Value<number>;

    /**
     * Controls the intensity of light emitted on the source features.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-emissive-strength
     * @default 0
     */
    'fill-extrusion-emissive-strength'?: Value<number>;

    /**
     * The color of the flood light effect on the walls of the extruded buildings.
     *
     * Requires lights
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-flood-light-color
     * @default "#ffffff"
     */
    'fill-extrusion-flood-light-color'?: Value<string>;

    /**
     * Provides a control to futher fine-tune the look of the flood light on the ground beneath the extruded buildings.
     * Lower values give the effect a more solid look while higher values make it smoother.
     *
     * Requires lights
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-flood-light-ground-attenuation
     * @default 0.69
     */
    'fill-extrusion-flood-light-ground-attenuation'?: Value<number>;

    /**
     * The extent of the flood light effect on the ground beneath the extruded buildings in meters.
     * Note: this experimental property is evaluated once per tile, during tile initialization.
     * Changing the property value could trigger tile reload. The feature-state styling is deprecated and will get removed soon.
     *
     * Requires lights
     * Units in meters
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-flood-light-ground-radius
     * @default 0
     */
    'fill-extrusion-flood-light-ground-radius'?: Value<number>;

    /**
     * The intensity of the flood light color.
     * Must be between 0 and 1 inclusive
     *
     * Requires lights
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-flood-light-intensity
     * @default 0
     */
    'fill-extrusion-flood-light-intensity'?: Value<number>;

    /**
     * The extent of the flood light effect on the walls of the extruded buildings in meters.
     *
     * Requires lights
     * Units in meters
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-flood-light-wall-radius
     * @default 0
     */
    'fill-extrusion-flood-light-wall-radius'?: Value<number>;

    /**
     * The height with which to extrude this layer.
     * Units in meters
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-height
     * @default 0
     */
    'fill-extrusion-height'?: Value<number>;

    /**
     * Controls the behavior of fill extrusion height over terrain
     * "terrain": The fill extrusion height follows terrain slope.
     * "flat": The fill extrusion height is flat over terrain.
     *
     * Requires `fill-extrusion-height` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-height-alignment
     * @default "flat"
     */
    'fill-extrusion-height-alignment'?: Value<'terrain' | 'flat'>;

    /**
     * If a non-zero value is provided, it sets the fill-extrusion layer into wall rendering mode.
     * The value is used to render the feature with the given width over the outlines of the geometry.
     * Note: This property is experimental and some other fill-extrusion properties might not be supported with non-zero line width.
     *
     * Units in meters
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-line-width
     * @default 0
     */
    'fill-extrusion-line-width'?: Value<number>;

    /**
     * The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis,
     * and data-driven styling is not available.
     * Must be between 0 and 1 inclusive
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-opacity
     * @default 1
     */
    'fill-extrusion-opacity'?: Value<number>;

    /**
     * Name of image in sprite to use for drawing images on extruded fills.
     * For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512).
     * Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-pattern
     */
    'fill-extrusion-pattern'?: Value<string>;

    /**
     * Controls the transition progress between the image variants of fill-extrusion-pattern.
     * Zero means the first variant is used, one is the second, and in between they are blended together.
     * Both images should be the same size and have the same type (either raster or vector).
     * Must be between 0 and 1 inclusive
     *
     * Requires `line-pattern` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-pattern-cross-fade
     * @default 0
     */
    'fill-extrusion-pattern-cross-fade'?: Value<number>;

    /**
     * Indicates whether top edges should be rounded when fill-extrusion-edge-radius has a value greater than 0.
     * If false, rounded edges are only applied to the sides. Default is true.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-rounded-roof
     * @default true
     */
    'fill-extrusion-rounded-roof'?: Value<boolean>;

    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.
     * Units in pixels
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-translate
     * @default [0,0]
     */
    'fill-extrusion-translate'?: Value<[number, number]>;

    /**
     * Controls the frame of reference for fill-extrusion-translate.
     * "map": The fill extrusion is translated relative to the map.
     * "viewport": The fill extrusion is translated relative to the viewport.
     *
     * Requires `fill-extrusion-translate` property
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-translate-anchor
     * @default "map"
     */
    'fill-extrusion-translate-anchor'?: Value<'map' | 'viewport'>;

    /**
     * Whether to apply a vertical gradient to the sides of a fill-extrusion layer.
     * If true, sides will be shaded slightly darker farther down.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-vertical-gradient
     * @default true
     */
    'fill-extrusion-vertical-gradient'?: Value<boolean>;

    /**
     * A global multiplier that can be used to scale base, height, AO, and flood light of the fill extrusions.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-fill-extrusion-fill-extrusion-vertical-scale
     * @default 1
     */
    'fill-extrusion-vertical-scale'?: Value<number>;

    /**
     * Whether this layer is displayed.
     * "visible": The layer is shown.
     * "none": The layer is not shown.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-fill-extrusion-visibility
     * @default "visible"
     */
    'visibility'?: Value<'visible' | 'none'>;
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
export type FillExtrusionLayerStyle = Pick<
  FillExtrusionLayerProps,
  'layerStyle'
>;
