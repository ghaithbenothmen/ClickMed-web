import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AIConsultation } from "@/components/sections/AIConsultation";
import { Appointments } from "@/components/sections/Appointments";
import { ConsultationExperience } from "@/components/sections/ConsultationExperience";
import { FeatureStory } from "@/components/sections/FeatureStory";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Fragmented } from "@/components/sections/Fragmented";
import { Intro } from "@/components/sections/Intro";
import { PatientManagement } from "@/components/sections/PatientManagement";
import { Prescription } from "@/components/sections/Prescription";
import { Productivity } from "@/components/sections/Productivity";
import { Security } from "@/components/sections/Security";

/**
 * One doctor's day, from opening to closing:
 * hero → the scattered practice → patient → consultation → AI → prescription
 * → planning → productivity → the day in review → security → request access.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Intro />
        <Fragmented />
        <PatientManagement />
        <ConsultationExperience />
        <AIConsultation />
        <Prescription />
        <Appointments />
        <Productivity />
        <FeatureStory />
        <Security />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
