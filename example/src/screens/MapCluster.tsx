import type { FeatureCollection, Geometry } from 'geojson';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import {
  Camera,
  CircleLayer,
  MapView,
  ShapeSource,
  type CameraRef,
} from 'rn-mapbox-toolkit';

const shapes: FeatureCollection<Geometry> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4261335483319884, 48.86310711837604],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2549883419548222, 48.86355543287268],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3896178021040817, 48.85052863120496],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3717655404129117, 48.8874817214505],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.267003364944167, 48.83665865254745],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4589613948999207, 48.85245771287205],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.234808317736914, 48.893643527354456],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.466317672529717, 48.89461855864049],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.284329719723983, 48.84047233703541],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.437610694605857, 48.846623596843045],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.346603452450846, 48.82348520681932],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4155749951090613, 48.89997007297099],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.425263317438865, 48.83581964494628],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.389367740278842, 48.86995710682155],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4179743598798233, 48.84645390048947],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2972169186426217, 48.85948922626489],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3867469319281027, 48.86778218850128],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3941240211397923, 48.83236452635542],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2314550795897397, 48.832508753037956],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4211215795572505, 48.82313075430974],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.375515800441723, 48.87975855114357],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3354028888438165, 48.87689611840944],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.379013361695666, 48.83674415731558],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.447987787847858, 48.86700675439222],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.458541992255406, 48.85414158880056],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.45541858480544, 48.85462401643032],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.339107652032622, 48.83414638421102],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.241350989886976, 48.864719874668786],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.420392197810003, 48.85434432100825],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3943227694092966, 48.85804827582102],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2651394834468546, 48.897953967904755],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4262123050791753, 48.90101728692258],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3135156513393547, 48.817725622649185],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.317169598803508, 48.86644503872356],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4628360193565846, 48.864473788570365],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2614004190983192, 48.87408547882847],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.320446307723574, 48.83353082381376],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2691097110715237, 48.83708981434185],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3232756818934868, 48.897228602270204],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3386216898024412, 48.89756861287634],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2914266896981044, 48.85241213885657],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2741549400170213, 48.86703714340558],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.333570418518842, 48.85383556654657],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2542539423562507, 48.85866743665435],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.415327637190892, 48.87059890451929],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.270177303860837, 48.89664294525909],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4665240221067393, 48.86300584426053],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2737861874170844, 48.90047725712256],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.364270641926998, 48.81812144657765],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.268943979502097, 48.88835811779437],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3106543689673966, 48.831007579776355],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3934860228805452, 48.84573048818277],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4191527572553158, 48.83182972406761],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.414569942148916, 48.81916084096777],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2841889744160593, 48.88075781304234],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.237508101630067, 48.862605716416155],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3911585324662346, 48.83707642769941],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.466418421490863, 48.82784001157274],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.417225598735356, 48.86041965748569],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4177425858348314, 48.84287200680595],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3885759592219578, 48.83738191243571],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3235574750739256, 48.858324294034794],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2992641982838293, 48.83401291629577],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.323283179188342, 48.88042122208616],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.240690651208937, 48.87864588234292],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2990991863532764, 48.90127476792499],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2590073435337916, 48.85432152468459],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3249893287901764, 48.892187819646566],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4266304774982586, 48.89814683457738],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4224033466256847, 48.87170722522601],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2512475906380165, 48.82837379553139],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.327114291216754, 48.867537616794266],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.349305292386725, 48.85180699127021],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2891320577664342, 48.85261325765361],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3890910252090465, 48.88907066512743],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2778651611613236, 48.824209121751025],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.341678590902188, 48.85257413922782],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.338982821123585, 48.854739303661745],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.352441370058401, 48.8310110725731],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3116373399016465, 48.82944253010444],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2767889152348477, 48.88547732263099],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2422963861206906, 48.8240782345344],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3230548376031117, 48.878491331222854],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2736799990711596, 48.85097577320627],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4230107445122493, 48.82683383713691],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2761630409856113, 48.8188660008415],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2979959575204587, 48.86734106750935],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3106872273897325, 48.87427095857713],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.384688982842695, 48.880056755301446],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4633840409126595, 48.86571308796482],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2275567969346226, 48.83397774580445],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3068070689646456, 48.89076457951354],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.391466223505432, 48.866742349215784],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.419660293811231, 48.818637967488755],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.425139339083777, 48.818602120095655],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4278127613867295, 48.8197610290497],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3006200602666764, 48.900088459268304],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.46353254328962, 48.852917206252975],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2946683896202735, 48.8866866464135],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3537304398266414, 48.83573320200682],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2556170351714475, 48.88105208969364],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.233797682239632, 48.8537012750701],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4598462175390923, 48.83830986696314],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.408164145347002, 48.82654906388175],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.335428880727891, 48.87353528080217],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3717677400723507, 48.82427881931275],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2805962856334476, 48.82392667195055],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.370815442671074, 48.862291253606294],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3960744057602628, 48.84765026231579],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.381903492912187, 48.87824249954283],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.462248645755146, 48.824660864832474],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3608399115591845, 48.81767344782867],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.286036283149612, 48.82013728728743],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4012139942449506, 48.88411084714104],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2461763414558953, 48.88605278578281],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3058555907890512, 48.89899522894831],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.453947367146877, 48.873061398357386],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3025632922710897, 48.84852667645269],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4032800039802513, 48.85282107902861],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.392871844559778, 48.8365524075699],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2397308309271766, 48.83398828907285],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.308790737911697, 48.86260855764086],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.340881856762664, 48.85788703189575],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.466472863993431, 48.89685639874199],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2411296197607666, 48.89875084827335],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.302858212822816, 48.86734006439685],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4339659094886317, 48.88302087419526],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.402210950293197, 48.85508786733796],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3866166173500925, 48.84019172415984],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2660682368947827, 48.83242032297376],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3239890722370324, 48.850046922212655],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4166606586343393, 48.83012281578306],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.233008444539502, 48.874368183852866],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.336506266619788, 48.84159491240173],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3388223094669005, 48.865735501630226],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.375435959803233, 48.88542723740014],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3269130713063793, 48.84019847195369],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.347242535938869, 48.89041347719522],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.374786324886597, 48.86684584943794],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.24601405892232, 48.87413228449072],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2424295250607114, 48.900939108253525],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.23495099970828, 48.86849978811371],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3803545746177956, 48.827634759180775],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.460265540194206, 48.826073841437456],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4107527548813117, 48.8910816901251],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3129078937459906, 48.878693186682874],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.292772657652492, 48.84568957151081],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.452071569809543, 48.89588799010595],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.241093316804024, 48.88984096407744],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2824924350287357, 48.833208236883756],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2631768920799766, 48.86503930301998],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4224592865217636, 48.83262158752294],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.317478256035388, 48.889832790927265],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3016746696827886, 48.82406882729704],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4388890337715803, 48.82266574393554],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3801439896542655, 48.88171108713011],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.438128161494733, 48.88266968442482],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.334331376240755, 48.874880090319884],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.296349071624434, 48.85162411123444],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.247171777427893, 48.88620093155528],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2309236109514035, 48.82137369925857],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2257506450431666, 48.89134103342375],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.428590465155542, 48.85995690554944],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.313125400872036, 48.87169532667806],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.465582146678024, 48.89368040947141],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2802238928690417, 48.81918568103877],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3072052551034483, 48.87382276419388],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4192717401212596, 48.852939636562496],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.399589532472774, 48.86476992716283],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.363577772423043, 48.873738482266404],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.354023422068814, 48.890471432544516],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3803840882705565, 48.89245745998092],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4461509506910586, 48.898817463330374],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.294270860303642, 48.83503931176675],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.394349715713017, 48.850130610775025],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.335393357967886, 48.887423206572386],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.417929739349271, 48.883418333841185],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.236755437197584, 48.832266021148605],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.413278200826638, 48.81991891036838],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2718442663239684, 48.83373636765163],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.238667767999184, 48.87564479498251],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3327656840149893, 48.82239247303044],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.280737730953121, 48.87843450193418],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3314490809735067, 48.89963634348653],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3074132217541123, 48.81845844584329],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4527517176751985, 48.864196472017824],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.310178315587662, 48.816828049136134],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.410214996914544, 48.8984374643525],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3988047049801775, 48.89872701927871],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.2649773607856485, 48.824659474495114],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3374965193650326, 48.819820217937924],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.415978391558241, 48.8988678919854],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.27977103399158, 48.83650245350929],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4125202212652908, 48.84860056441019],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.423651503272762, 48.85956755152653],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.350439129832707, 48.86460849476108],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.4685081746960553, 48.84978349645284],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3874568695819915, 48.838585222413506],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.405698895541284, 48.90134435615404],
      },
      properties: {
        radius: 100,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3380614105838533, 48.81827027541044],
      },
      properties: {
        radius: 100,
      },
    },
  ],
};

