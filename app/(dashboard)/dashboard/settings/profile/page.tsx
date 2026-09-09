import HeaderPage from '../../../component/header-page';
import { getPublicPortfolioProfile } from '@/server/services/profile.server';
import { ProfileForm } from './components/profile-form';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portfolio Profile',
};

export default async function ProfileSettingsPage() {
  const profile = await getPublicPortfolioProfile();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio settings"
        title="Profile, CV, and social links"
        description="Changes here are shown across the landing page, contact section, and footer."
      />
      <ProfileForm initialProfile={profile} />
    </div>
  );
}
