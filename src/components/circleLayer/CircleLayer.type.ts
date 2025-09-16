import type { OnLayerStyleError } from '../../common/shared.types';

export type CircleLayerProps = {
  /**
   * the ID of the layer
   */
  layerID: string;
  /**
   * Data source for the layer.
   */
  sourceID: string;

  minZoom?: number;

  maxZoom?: number;

  layerStyle?: {
    /**
     * Radius of the circle.
     * Supports Mapbox expressions.
     * @default 5
     */
    'circle-radius'?: number;

    /**
     * Fill color of the circle.
     * Supports Mapbox expressions.
     * @default '#000000'
     */
    'circle-color'?: string;

    /**
     * Opacity of the circle.
     * Supports Mapbox expressions.
     * @default 1
     */
    'circle-opacity'?: number;

    /**
     * Width of the circle's stroke.
     * Supports Mapbox expressions.
     * @default 0
     */
    'circle-stroke-width'?: number;

    /**
     * Color of the circle's stroke.
     * Supports Mapbox expressions.
     * @default '#000000'
     */
    'circle-stroke-color'?: string;

    /**
     * Opacity of the circle's stroke.
     * Supports Mapbox expressions.
     * @default 1
     */
    'circle-stroke-opacity'?: number;

    /**
     * Blur distance applied to the circle.
     * Supports Mapbox expressions.
     * @default 0
     */
    'circle-blur'?: number;

    /**
     * Displacement of the circle relative to its original position.
     * Format: [x, y] in pixels.
     * Supports Mapbox expressions.
     * @default [0, 0]
     */
    'circle-translate'?: [number, number];

    /**
     * Anchor point for the circle's translation.
     * @default 'center'
     */
    'circle-translate-anchor'?: 'map' | 'viewport';

    /**
     * Rendering order for overlapping circles.
     * Supports Mapbox expressions.
     */
    'circle-sort-key'?: number;
  };

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
 * @see https://docs.mapbox.com/style-spec/reference/layers/#circle
 */
export type CircleStyle = Pick<CircleLayerProps, 'layerStyle'>;
