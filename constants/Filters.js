import ALIENGREEN_LUT_PREVIEW from "../assets/filters/aliengreenpreview.png";
import ALIENRED_LUT_PREVIEW from "../assets/filters/alienredpreview.png";
import AMBER_LUT_PREVIEW from "../assets/filters/amberpreview.png";
import AUTUMN_LUT_PREVIEW from "../assets/filters/autumnpreview.png";
import BLEAK_LUT_PREVIEW from "../assets/filters/bleakpreview.png";
import BRIGHTWINTER_LUT_PREVIEW from "../assets/filters/brightwinterpreview.png";
import CANDLELIGHT_LUT_PREVIEW from "../assets/filters/candlelightpreview.png";
import COOLING_LUT_PREVIEW from "../assets/filters/coolingpreview.png";
import CORDUROY_LUT_PREVIEW from "../assets/filters/corduroypreview.png";
import DREAMCLOVER_LUT_PREVIEW from "../assets/filters/dreamcloverpreview.png";
import DREAMPANDORA_LUT_PREVIEW from "../assets/filters/dreampandorapreview.png";
import DREAMRED_LUT_PREVIEW from "../assets/filters/dreamredpreview.png";
import DROPBLUE_LUT_PREVIEW from "../assets/filters/dropbluepreview.png";
import HORRORBLUE_LUT_PREVIEW from "../assets/filters/horrorbluepreview.png";
import INFRARED_LUT_PREVIEW from "../assets/filters/infraredpreview.png";
import LATESUNSET_LUT_PREVIEW from "../assets/filters/latesunsetpreview.png";
import MATRIX_LUT_PREVIEW from "../assets/filters/matrixpreview.png";
import MONO_BLUEFILTER_LUT_PREVIEW from "../assets/filters/mono-blue-filterpreview.png";
import MONO_GREENFILTER_LUT_PREVIEW from "../assets/filters/mono-greenfilterpreview.png";
import MONO_NEUTRALDENSITY_LUT_PREVIEW from "../assets/filters/mono-neutral-densitypreview.png";
import MONO_REDFILTER_LUT_PREVIEW from "../assets/filters/mono-redfilterpreview.png";
import MONO_YELLOWFILTER_LUT_PREVIEW from "../assets/filters/mono-yellowfilterpreview.png";
import NEUTRAL_LUT_PREVIEW from "../assets/filters/neutralpreview.png";
import NIGHTBLUES_LUT_PREVIEW from "../assets/filters/nightbluespreview.png";
import NOIR_LUT_PREVIEW from "../assets/filters/noirpreview.png";
import ORANGEBLUES_LUT_PREVIEW from "../assets/filters/orangebluespreview.png";
import PILOT_LUT_PREVIEW from "../assets/filters/pilotpreview.png";
import RETROBROWN_LUT_PREVIEW from "../assets/filters/retrobrownpreview.png";
import SEPIA_LUT_PREVIEW from "../assets/filters/sepiapreview.png";
import SIMPLYRED_LUT_PREVIEW from "../assets/filters/simplyredpreview.png";
import STRANGERTHINGS_LUT_PREVIEW from "../assets/filters/strangerthingspreview.png";
import TENSIONGREEN_LUT_PREVIEW from "../assets/filters/tensiongreenpreview.png";
import THREESTRIP_LUT_PREVIEW from "../assets/filters/threestrippreview.png";
import TINTYPE_LUT_PREVIEW from "../assets/filters/tintypepreview.png";
import TWOSTRIP_LUT_PREVIEW from "../assets/filters/twostrippreview.png";
import WALKINGDEAD_LUT_PREVIEW from "../assets/filters/walkingdeadpreview.png";
import WASHOUT_LUT_PREVIEW from "../assets/filters/washoutpreview.png";
import ASCII from '../components/FX/shaders/ASCII';
import ColdCGA from '../components/FX/shaders/ColdCGA';
import HalfTone from '../components/FX/shaders/HalfTone';
import LowQualityPorn from '../components/FX/shaders/LowQualityPorn';
import Sobel from '../components/FX/shaders/Sobel';
import Warhol from '../components/FX/shaders/Warhol';
import LUT from "../components/FX/shaders/LUT";

