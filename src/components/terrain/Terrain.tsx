import NativeComponentTerrain from '../../specs/NativeComponentTerrain';
import type { TerrainProps } from './Terrain.type';

const Terrain: React.FC<TerrainProps> = (props) => {
  return <NativeComponentTerrain {...props} />;
};

export default Terrain;
