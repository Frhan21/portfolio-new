'use client';

import { DownloadIcon, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CvModalProps {
  cvUrl: string;
  name: string;
}

// CV is served through the same-origin /api/cv proxy (inline preview,
// ?download=1 forces download with the original filename).
const getFilename = (cvUrl: string) =>
  decodeURIComponent(cvUrl.split('/').pop() || 'cv.pdf');

export default function CvModal({ cvUrl, name }: CvModalProps) {
  const filename = getFilename(cvUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-[300px] flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-bold text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          Download CV
          <DownloadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>My CV</DialogTitle>
          <DialogDescription>
            {name}&apos;s curriculum vitae — preview below.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[70vh] rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-900">
          <object
            data="/api/cv"
            type="application/pdf"
            className="w-full h-full"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                PDF preview is not supported in this browser.
              </p>
              <Button asChild variant="outline" className="rounded-full">
                <a href="/api/cv?download=1" download={filename}>
                  Download CV instead
                  <DownloadIcon />
                </a>
              </Button>
            </div>
          </object>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" asChild className="rounded-full">
            <a href="/api/cv" target="_blank" rel="noopener noreferrer">
              Open in new tab
              <ExternalLink />
            </a>
          </Button>
          <Button asChild className="rounded-full">
            <a href="/api/cv?download=1" download={filename}>
              Download
              <DownloadIcon />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
