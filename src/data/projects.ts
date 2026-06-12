export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  githubUrl: string;
  homepage?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'lingluo-home',
    name: 'LingLuoHome',
    description: '极简风格的个人主页，基于 Astro 构建',
    icon: '🏠',
    githubUrl: 'https://github.com/LingLuoMuYun/LittleHome',
    tags: ['Astro', 'TypeScript', 'CSS'],
  },
];
