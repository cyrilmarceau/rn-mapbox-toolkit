import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type ClipLayerProps = {
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
     * Removes content from layers with the specified scope. By default all layers are affected.
     * For example specifying basemap will only remove content from the Mapbox Standard style layers which have the same scope
     * @default []
     */
    'clip-layer-scope'?: Value<string[]>;
    /**
     * Layer types that will also be removed if fallen below this clip layer.
     * "model": present the clip layer would remove all 3d model layers below it. Currently only instanced models (e.g. trees) are removed.
     * "symbol": present the clip layer would remove all symbol layers below it.
     * @default []
     */
    'clip-layer-types'?: Value<'model' | 'symbol'>[];
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
export type BackgroundStyle = Pick<ClipLayerProps, 'layerStyle'>;
