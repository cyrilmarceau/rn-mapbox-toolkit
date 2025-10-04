import NativeComponentRasterDemSource from '../../specs/NativeComponentRasterDemSource';
import type { RasterDemSourceProps } from './RasterDemSource.type';

const RasterDemSource: React.FC<RasterDemSourceProps> = (props) => {
  return <NativeComponentRasterDemSource {...props} />;
};

export default RasterDemSource;
