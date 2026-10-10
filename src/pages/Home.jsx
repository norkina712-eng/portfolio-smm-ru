import { useEffect } from 'react';
import HeroScene from '../components/HeroScene';
import Marquee from '../components/Marquee';
import WorkExplorer from '../components/WorkExplorer';
import AboutPanel from '../components/AboutPanel';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  useEffect(() => {
    document.title = 'Норкина Валерия — SMM-специалист';
  }, []);

  return (
    <>
      <HeroScene />
      <Marquee />
      <WorkExplorer />
      <AboutPanel />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
