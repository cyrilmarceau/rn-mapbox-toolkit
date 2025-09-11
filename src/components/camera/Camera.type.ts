type CameraViewProps = {};

interface CameraRef {
  getZoomLevel: () => Promise<number>;
}

export type { CameraRef, CameraViewProps };
