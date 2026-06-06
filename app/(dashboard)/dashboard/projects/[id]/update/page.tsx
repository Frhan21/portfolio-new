'use client';

import Breadcrumbs from '@/app/(dashboard)/component/breadcrumbs';

const UpdateProjectPage = () => {
  return (
    <div className="flex-1 px-4 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <Breadcrumbs />
        <div>
          <h1 className="text-3xl font-bold">Update Project</h1>
          <p className="text-sm text-muted-foreground">
            Form update project belum saya aktifkan lagi.
          </p>
        </div>
      </header>

      <div className="rounded-3xl border border-border/60 bg-card px-6 py-10 text-sm text-muted-foreground shadow-sm">
        Untuk sekarang alurnya saya sederhanakan dulu ke create project agar
        lebih mudah dianalisis dan dilanjutkan.
      </div>
    </div>
  );
};

export default UpdateProjectPage;
