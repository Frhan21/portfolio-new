import { Button } from '@/components/ui/button';
import { getCachedProjectBySlug } from '@/server/queries';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { LuArrowRight } from 'react-icons/lu';

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCachedProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  const image =
    typeof project.image === 'object' ? project.image?.url : undefined;

  return {
    title: `${project.title} | M Farhan Ramadhan`,
    description: project.summary ?? undefined,
    openGraph: {
      title: project.title,
      description: project.summary ?? undefined,
      images: image ? [{ url: image }] : undefined,
      type: 'article',
    },
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailProps) => {
  const { slug } = await params;
  const project = await getCachedProjectBySlug(slug);
  if (!project) notFound();

  const image = typeof project.image === 'object' ? project.image : null;
  const category =
    typeof project.category === 'object' ? project.category : null;

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pt-10 pb-24 md:px-6">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors hover:text-orange-500 dark:text-slate-400"
      >
        &larr; Back to projects
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {category && (
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-orange-500 uppercase">
            {category.title}
          </span>
        )}
        {!!project.tags?.length &&
          project.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
      </div>

      <h1 className="mb-4 text-3xl leading-tight font-extrabold text-slate-900 md:text-5xl dark:text-white">
        {project.title}
      </h1>

      {project.summary && (
        <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {project.summary}
        </p>
      )}

      <div className="mb-8 flex flex-wrap gap-3">
        {project.demo && (
          <Button
            asChild
            className="rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
          >
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <LuArrowRight size={16} />
              Live Demo
            </Link>
          </Button>
        )}
        {project.github && (
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-300 dark:border-slate-700"
          >
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={16} />
              Source Code
            </Link>
          </Button>
        )}
      </div>

      {image?.url && (
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-slate-800">
          <Image
            src={image.url}
            alt={image.alt || project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {project.content ? (
          <RichText data={project.content} />
        ) : (
          <p className="text-slate-500 dark:text-slate-400">
            Detailed write-up for this project is coming soon.
          </p>
        )}
      </div>
    </article>
  );
};

export default ProjectDetailPage;
