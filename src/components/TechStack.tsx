import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  const stack = [
  ] as {
    src: string;
    title: string;
    className?: string;
  }[];
  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Most Experienced In...
      </Heading>
      <div className="flex flex-wrap mb-12">
        {stack.map((item) => (
          <Image
            src={item.src}
            key={item.src}
            width={40}
            height={40}
            alt={item.title}
            className={twMerge("object-contain mr-4 mb-4", item.className)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Heading
            as="h3"
            className="font-semibold text-base md:text-base lg:text-base mb-2"
          >
            Strengths
          </Heading>
          <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
            <li>UI/UX Development</li>
            <li>UI Design</li>
            <li>API Developement</li>
            <li>AI Integrations</li>
            <li>Web Applications</li>
            <li>Website Development</li>
          </ul>
        </div>

        <div>
          <Heading
            as="h3"
            className="font-semibold text-base md:text-base lg:text-base mb-2"
          >
            Coding Languages
          </Heading>
          <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>Python</li>
            <li>Vue.js</li>
            <li>Angular</li>
            <li>HTML</li>
          </ul>
        </div>

        <div>
          <Heading
            as="h3"
            className="font-semibold text-base md:text-base lg:text-base mb-2"
          >
            Frameworks
          </Heading>
          <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
            <li>Next.js</li>
            <li>Flutter</li>
            <li>Nuxt.js</li>
            <li>Laravel</li>
            <li>Express.js</li>
            <li>Firebase</li>
            <li>Supabase</li>
            <li>Django</li>
            <li>FastAPI</li>
            <li>React</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