const ALIENGREEN_LUT =  require("../assets/filters/aliengreen.png");
const ALIENRED_LUT =  require("../assets/filters/alienred.png");
const AMBER_LUT =  require("../assets/filters/amber.png");
const AUTUMN_LUT =  require("../assets/filters/autumn.png");
const BLEAK_LUT =  require("../assets/filters/bleak.png");
const BRIGHTWINTER_LUT =  require("../assets/filters/brightwinter.png");
const CANDLELIGHT_LUT =  require("../assets/filters/candlelight.png");
const COOLING_LUT =  require("../assets/filters/cooling.png");
const CORDUROY_LUT =  require("../assets/filters/corduroy.png");
const DREAMCLOVER_LUT =  require("../assets/filters/dreamclover.png");
const DREAMPANDORA_LUT =  require("../assets/filters/dreampandora.png");
const DREAMRED_LUT =  require("../assets/filters/dreamred.png");
const DROPBLUE_LUT =  require("../assets/filters/dropblue.png");
const HORRORBLUE_LUT =  require("../assets/filters/horrorblue.png");
const INFRARED_LUT =  require("../assets/filters/infrared.png");
const LATESUNSET_LUT =  require("../assets/filters/latesunset.png");
const MATRIX_LUT =  require("../assets/filters/matrix.png");
const MONO_BLUEFILTER_LUT =  require("../assets/filters/mono-blue-filter.png");
const MONO_GREENFILTER_LUT =  require("../assets/filters/mono-greenfilter.png");
const MONO_NEUTRALDENSITY_LUT =  require("../assets/filters/mono-neutral-density.png");
const MONO_REDFILTER_LUT =  require("../assets/filters/mono-redfilter.png");
const MONO_YELLOWFILTER_LUT =  require("../assets/filters/mono-yellowfilter.png");
const NEUTRAL_LUT =  require("../assets/filters/neutral.png");
const NIGHTBLUES_LUT =  require("../assets/filters/nightblues.png");
const NOIR_LUT =  require("../assets/filters/noir.png");
const ORANGEBLUES_LUT =  require("../assets/filters/orangeblues.png");
const PILOT_LUT =  require("../assets/filters/pilot.png");
const RETROBROWN_LUT =  require("../assets/filters/retrobrown.png");
const SEPIA_LUT =  require("../assets/filters/sepia.png");
const SIMPLYRED_LUT =  require("../assets/filters/simplyred.png");
const STRANGERTHINGS_LUT =  require("../assets/filters/strangerthings.png");
const TENSIONGREEN_LUT =  require("../assets/filters/tensiongreen.png");
const THREESTRIP_LUT =  require("../assets/filters/threestrip.png");
const TINTYPE_LUT =  require("../assets/filters/tintype.png");
const TWOSTRIP_LUT =  require("../assets/filters/twostrip.png");
const WALKINGDEAD_LUT =  require("../assets/filters/walkingdead.png");
const WASHOUT_LUT =  require("../assets/filters/washout.png");

const ALIENGREEN = "ALIENGREEN";
const ALIENRED = "ALIENRED";
const AMBER = "AMBER";
const AUTUMN = "AUTUMN";
const BLEAK = "BLEAK";
const BRIGHTWINTER = "BRIGHTWINTER";
const CANDLELIGHT = "CANDLELIGHT";
const COOLING = "COOLING";
const CORDUROY = "CORDUROY";
const DREAMCLOVER = "DREAMCLOVER";
const DREAMPANDORA = "DREAMPANDORA";
const DREAMRED = "DREAMRED";
const DROPBLUE = "DROPBLUE";
const HORRORBLUE = "HORRORBLUE";
const INFRARED = "INFRARED";
const LATESUNSET = "LATESUNSET";
const MATRIX = "MATRIX";
const MONO_BLUEFILTER = "MONO_BLUEFILTER";
const MONO_GREENFILTER = "MONO_GREENFILTER";
const MONO_NEUTRALDENSITY = "MONO_NEUTRALDENSITY";
const MONO_REDFILTER = "MONO_REDFILTER";
const MONO_YELLOWFILTER = "MONO_YELLOWFILTER";
const NEUTRAL = "NEUTRAL";
const NIGHTBLUES = "NIGHTBLUES";
const NOIR = "NOIR";
const ORANGEBLUES = "ORANGEBLUES";
const PILOT = "PILOT";
const RETROBROWN = "RETROBROWN";
const SEPIA = "SEPIA";
const SIMPLYRED = "SIMPLYRED";
const STRANGERTHINGS = "STRANGERTHINGS";
const TENSIONGREEN = "TENSIONGREEN";
const THREESTRIP = "THREESTRIP";
const TINTYPE = "TINTYPE";
const TWOSTRIP = "TWOSTRIP";
const WALKINGDEAD = "WALKINGDEAD";
const WASHOUT = "WASHOUT";

