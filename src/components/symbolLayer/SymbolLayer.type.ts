import type {
  Expression,
  OnLayerStyleError,
  Value,
} from '../../common/shared.types';

export type SymbolLayerProps = {
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
     * If true, the icon will be visible even if it collides with other previously drawn symbols.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-allow-overlap
     * @default false
     */
    'icon-allow-overlap'?: Value<boolean>;

    /**
     * Part of the icon placed closest to the anchor.
     * "center" The center of the icon is placed closest to the anchor.
     * "left" The left side of the icon is placed closest to the anchor.
     * "right" The right side of the icon is placed closest to the anchor.
     * "top" The top of the icon is placed closest to the anchor.
     * "bottom" The bottom of the icon is placed closest to the anchor.
     * "top-left" The top left corner of the icon is placed closest to the anchor.
     * "top-right" The top right corner of the icon is placed closest to the anchor.
     * "bottom-left" The bottom left corner of the icon is placed closest to the anchor.
     * "bottom-right" The bottom right corner of the icon is placed closest to the anchor.
     *
     * Requires `icon-image`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-anchor
     * @default "center"
     */
    'icon-anchor'?: Value<
      | 'center'
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
    >;

    /**
     * The color of the icon. This can only be used with SDF icons.
     *
     * Requires `icon-image`
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-color
     * @default "#000000"
     */
    'icon-color'?: Value<string>;

    /**
     * Increase or reduce the brightness of the icon. The value is the maximum brightness.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-color-brightness-max
     * @default 1
     */
    'icon-color-brightness-max'?: Value<number>;

    /**
     * Increase or reduce the brightness of the icon. The value is the minimum brightness.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-color-brightness-min
     * @default 0
     */
    'icon-color-brightness-min'?: Value<number>;

    /**
     * Increase or reduce the contrast of the icon.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-color-contrast
     * @default 0
     */
    'icon-color-contrast'?: Value<number>;

    /**
     * Increase or reduce the saturation of the icon.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-color-saturation
     * @default 0
     */
    'icon-color-saturation'?: Value<number>;

    /**
     * Controls the intensity of light emitted on the source features.
     *
     * Requires `lights`
     *
     * Units in `intensity`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-emissive-strength
     * @default 0
     */
    'icon-emissive-strength'?: Value<number>;

    /**
     * Fade out the halo towards the outside.
     *
     * Requires `icon-image`
     *
     * Units in `pixel`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-halo-blur
     * @default 0
     */
    'icon-halo-blur'?: Value<number>;

    /**
     * The color of the icon's halo. Icon halos can only be used with SDF icons.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-halo-color
     * @default "rgba(0, 0, 0, 0)"
     */
    'icon-halo-color'?: Value<string>;

    /**
     * Distance of halo to the icon outline.
     *
     * Requires `icon-image`
     *
     * Units in `pixel`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-halo-width
     * @default 0
     */
    'icon-halo-width'?: Value<number>;

    /**
     * If true, other symbols can be visible even if they collide with the icon.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-ignore-placement
     * @default false
     */
    'icon-ignore-placement'?: Value<boolean>;

    /**
     * Name of image in sprite to use for drawing an image background.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-image
     */
    'icon-image'?: Value<string>;

    /**
     * Controls the transition progress between the image variants of icon-image.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-image-cross-fade
     * @default 0
     */
    'icon-image-cross-fade'?: Value<number>;

    /**
     * If true, the icon may be flipped to prevent it from being rendered upside-down.
     *
     * Requires `icon-image`
     *
     * Requires `icon-rotation-alignment` to be `"map"`
     *
     * Requires `symbol-placement` to be `"line"` or `"line-center"`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-keep-upright
     * @default false
     */
    'icon-keep-upright'?: Value<boolean>;

    /**
     * Opacity multiplier (multiplies icon-opacity value) of the icon part that is occluded by 3D objects.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-occlusion-opacity
     * @default 0
     */
    'icon-occlusion-opacity'?: Value<number>;

    /**
     * Offset distance of icon from its anchor. Positive values indicate right and down,
     * while negative values indicate left and up.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-offset
     * @default [0, 0]
     */
    'icon-offset'?: Value<[number, number]>;

    /**
     * The opacity at which the icon will be drawn.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-opacity
     * @default 1
     */
    'icon-opacity'?: Value<number>;

    /**
     * If true, text will display without their corresponding icons when the icon collides
     * with other symbols and the text does not.
     *
     * Requires `icon-image`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-optional
     * @default false
     */
    'icon-optional'?: Value<boolean>;

    /**
     * Size of the additional area around the icon bounding box used for detecting symbol collisions.
     *
     * Units in `pixel`
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-padding
     * @default 2
     */
    'icon-padding'?: Value<number>;

    /**
     * Orientation of icon when map is pitched.
     *
     * "map": The icon is aligned to the plane of the map.
     * "viewport": The icon is aligned to the plane of the viewport.
     * "auto": Automatically matches the value of icon-rotation-alignment.
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-pitch-alignment
     * @default "auto"
     */
    'icon-pitch-alignment'?: Value<'map' | 'viewport' | 'auto'>;

    /**
     * Rotates the icon clockwise.
     *
     * Units in `degrees`
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-rotate
     * @default 0
     */
    'icon-rotate'?: Value<number>;

    /**
     * In combination with `symbol-placement`, determines the rotation behavior of icons.
     *
     * `"map"`: When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line.
     *
     * `"viewport"`: Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`
     *
     * `"auto"`: When `symbol-placement` is set to `point`, this is equivalent to viewport. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-rotation-alignment
     * @default "auto"
     */
    'icon-rotation-alignment'?: Value<'map' | 'viewport' | 'auto'>;

    /**
     * Scales the original size of the icon by the provided factor.
     *
     * Units in `factor of the original icon size`
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-size
     * @default 1
     */
    'icon-size'?: Value<number>;

    /**
     * Scales the icon to fit around the associated text.
     *
     * `"none"`: The icon is displayed at its intrinsic aspect ratio.
     *
     * `"width"`: The icon is scaled in the x-dimension to fit the width of the text.
     *
     * `"height"`: The icon is scaled in the y-dimension to fit the height of the text.
     *
     * `"both"`: The icon is scaled in both x- and y-dimensions.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-text-fit
     * @default "none"
     */
    'icon-text-fit'?: Value<'none' | 'width' | 'height' | 'both'>;

    /**
     * Size of the additional area added to dimensions determined by icon-text-fit,
     * in clockwise order: top, right, bottom, left.
     *
     * Units in `pixel`
     *
     * Requires `icon-image`
     *
     * Requires `text-field`
     *
     * Requires `icon-text-fit` to be `"width"`, `"height"`, or `"both"`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-icon-text-fit-padding
     * @default [0, 0, 0, 0]
     */
    'icon-text-fit-padding'?: Value<[number, number, number, number]>;

    /**
     * Distance that the icon's anchor is moved from its original placement.
     * Positive values indicate right and down, while negative values indicate left and up.
     *
     * Units in `pixel`
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-translate
     * @default [0, 0]
     */
    'icon-translate'?: Value<[number, number]>;

    /**
     * Controls the frame of reference for `icon-translate`.
     *
     * `"map"`: Icons are translated relative to the map.
     *
     * `"viewport"`: Icons are translated relative to the viewport.
     *
     * Requires `icon-image`
     *
     * Requires `icon-translate`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-icon-translate-anchor
     * @default "map"
     */
    'icon-translate-anchor'?: Value<'map' | 'viewport'>;

    /**
     * If true, the symbols will not cross tile edges to avoid mutual collisions.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-symbol-avoid-edges
     * @default false
     */
    'symbol-avoid-edges'?: Value<boolean>;

    /**
     * Selects the base of symbol-elevation.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-symbol-elevation-reference
     * @default "none"
     */
    'symbol-elevation-reference'?: Value<'none' | 'sea' | 'ground'>;

    /**
     * Label placement relative to its geometry.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-symbol-placement
     * @default "point"
     */
    'symbol-placement'?: Value<'point' | 'line' | 'line-center'>;

    /**
     * Sorts features in ascending order based on this value.
     * Features with a higher sort key will appear above features with a lower sort key.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-symbol-sort-key
     */
    'symbol-sort-key'?: Value<number>;

    /**
     * Distance between two symbol anchors.
     *
     * Units in `pixel`
     *
     * Requires `"symbol-placement"` to be `"line"`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-symbol-spacing
     * @default 250
     */
    'symbol-spacing'?: Value<number>;

    /**
     * Position symbol on buildings (both fill extrusions and models) rooftops.
     * In order to have minimal impact on performance, this is supported only when `fill-extrusion-height` is not zoom-dependent and remains unchanged.
     * For fading in buildings when zooming in, `fill-extrusion-vertical-scale` should be used and symbols would raise with building rooftops.
     * Symbols are sorted by elevation, except in cases when `viewport-y` sorting or `symbol-sort-key` are applied.
     *
     * Requires `symbol-placement` to be `"point"`
     * Requires `symbol-z-order` to be `"auto"`.
     * @default false
     */
    'symbol-z-elevate'?: Value<boolean>;

    /**
     * Position symbol on the Z axis to elevate it above or below other features.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-symbol-z-offset
     * @default 0
     */
    'symbol-z-offset'?: Value<number>;

    /**
     * Determines whether overlapping symbols in the same layer are rendered in the order
     * that they appear in the data source or by their y-position relative to the viewport.
     *
     * Requires `"symbol-z-elevate"` to be `true`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-symbol-z-order
     * @default "auto"
     */
    'symbol-z-order'?: Value<'auto' | 'viewport-y' | 'source'>;

    /**
     * If true, the text will be visible even if it collides with other previously drawn symbols.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-allow-overlap
     * @default false
     */
    'text-allow-overlap'?: Value<boolean>;

    /**
     * Part of the text placed closest to the anchor.
     *
     * Requires `text-field`
     *
     * Disabled when `text-variable-anchor` is used.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-anchor
     * @default "center"
     */
    'text-anchor'?: Value<
      | 'center'
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
    >;

    /**
     * The color with which the text will be drawn.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-color
     * @default "#000000"
     */
    'text-color'?: Value<string>;

    /**
     * Controls the intensity of light emitted on the source features.
     *
     * Units in `intensity`
     *
     * Requires `lights`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-emissive-strength
     * @default 0
     */
    'text-emissive-strength'?: Value<number>;

    /**
     * Value to use for a text label.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-field
     */
    'text-field'?: Value<string>;

    /**
     * Font stack to use for displaying text.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-font
     * @default ["Open Sans Regular", "Arial Unicode MS Regular"]
     */
    'text-font'?: Value<string[]>;

    /**
     * The halo's fadeout distance towards the outside.
     *
     * Units in `pixel`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-halo-blur
     * @default 0
     */
    'text-halo-blur'?: Value<number>;

    /**
     * The color of the text's halo, which helps it stand out from backgrounds.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-halo-color
     * @default "rgba(0, 0, 0, 0)"
     */
    'text-halo-color'?: Value<string>;

    /**
     * Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.
     *
     * Units in `pixel`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-halo-width
     * @default 0
     */
    'text-halo-width'?: Value<number>;

    /**
     * If true, other symbols can be visible even if they collide with the text.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-ignore-placement
     * @default false
     */
    'text-ignore-placement'?: Value<boolean>;

    /**
     * Text justification options.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-justify
     * @default "center"
     */
    'text-justify'?: Value<'auto' | 'left' | 'center' | 'right'>;

    /**
     * If true, the text may be flipped vertically to prevent it from being rendered upside-down.
     *
     * Requires `text-field`
     *
     * Requires `text-rotation-alignment` to be `"map"`
     *
     * Requires `symbol-placement` to be `"line"` or `"line-center"`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-keep-upright
     * @default true
     */
    'text-keep-upright'?: Value<boolean>;

    /**
     * Text tracking amount.
     *
     * Units in `ems`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-letter-spacing
     * @default 0
     */
    'text-letter-spacing'?: Value<number>;

    /**
     * Text leading value for multi-line text.
     *
     * Units in `ems`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-line-height
     * @default 1.2
     */
    'text-line-height'?: Value<number>;

    /**
     * Maximum angle change between adjacent characters.
     *
     * Units in `degrees`
     *
     * Requires `symbol-placement` to be `"line"` or `"line-center"`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-max-angle
     * @default 45
     */
    'text-max-angle'?: Value<number>;

    /**
     * The maximum line width for text wrapping.
     *
     * Units in `ems`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-max-width
     * @default 10
     */
    'text-max-width'?: Value<number>;

    /**
     * The opacity at which the text will be drawn in case of being depth occluded. Absent value means full occlusion against terrain only.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-occlusion-opacity
     * @default 0
     */
    'text-occlusion-opacity'?: Value<number>;

    /**
     * Offset distance of text from its anchor.
     * Positive values indicate right and down, while negative values indicate left and up.
     * If used with text-variable-anchor, input values will be taken as absolute values.
     * Offsets along the x- and y-axis will be applied automatically based on the anchor position.
     *
     * Requires `text-field`
     *
     * Disabled when `text-radial-offset` is used.
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-offset
     * @default [0, 0]
     */
    'text-offset'?: Value<[number, number]>;

    /**
     * The opacity at which the text will be drawn.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-opacity
     * @default 1
     */
    'text-opacity'?: Value<number>;

    /**
     * If true, icons will display without their corresponding text when the text
     * collides with other symbols and the icon does not.
     *
     * Requires `text-field`
     *
     * Requires `icon-image`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-optional
     * @default false
     */
    'text-optional'?: Value<boolean>;

    /**
     * Size of the additional area around the text bounding box used for detecting symbol collisions.
     *
     * Units in `pixel`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-padding
     * @default 2
     */
    'text-padding'?: Value<number>;

    /**
     * Orientation of text when map is pitched.
     *
     * `"map"`: The text is aligned to the plane of the map.
     *
     * `"viewport"`: The text is aligned to the plane of the viewport.
     *
     * `"auto"`: Automatically matches the value of `text-rotation-alignment`.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-pitch-alignment
     * @default "auto"
     */
    'text-pitch-alignment'?: Value<'map' | 'viewport' | 'auto'>;

    /**
     * Radial offset of text, in the direction of the symbol's anchor.
     *
     * Units in `ems`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-radial-offset
     * @default 0
     */
    'text-radial-offset'?: Value<number>;

    /**
     * Rotates the text clockwise.
     *
     * Units in `degrees`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-rotate
     * @default 0
     */
    'text-rotate'?: Value<number>;

    /**
     * In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.
     *
     * `"map"`: When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns glyph x-axes with the line.
     *
     * `"viewport"`: Produces text whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`
     *
     * `"auto"`: When `symbol-placement` is set to `point`, this is equivalent to viewport. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-rotation-alignment
     * @default "auto"
     */
    'text-rotation-alignment'?: Value<'map' | 'viewport' | 'auto'>;

    /**
     * Font size.
     *
     * Requires `text-field`
     *
     * Units in `pixel`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-size
     * @default 16
     */
    'text-size'?: Value<number>;

    /**
     * Specifies how to capitalize text, similar to the CSS `text-transform` property.
     *
     * `"none"`: The text is not altered.
     *
     * `"uppercase"`: The text is converted to uppercase.
     *
     * `"lowercase"`: The text is converted to lowercase.
     *
     * Requires `text-field`
     *
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-transform
     * @default "none"
     */
    'text-transform'?: Value<'none' | 'uppercase' | 'lowercase'>;

    /**
     * Distance that the text's anchor is moved from its original placement.
     * Positive values indicate right and down, while negative values indicate left and up.
     *
     * Units in `pixel`
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-translate
     * @default [0, 0]
     */
    'text-translate'?: Value<[number, number]>;

    /**
     * Controls the frame of reference for text-translate.
     *
     * `"map"`: Text is translated relative to the map.
     *
     * `"viewport"`: Text is translated relative to the viewport.
     *
     * Requires `text-field`
     *
     * Requires `text-translate`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#paint-symbol-text-translate-anchor
     * @default "map"
     */
    'text-translate-anchor'?: Value<'map' | 'viewport'>;

    /**
     * To increase the chance of placing high-priority labels on the map, you can provide
     * an array of text-anchor locations.
     *
     * Requires `text-field`
     *
     * Requires `symbol-placement` to be `"point"`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-variable-anchor
     */
    'text-variable-anchor'?: Value<
      Array<
        | 'center'
        | 'left'
        | 'right'
        | 'top'
        | 'bottom'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
      >
    >;

    /**
     * The property allows control over a symbol's orientation.
     *
     * Requires `text-field`
     *
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-symbol-text-writing-mode
     */
    'text-writing-mode'?: Value<Array<'horizontal' | 'vertical'>>;

    /**
     * The visibility of the layer.
     * @link https://docs.mapbox.com/style-spec/reference/layers/#layout-fill-visibility
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
export type SymbolLayerStyle = Pick<SymbolLayerProps, 'layerStyle'>;