export default function MapCluster() {
  const cameraRef = React.useRef<CameraRef | null>(null);

  const handleFlyTo = async () => {
    try {
      await cameraRef.current?.flyTo({
        center: { longitude: 2.333333, latitude: 48.866667 },
        zoom: 12,
      });
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  React.useEffect(() => {
    if (cameraRef?.current) {
      handleFlyTo();
    }
  }, []);

  return (
    <>
      <MapView
        style={style.mapContainer}
        styleUrl="dark-v11"
        showScaleBar={true}
      >
        <Camera ref={cameraRef} />
        <ShapeSource shape={shapes} sourceID="source-paris" cluster={true}>
          <CircleLayer
            layerID="points"
            sourceID="source-paris"
            filter={['has', 'point_count']}
            layerStyle={{
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1',
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40,
              ],
            }}
          />

          <CircleLayer
            layerID="points"
            sourceID="source-paris"
            filter={['!', ['has', 'point_count']]}
            onLayerStyleError={(e) => console.log(e.nativeEvent.properties)}
            layerStyle={{
              'circle-color': '#ffffff',
              'circle-radius': 6,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#000000',
            }}
          />
        </ShapeSource>
      </MapView>
      <Button title="Fly to Paris" onPress={handleFlyTo} />
    </>
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
