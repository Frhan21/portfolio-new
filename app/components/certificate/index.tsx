import { getCertificates } from '@/server/services/certificate.server';
import CertificateSlider from './certificate-slider';

const Certificate = async () => {
  const certificates = await getCertificates();

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-fit py-24 md:px-12 px-4 mx-auto"
      id="certificates"
    >
      <div className="flex flex-col md:flex-row justify-between items-end w-full max-w-7xl mx-auto gap-6">
        <div className="flex flex-col items-start gap-3 w-full max-w-2xl text-left">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              CERTIFICATES
            </span>
          </div>
          <span className="text-3xl md:text-5xl text-slate-900 dark:text-white font-extrabold leading-tight">
            Some certifications to
            <br />
            back the grind 🏆
          </span>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Still learning, still experimenting, still shipping things.
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <CertificateSlider certificates={certificates} />
      </div>
    </div>
  );
};

export default Certificate;
