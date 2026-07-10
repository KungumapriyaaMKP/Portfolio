import type { IconType } from "react-icons";
import { DiJava } from "react-icons/di";
import { FaFileExcel, FaFilePowerpoint } from "react-icons/fa6";
import {
  LuBrainCircuit,
  LuCpu,
  LuDatabase,
  LuLayers,
  LuListTree,
  LuPalette,
  LuScanFace,
} from "react-icons/lu";
import {
  SiBlender,
  SiC,
  SiCplusplus,
  SiCss,
  SiExpress,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNodedotjs,
  SiNvidia,
  SiPython,
  SiReact,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type IconMeta = { icon: IconType; color: string };

export const techIcons: Record<string, IconMeta> = {
  C: { icon: SiC, color: "#A8B9CC" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "Data Structures": { icon: LuListTree, color: "#f5954a" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#1572B6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Python: { icon: SiPython, color: "#3776AB" },
  Java: { icon: DiJava, color: "#F89820" },
  DBMS: { icon: LuDatabase, color: "#f5954a" },
  OOPS: { icon: LuLayers, color: "#f5954a" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  DeepFace: { icon: LuScanFace, color: "#f5954a" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "#ffffff" },
  "Artificial Intelligence": { icon: LuBrainCircuit, color: "#f5954a" },
  "Machine Learning": { icon: LuCpu, color: "#f5954a" },
};

export const toolIcons: Record<string, IconMeta> = {
  "VS Code": { icon: VscVscode, color: "#007ACC" },
  Canva: { icon: LuPalette, color: "#00C4CC" },
  PowerPoint: { icon: FaFilePowerpoint, color: "#B7472A" },
  Excel: { icon: FaFileExcel, color: "#217346" },
  "Jupyter Notebook": { icon: SiJupyter, color: "#F37626" },
  Blender: { icon: SiBlender, color: "#EA7600" },
  n8n: { icon: SiN8N, color: "#EA4B71" },
  "MySQL Workbench": { icon: SiMysql, color: "#4479A1" },
  GitHub: { icon: SiGithub, color: "#ffffff" },
  Omniverse: { icon: SiNvidia, color: "#76B900" },
};