const ASCII_SHADER = 'ASCII_SHADER';
const ColdCGA_SHADER = 'ColdCGA_SHADER';
const HalfTone_SHADER = 'HalfTone_SHADER';
const LowQualityPorn_SHADER = 'LowQualityPorn_SHADER';
const Sobel_SHADER = 'Sobel_SHADER';
const Warhol_SHADER = 'Warhol_SHADER';

const filterConsts = [
  {
    shader: LUT,
    lut: NOIR_LUT,
    value: NOIR,
    shaderName: "LUT",
    name: "Noir",
    preview: NOIR_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: MONO_BLUEFILTER_LUT,
    value: MONO_BLUEFILTER,
    shaderName: "LUT",
    name: "Mono B",
    preview: MONO_BLUEFILTER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: MONO_GREENFILTER_LUT,
    value: MONO_GREENFILTER,
    shaderName: "LUT",
    name: "Mono G",
    preview: MONO_GREENFILTER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: MONO_YELLOWFILTER_LUT,
    value: MONO_YELLOWFILTER,
    shaderName: "LUT",
    name: "Mono_Y",
    preview: MONO_YELLOWFILTER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: MONO_REDFILTER_LUT,
    value: MONO_REDFILTER,
    shaderName: "LUT",
    name: "Mono R",
    preview: MONO_REDFILTER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: MONO_NEUTRALDENSITY_LUT,
    value: MONO_NEUTRALDENSITY,
    shaderName: "LUT",
    name: "Mono ND",
    preview: MONO_NEUTRALDENSITY_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: INFRARED_LUT,
    value: INFRARED,
    shaderName: "LUT",
    name: "Infrared",
    preview: INFRARED_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: RETROBROWN_LUT,
    value: RETROBROWN,
    shaderName: "LUT",
    name: "70s Brown",
    preview: RETROBROWN_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: SEPIA_LUT,
    value: SEPIA,
    shaderName: "LUT",
    name: "Sepia",
    preview: SEPIA_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: CORDUROY_LUT,
    value: CORDUROY,
    shaderName: "LUT",
    name: "Corduroy",
    preview: CORDUROY_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: TINTYPE_LUT,
    value: TINTYPE,
    shaderName: "LUT",
    name: "Tin Type",
    preview: TINTYPE_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: WASHOUT_LUT,
    value: WASHOUT,
    shaderName: "LUT",
    name: "Washout",
    preview: WASHOUT_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: THREESTRIP_LUT,
    value: THREESTRIP,
    shaderName: "LUT",
    name: "Threestrip",
    preview: THREESTRIP_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: TWOSTRIP_LUT,
    value: TWOSTRIP,
    shaderName: "LUT",
    name: "Twostrip",
    preview: TWOSTRIP_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: ALIENGREEN_LUT,
    value: ALIENGREEN,
    shaderName: "LUT",
    name: "Alien Green",
    preview: ALIENGREEN_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: ALIENRED_LUT,
    value: ALIENRED,
    shaderName: "LUT",
    name: "Alien Red",
    preview: ALIENRED_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: AMBER_LUT,
    value: AMBER,
    shaderName: "LUT",
    name: "Amber",
    preview: AMBER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: AUTUMN_LUT,
    value: AUTUMN,
    shaderName: "LUT",
    name: "Autumn",
    preview: AUTUMN_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: BLEAK_LUT,
    value: BLEAK,
    shaderName: "LUT",
    name: "Bleak",
    preview: BLEAK_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: BRIGHTWINTER_LUT,
    value: BRIGHTWINTER,
    shaderName: "LUT",
    name: "Brightwinter",
    preview: BRIGHTWINTER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: CANDLELIGHT_LUT,
    value: CANDLELIGHT,
    shaderName: "LUT",
    name: "Candlelight",
    preview: CANDLELIGHT_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: LATESUNSET_LUT,
    value: LATESUNSET,
    shaderName: "LUT",
    name: "Latesunset",
    preview: LATESUNSET_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: COOLING_LUT,
    value: COOLING,
    shaderName: "LUT",
    name: "Cooling",
    preview: COOLING_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: DREAMCLOVER_LUT,
    value: DREAMCLOVER,
    shaderName: "LUT",
    name: "Clover",
    preview: DREAMCLOVER_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: DREAMPANDORA_LUT,
    value: DREAMPANDORA,
    shaderName: "LUT",
    name: "Pandora",
    preview: DREAMPANDORA_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: DREAMRED_LUT,
    value: DREAMRED,
    shaderName: "LUT",
    name: "Dream Red",
    preview: DREAMRED_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: DROPBLUE_LUT,
    value: DROPBLUE,
    shaderName: "LUT",
    name: "Dropped Blue",
    preview: DROPBLUE_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: HORRORBLUE_LUT,
    value: HORRORBLUE,
    shaderName: "LUT",
    name: "Innsmouth",
    preview: HORRORBLUE_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: MATRIX_LUT,
    value: MATRIX,
    shaderName: "LUT",
    name: "Matrix",
    preview: MATRIX_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: TENSIONGREEN_LUT,
    value: TENSIONGREEN,
    shaderName: "LUT",
    name: "Anderson",
    preview: TENSIONGREEN_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: NIGHTBLUES_LUT,
    value: NIGHTBLUES,
    shaderName: "LUT",
    name: "Nightblues",
    preview: NIGHTBLUES_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: ORANGEBLUES_LUT,
    value: ORANGEBLUES,
    shaderName: "LUT",
    name: "Orangeblues",
    preview: ORANGEBLUES_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: PILOT_LUT,
    value: PILOT,
    shaderName: "LUT",
    name: "Pilot",
    preview: PILOT_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: SIMPLYRED_LUT,
    value: SIMPLYRED,
    shaderName: "LUT",
    name: "Simplyred",
    preview: SIMPLYRED_LUT_PREVIEW,
  },
  {
    shader: LUT,
    lut: STRANGERTHINGS_LUT,
    value: STRANGERTHINGS,
    shaderName: "LUT",
    name: "Strangerville",
    preview: STRANGERTHINGS_LUT_PREVIEW,
  },

  {
    shader: LUT,
    lut: WALKINGDEAD_LUT,
    value: WALKINGDEAD,
    shaderName: "LUT",
    name: "DeadXDaylight",
    preview: WALKINGDEAD_LUT_PREVIEW,
  },

  { shader: ASCII,
    value: ASCII_SHADER,
    lut: NEUTRAL_LUT,
    shaderName: ASCII_SHADER, 
    name: 'ASCII',
    preview: NEUTRAL_LUT_PREVIEW
  },
  { shader: ColdCGA,
    value: ColdCGA_SHADER,
    lut: NEUTRAL_LUT,
    shaderName: ColdCGA_SHADER, 
    name: 'ColdCGA',
    preview: NEUTRAL_LUT_PREVIEW
  },
  { shader: HalfTone,
    value: HalfTone_SHADER,
    lut: NEUTRAL_LUT,
    shaderName: HalfTone_SHADER, 
    name: 'HalfTone',
    preview: NEUTRAL_LUT_PREVIEW
  },
  { shader: LowQualityPorn,
    value: LowQualityPorn_SHADER,
    lut: NEUTRAL_LUT,
    shaderName: LowQualityPorn_SHADER, 
    name: 'Low Quality Porn',
    preview: NEUTRAL_LUT_PREVIEW
  },
  { shader: Sobel,
    value: Sobel_SHADER,
    lut: NEUTRAL_LUT,
    shaderName: Sobel_SHADER, 
    name: 'Vault Hunter',
    preview: NEUTRAL_LUT_PREVIEW
  },
  { shader: Warhol,
    value: Warhol_SHADER,
    lut: NEUTRAL_LUT,
    shaderName: Warhol_SHADER, 
    name: 'Warhol',
    preview: NEUTRAL_LUT_PREVIEW
  },
  
];

export default filterConsts;
