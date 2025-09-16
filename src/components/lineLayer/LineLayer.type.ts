export type LineLayerProps = {
  /**
   * the ID of the layer
   */
  layerID: string;
  /**
   * the ID of the source
   */
  sourceID: string;

  minzoom?: number;
  maxzoom?: number;
  layerStyle?: {
    /**
     * The display of line endings.
     * @default 'butt'
     */
    'line-cap'?: 'butt' | 'round' | 'square';

    /**
     * The display of lines when joining.
     * @default 'miter'
     */
    'line-join'?: 'bevel' | 'round' | 'miter' | 'none';

    /**
     * Used to automatically convert miter joins to bevel joins for sharp angles.
     * Requires line-join to be "miter".
     * @default 2
     */
    'line-miter-limit'?: number;

    /**
     * Used to automatically convert round joins to miter joins for shallow angles.
     * Requires line-join to be "round".
     * @default 1.05
     */
    'line-round-limit'?: number;

    /**
     * Sorts features in ascending order based on this value.
     * Features with a higher sort key will appear above features with a lower sort key.
     */
    'line-sort-key'?: number;

    /**
     * Vertical offset from ground, in meters.
     * Requires line-elevation-reference.
     * @default 0
     */
    'line-z-offset'?: number;

    /**
     * Selects the base of line-elevation.
     * Some modes might require precomputed elevation data in the tileset.
     * @default 'none'
     */
    'line-elevation-reference'?: 'none' | 'sea' | 'ground' | 'hd-road-markup';

    /**
     * Defines the slope of an elevated line.
     * Requires line-z-offset.
     * @default undefined (follows terrain slope)
     */
    'line-cross-slope'?: number;
    /**
     * Blur applied to the line, in pixels.
     * Supports feature-state and interpolate expressions.
     * @default 0
     */
    'line-blur'?: number;

    /**
     * The color with which the line will be drawn.
     * Disabled by line-pattern.
     * Supports feature-state and interpolate expressions.
     * @default '#000000'
     */
    'line-color'?: string;

    /**
     * Specifies the lengths of the alternating dashes and gaps that form the dash pattern.
     * Disabled by line-pattern.
     * @default undefined
     */
    'line-dasharray'?: number[];

    /**
     * Draws a line casing outside of a line's actual path.
     * Value indicates the width of the inner gap, in pixels.
     * Supports feature-state and interpolate expressions.
     * @default 0
     */
    'line-gap-width'?: number;

    /**
     * A gradient used to color a line feature at various distances along its length.
     * Requires source to be "geojson" and lineMetrics: true.
     * Disabled by line-pattern.
     * Supports interpolate expressions.
     */
    'line-gradient'?: any[];

    /**
     * The line's offset. For linear features, a positive value offsets to the right,
     * and a negative value to the left. For polygon features, a positive value results in an inset,
     * and a negative value results in an outset.
     * Supports feature-state and interpolate expressions.
     * @default 0
     */
    'line-offset'?: number;

    /**
     * The opacity at which the line will be drawn.
     * Supports feature-state and interpolate expressions.
     * @default 1
     */
    'line-opacity'?: number;

    /**
     * Opacity multiplier for the line part occluded by 3D objects.
     * @default 0
     */
    'line-occlusion-opacity'?: number;

    /**
     * Name of image in sprite to use for drawing image lines.
     * For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512).
     */
    'line-pattern'?: string;

    /**
     * Controls the transition progress between the image variants of line-pattern.
     * Requires line-pattern.
     * @default 0
     */
    'line-pattern-cross-fade'?: number;

    /**
     * Stroke thickness, in pixels.
     * Supports feature-state and interpolate expressions.
     * @default 1
     */
    'line-width'?: number;

    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
     * Supports interpolate expressions.
     * @default [0, 0]
     */
    'line-translate'?: [number, number];

    /**
     * Controls the frame of reference for line-translate.
     * Requires line-translate.
     * @default 'map'
     */
    'line-translate-anchor'?: 'map' | 'viewport';

    /**
     * The color to be used for rendering the trimmed line section.
     * Requires line-trim-offset and source to be "geojson".
     * @default 'transparent'
     */
    'line-trim-color'?: string;

    /**
     * The fade range for the trim-start and trim-end points.
     * Requires line-trim-offset and source to be "geojson".
     * @default [0, 0]
     */
    'line-trim-fade-range'?: [number, number];

    /**
     * The line part between [trim-start, trim-end] will be painted using line-trim-color.
     * Requires source to be "geojson".
     * @default [0, 0]
     */
    'line-trim-offset'?: [number, number];

    /**
     * Controls the intensity of light emitted on the source features.
     * Requires lights.
     * @default 0
     */
    'line-emissive-strength'?: number;
  };
};

/**
 * Type defining the style properties for a "line" layer according to the Mapbox Style Specification.
 * @see https://docs.mapbox.com/style-spec/reference/layers/#line
 */
export type LineLayerStyle = Pick<LineLayerProps, 'layerStyle'>;
