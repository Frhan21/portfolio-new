import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Document } from '@langchain/core/documents';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getCertificates } from '@/server/services/certificate.server';
import { getExperiences } from '@/server/services/experience.server';
import { getProject } from '@/server/services/project.server';
import { getPortfolioProfile } from '@/server/services/profile.server';

type LexicalNode = {
  type?: string;
  text?: string;
  alt?: string;
  caption?: string;
  fileName?: string;
  children?: LexicalNode[];
};

const cleanList = (values: string[]) =>
  values.map((value) => value.replace(/[\[\]"]/g, '').trim()).filter(Boolean);

const lexicalNodeText = (node: LexicalNode): string => {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'linebreak') return '\n';

  const ownText = [node.alt, node.caption, node.fileName]
    .filter(Boolean)
    .join(' ');
  const childrenText = (node.children ?? []).map(lexicalNodeText).join('');
  const separator = ['paragraph', 'heading', 'quote', 'listitem'].includes(
    node.type ?? ''
  )
    ? '\n'
    : '';

  return `${ownText}${ownText && childrenText ? ' ' : ''}${childrenText}${separator}`;
};

export function lexicalToText(content: unknown): string {
  if (!content || typeof content !== 'object') return '';

  const root = (content as { root?: LexicalNode }).root;
  return root
    ? lexicalNodeText(root)
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    : '';
}

export async function loadPdfDocuments(
  directory = path.join(process.cwd(), 'data', 'pdf')
): Promise<Document[]> {
  const files = await fs
    .readdir(directory)
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
  const pdfFiles = files.filter((file) => file.toLowerCase().endsWith('.pdf'));
  const documents = await Promise.all(
    pdfFiles.map(async (file) => {
      const filePath = path.join(directory, file);
      const pages = await new PDFLoader(filePath).load();
      return pages.map(
        (page) =>
          new Document({
            pageContent: page.pageContent,
            metadata: {
              ...page.metadata,
              source: file,
              sourceType: 'pdf',
            },
          })
      );
    })
  );

  return documents.flat();
}

export async function loadPortfolioDocuments(): Promise<Document[]> {
  const [profile, projects, experiences, certificates] = await Promise.all([
    getPortfolioProfile(),
    getProject(),
    getExperiences(),
    getCertificates(),
  ]);

  return [
    new Document({
      pageContent: [
        `Name: ${profile.displayName}`,
        `Headline: ${profile.headline}`,
        `Bio: ${profile.bio}`,
        `Email: ${profile.email}`,
      ].join('\n'),
      metadata: {
        source: 'portfolio profile',
        sourceType: 'profile',
        entityId: String(profile.id),
      },
    }),
    ...projects.map(
      (project) =>
        new Document({
          pageContent: [
            `Project: ${project.title}`,
            project.summary && `Summary: ${project.summary}`,
            lexicalToText(project.content),
            `Tags: ${cleanList(project.tags).join(', ')}`,
            project.category && `Category: ${project.category.title}`,
            project.demo && `Demo: ${project.demo}`,
            project.github && `GitHub: ${project.github}`,
          ]
            .filter(Boolean)
            .join('\n'),
          metadata: {
            source: project.title,
            sourceType: 'project',
            entityId: project.id,
            slug: project.slug,
          },
        })
    ),
    ...experiences.map(
      (experience) =>
        new Document({
          pageContent: [
            `Experience: ${experience.position} at ${experience.company}`,
            `Period: ${experience.startDate.toISOString()} - ${experience.endDate?.toISOString() ?? 'Present'}`,
            `Description: ${experience.description}`,
            `Skills: ${cleanList(experience.badges).join(', ')}`,
          ].join('\n'),
          metadata: {
            source: `${experience.position} at ${experience.company}`,
            sourceType: 'experience',
            entityId: experience.id,
          },
        })
    ),
    ...certificates.map(
      (certificate) =>
        new Document({
          pageContent: [
            `Certificate: ${certificate.title}`,
            `Issuer: ${certificate.issuer}`,
            `Issued: ${certificate.issuer_date.toISOString()}`,
            certificate.category && `Category: ${certificate.category.title}`,
          ]
            .filter(Boolean)
            .join('\n'),
          metadata: {
            source: certificate.title,
            sourceType: 'certificate',
            entityId: certificate.id,
          },
        })
    ),
  ];
}
