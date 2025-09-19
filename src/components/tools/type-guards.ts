import React from 'react';

import CircleLayer from '../circleLayer/CircleLayer';

import type { CircleLayerProps } from '../circleLayer/CircleLayer.type';
import FillLayer from '../fillLayer/FillLayer';
import type { FillLayerProps } from '../fillLayer/FillLayer.type';
import LineLayer from '../lineLayer/LineLayer';
import type { LineLayerProps } from '../lineLayer/LineLayer.type';

export const isCircleLayer = (
  element: React.ReactElement
): element is React.ReactElement<CircleLayerProps> => {
  return element.type === CircleLayer;
};

export const isFillLayer = (
  element: React.ReactElement
): element is React.ReactElement<FillLayerProps> => {
  return element.type === FillLayer;
};

export const isLineLayer = (
  element: React.ReactElement
): element is React.ReactElement<LineLayerProps> => {
  return element.type === LineLayer;
};
