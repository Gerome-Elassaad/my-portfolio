// src/app/resources/types.ts

export interface Achievement {
    description: string;
  }
  
  export interface Experience {
    company: string;
    role: string;
    timeframe: string;
    achievements: Achievement[];
  }
  
  export interface Institution {
    name: string;
    description: string;
  }
  
  export interface SkillImage {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  
  export interface Skill {
    title: string;
    description: string;
    images: SkillImage[];
  }
  
  export interface Work {
    title: string;
    display: boolean;
    experiences: Experience[];
  }
  
  export interface Studies {
    title: string;
    display: boolean;
    institutions: Institution[];
  }
  
  export interface Technical {
    title: string;
    display: boolean;
    skills: Skill[];
  }
  
  export interface Intro {
    title: string;
    description: string;
    display: boolean;
  }
  
  export interface TableOfContent {
    display: boolean;
  }
  
  export interface AvatarDisplay {
    display: boolean;
  }
  
  export interface About {
    title: string;
    description: string;
    intro: Intro;
    work: Work;
    studies: Studies;
    technical: Technical;
    tableOfContent: TableOfContent;
    avatar: AvatarDisplay;
  }
  
  export interface Person {
    name: string;
    role: string;
    avatar: string;
    location: string;
    languages: string[];
  }
  
  export interface Social {
    name: string;
    link: string;
    icon: string;
  }
  
  export interface Content {
    about: About;
    person: Person;
    social: Social[];
  }
  