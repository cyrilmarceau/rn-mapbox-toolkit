import type { NativeSyntheticEvent } from 'react-native';
export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Point = {
  x: number;
  y: number;
};

const PositionToGravity = {
  /** Anchors to top-left corner */
  TopLeft: 0,

  /** Anchors to top-right corner */
  TopRight: 1,

  /** Anchors to bottom-right corner */
  BottomRight: 2,

  /** Anchors to bottom-left corner */
  BottomLeft: 3,
} as const;

export type PositionToGravity =
  (typeof PositionToGravity)[keyof typeof PositionToGravity];

export type OnLayerStyleError = NativeSyntheticEvent<{
  properties: { message: string };
}>;

// Source: https://github.com/rnmapbox/maps/blob/51b1d226563f398d6dfe1c4fd101b90a9aafdc68/src/utils/MapboxStyles.d.ts#L13
type ExpressionName =
  // Types
  | 'array'
  | 'boolean'
  | 'collator'
  | 'format'
  | 'image'
  | 'literal'
  | 'number'
  | 'number-format'
  | 'object'
  | 'string'
  | 'to-boolean'
  | 'to-color'
  | 'to-number'
  | 'to-string'
  | 'typeof'
  // Feature data
  | 'accumulated'
  | 'feature-state'
  | 'geometry-type'
  | 'id'
  | 'line-progress'
  | 'properties'
  // Lookup
  | 'at'
  | 'at-interpolated'
  | 'config'
  | 'get'
  | 'has'
  | 'in'
  | 'index-of'
  | 'length'
  | 'measure-light'
  | 'slice'
  | 'split'
  | 'worldview'
  // Decision
  | '!'
  | '!='
  | '<'
  | '<='
  | '=='
  | '>'
  | '>='
  | 'all'
  | 'any'
  | 'case'
  | 'coalesce'
  | 'match'
  | 'within'
  // Ramps, scales, curves
  | 'interpolate'
  | 'interpolate-hcl'
  | 'interpolate-lab'
  | 'step'
  // Variable binding
  | 'let'
  | 'var'
  // String
  | 'concat'
  | 'downcase'
  | 'is-supported-script'
  | 'resolved-locale'
  | 'upcase'
  // Color
  | 'hsl'
  | 'hsla'
  | 'rgb'
  | 'rgba'
  | 'to-hsla'
  | 'to-rgba'
  // Math
  | '-'
  | '*'
  | '/'
  | '%'
  | '^'
  | '+'
  | 'abs'
  | 'acos'
  | 'asin'
  | 'atan'
  | 'ceil'
  | 'cos'
  | 'distance'
  | 'e'
  | 'floor'
  | 'ln'
  | 'ln2'
  | 'log10'
  | 'log2'
  | 'max'
  | 'min'
  | 'pi'
  | 'random'
  | 'round'
  | 'sin'
  | 'sqrt'
  | 'tan'
  // Camera
  | 'distance-from-center'
  | 'pitch'
  | 'zoom'
  // Heatmap
  | 'heatmap-density';

export type Expression = readonly [ExpressionName, ...any[]];

type InterpolationType =
  | readonly ['linear']
  | readonly ['exponential', number]
  | readonly ['cubic-bezier', number, number, number, number];

type SpecificExpression =
  | readonly [
      'interpolate' | 'interpolate-hcl' | 'interpolate-lab',
      InterpolationType,
      Expression | number,
      ...Array<number | Expression>,
    ]
  | readonly [
      'step',
      Expression | number,
      number | Expression,
      ...Array<number | Expression>,
    ]
  | readonly ['case', ...Array<Expression | any>]
  | readonly ['match', Expression, ...Array<any>]
  | readonly ['get', string]
  | readonly ['get', string, Expression]
  | readonly ['feature-state', string]
  | readonly ['zoom']
  | readonly ['+' | '*' | 'max' | 'min', ...Array<Expression | number>]
  | readonly ['-' | '/' | '%' | '^', Expression | number, Expression | number]
  | readonly [
      '-' | 'abs' | 'ceil' | 'floor' | 'round' | 'sqrt',
      Expression | number,
    ]
  | readonly [
      '==' | '!=' | '<' | '<=' | '>' | '>=',
      Expression | any,
      Expression | any,
    ]
  | readonly ['!' | 'all' | 'any', ...Array<Expression | boolean>];

export type Value<T> = T | SpecificExpression | Expression;
