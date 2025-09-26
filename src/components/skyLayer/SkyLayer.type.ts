import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type SkyLayerProps = {
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
     * A color used to tweak the main atmospheric scattering coefficients. Using white applies the default coefficients giving the natural blue color to the atmosphere. This color affects how heavily the corresponding wavelength is represented during scattering. The alpha channel describes the density of the atmosphere, with 1 maximum density and 0 no density.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-atmosphere-color
     *
     * Requires `sky-type` to be `"atmosphere"`
     * @default "#ffffff"
     */
    'sky-atmosphere-color'?: Value<string>;

    /**
     * A color applied to the atmosphere sun halo. The alpha channel describes how strongly the sun halo is represented in an atmosphere sky layer.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-atmosphere-halo-color
     *
     * Requires `sky-type` to be `"atmosphere"`
     * @default "#ffffff"
     */
    'sky-atmosphere-halo-color'?: Value<string>;

    /**
     * Position of the sun center [a azimuthal angle, p polar angle].
     * The azimuthal angle indicates the position of the sun relative to 0° north, where degrees proceed clockwise.
     * The polar angle indicates the height of the sun, where 0° is directly above, at zenith, and 90° at the horizon.
     * When this property is ommitted, the sun center is directly inherited from the light position.
     *
     * Array of numbers [ between 0 and 360 inclusive, between 0 and 180 inclusive ].
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-atmosphere-sun
     *
     * Units in `degrees`.
     * Requires `sky-type` to be `"atmosphere"`
     */
    'sky-atmosphere-sun'?: Value<[number, number]>;

    /**
     * Intensity of the sun as a light source in the atmosphere (on a scale from 0 to a 100).
     * Setting higher values will brighten up the sky.
     *
     *  Must be between 0 and 100 inclusive
     *
     * Requires `sky-type` to be `"atmosphere"`
     * @default 10
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-atmosphere-sun-intensity
     */
    'sky-atmosphere-sun-intensity'?: Value<number>;

    /**
     * Defines a radial color gradient with which to color the sky. The color values can be interpolated with an expression using sky-radial-progress. The range [0, 1] for the interpolant covers a radial distance (in degrees) of [0, sky-gradient-radius] centered at the position specified by sky-gradient-center.
     *
     * Requires `sky-type` to be `"gradient"`
     * @default ["interpolate",["linear"],["sky-radial-progress"],0.8,"#87ceeb",1,"white"]
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-gradient
     */
    'sky-gradient'?: Value<string>;

    /**
     * Position of the gradient center [a azimuthal angle, p polar angle].
     * The azimuthal angle indicates the position of the gradient center relative to 0° north, where degrees proceed clockwise.
     * The polar angle indicates the height of the gradient center, where 0° is directly above, at zenith, and 90° at the horizon.
     *
     * Array of numbers [ between 0 and 360 inclusive, between 0 and 180 inclusive ].
     *
     * Requires `sky-type` to be `"gradient"`
     * @default [0, 0]
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-gradient-center
     */
    'sky-gradient-center'?: Value<[number, number]>;

    /**
     * The angular distance (measured in degrees) from `sky-gradient-center` up to which the gradient extends.
     * A value of 180 causes the gradient to wrap around to the opposite direction from `sky-gradient-center`.
     *
     * Must be between 0 and 180 inclusive.
     *
     * Requires `sky-type` to be `"gradient"`
     * @default 90
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-gradient-radius
     */
    'sky-gradient-radius'?: Value<number>;

    /**
     * The opacity of the entire sky layer.
     *
     * Must be between 0 and 1 inclusive
     *
     * @default 1
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-opacity
     */
    'sky-opacity'?: Value<number>;

    /**
     * The type of the sky :
     * "gradient": Renders the sky with a gradient that can be configured with sky-gradient-radius and sky-gradient.
     * "atmosphere": Renders the sky with a simulated atmospheric scattering algorithm, the sun direction can be attached to the light position or explicitly set through sky-atmosphere-sun.
     *
     * @default "atmosphere"
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-sky-sky-type
     */
    'sky-type'?: Value<'gradient' | 'atmosphere'>;

    /**
     * Whether this layer is displayed.
     * "visible": The layer is shown.
     * "none": The layer is not shown.
     * @default "visible"
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-sky-visibility
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
export type SkyLayerStyle = Pick<SkyLayerProps, 'layerStyle'>;
