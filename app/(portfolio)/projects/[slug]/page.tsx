import { Button } from '@/components/ui/button';
import { LexicalRenderer } from '@/components/lexical/renderer';
import { getProjectBySlug } from '@/server/services/project.server';
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
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | M Farhan Ramadhan`,
    description: project.summary ?? undefined,
    openGraph: {
      title: project.title,
      description: project.summary ?? undefined,
      images: [{ url: project.image }],
      type: 'article',
    },
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailProps) => {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const cleanTags = (project.tags ?? []).map((tag) =>
    tag.replace(/[\[\]"]/g, '').trim()
  );

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pt-10 pb-24 md:px-6">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors hover:text-orange-500 dark:text-slate-400"
      >
        &larr; Back to projects
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {project.category?.title && (
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-orange-500 uppercase">
            {project.category.title}
          </span>
        )}
        {cleanTags.slice(0, 6).map((tag) => (
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

      {project.image && (
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-slate-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover object-top"
          />
        </div>
      )}

      {project.content ? (
        <LexicalRenderer content={project.content} />
      ) : (
        <p className="text-slate-500 dark:text-slate-400">
          Detailed write-up for this project is coming soon.
        </p>
      )}
    </article>
  );
};

export default ProjectDetailPage;
