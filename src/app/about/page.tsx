// src/app/about/page.tsx

"use client";

import { 
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

// Generate Metadata for SEO
export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function About() {
  // Define the structure for Table of Contents
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0]?.company || "",
            },
          }),
        }}
      />
      
      {/* Table of Contents */}
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}

      {/* Main Content */}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {/* Avatar Section */}
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
          </Column>
        )}

        {/* Content Block */}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          {/* Intro Section */}
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.intro.display && (
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
              </Column>
            )}
          </Column>

          {/* Calendar Schedule */}
          {about.calendar?.display && (
            <Flex
              fitWidth
              border="brand-alpha-medium"
              className={styles.blockAlign}
              style={{
                backdropFilter: "blur(var(--static-space-1))",
              }}
              background="brand-alpha-weak"
              radius="full"
              padding="4"
              gap="8"
              marginBottom="m"
              vertical="center"
            >
              <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
              <Flex paddingX="8">Schedule a call</Flex>
              <IconButton
                href={about.calendar.link}
                data-border="rounded"
                variant="secondary"
                icon="chevronRight"
              />
            </Flex>
          )}

          {/* Heading and Role */}
          <Heading className={styles.textAlign} variant="display-strong-xl">
            {person.name}
          </Heading>
          <Text
            className={styles.textAlign}
            variant="display-default-xs"
            onBackground="neutral-weak"
          >
            {person.role}
          </Text>

          {/* Social Links */}
          {social.length > 0 && (
            <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap>
              {social.map(
                (item) =>
                  item.link && (
                    <Button
                      key={item.name}
                      href={item.link}
                      prefixIcon={item.icon}
                      label={item.name}
                      size="s"
                      variant="secondary"
                    />
                  ),
              )}
            </Flex>
          )}

          {/* Work Experience */}
          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {Array.isArray(about.work.experiences) && about.work.experiences.length > 0 ? (
                  about.work.experiences.map((experience, index) => (
                    <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                      <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Flex>
                      <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                        {experience.role}
                      </Text>
                      <Column as="ul" gap="16">
                        {experience.achievements.map((achievement, idx) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-achievement-${idx}`}
                          >
                          </Text>
                        ))}
                      </Column>
                      {Array.isArray(experience.images) && experience.images.length > 0 && (
                        <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                          {experience.images.map((image, imgIdx) => (
                            <Flex
                              key={`${experience.company}-image-${imgIdx}`}
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <SmartImage
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Flex>
                          ))}
                        </Flex>
                      )}
                    </Column>
                  ))
                ) : (
                  <Text variant="body-default-s">No work experiences available.</Text>
                )}
              </Column>
            </>
          )}

          {/* Education/Studies */}
          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {Array.isArray(about.studies.institutions) && about.studies.institutions.length > 0 ? (
                  about.studies.institutions.map((institution, index) => (
                    <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {institution.description}
                      </Text>
                    </Column>
                  ))
                ) : (
                  <Text variant="body-default-s">No educational institutions available.</Text>
                )}
              </Column>
            </>
          )}

          {/* Technical Skills */}
          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {Array.isArray(about.technical.skills) && about.technical.skills.length > 0 ? (
                  about.technical.skills.map((skill, index) => (
                    <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                      <Text variant="heading-strong-l">{skill.title}</Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description}
                      </Text>
                      {Array.isArray(skill.images) && skill.images.length > 0 && (
                        <Flex fillWidth paddingTop="m" gap="12" wrap>
                          {skill.images.map((image, imgIdx) => (
                            <Flex
                              key={`${skill.title}-image-${imgIdx}`}
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <SmartImage
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Flex>
                          ))}
                        </Flex>
                      )}
                    </Column>
                  ))
                ) : (
                  <Text variant="body-default-s">No technical skills available.</Text>
                )}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
