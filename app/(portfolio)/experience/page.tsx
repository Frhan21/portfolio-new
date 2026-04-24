import { Briefcase } from 'lucide-react';
import Header from '../components/header';

const EXPERIENCE = [
  {
    id: 1,
    role: 'Data and Program Staff',
    company: 'LPPM Unand',
    period: 'Nov 2025 - Present',
    type: 'Contract',
    description:
      'Manage social media accounts and provide research support for academic projects.',
    skills: ['Social Media', 'Research Support'],
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: 'KodingData.',
    period: 'Sep 2025 - Nov 2025',
    type: 'Internship',
    description:
      'Contributed to development of responsice and user-friendly website using Next.js and Tailwind CSS',
    skills: ['React', 'Next.js', 'Team Leadership'],
  },
];

const ExperiencePage = () => {
  return (
    <>
      <div className="mt-5 space-y-8 px-4 md:px-6">
        <Header
          title="Work Experience"
          description="Perjalanan karir profesional saya di industri teknologi."
        />
        <div className="relative max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2 hidden md:block"></div>
          <div className="space-y-12">
            {EXPERIENCE.map((job, index) => (
              <div
                key={job.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0
                    ? 'md:text-right'
                    : 'md:flex-row-reverse md:text-left'
                }`}
              >
                <div className="absolute left-0 md:left-1/2 w-full md:w-auto flex md:justify-center transform md:-translate-x-1/2 -top-1 md:top-0">
                  <div className="bg-white border border-gray-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {job.period}
                  </div>
                </div>
                <div
                  className={`flex-1 md:w-1/2 pl-8 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute left-[-2rem] top-4 w-6 h-px bg-gray-200 md:hidden"></div>
                    <div className="absolute left-[-2.25rem] top-3 w-2 h-2 bg-orange-500 rounded-full md:hidden"></div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {job.role}
                    </h3>
                    <div
                      className={`flex items-center gap-2 text-sm text-orange-600 font-medium mb-3 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <Briefcase size={14} />
                      {job.company}
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-normal">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded border border-gray-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
