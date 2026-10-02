import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AIConsultation } from "@/components/sections/AIConsultation";
import { AskQuestion } from "@/components/sections/AskQuestion";
import { BuiltWithDoctors } from "@/components/sections/BuiltWithDoctors";
import { ConsultationExperience } from "@/components/sections/ConsultationExperience";
import { ConsultationHistory } from "@/components/sections/ConsultationHistory";
import { FeatureStory } from "@/components/sections/FeatureStory";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderOffer } from "@/components/sections/FounderOffer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Fragmented } from "@/components/sections/Fragmented";
import { Intro } from "@/components/sections/Intro";
import { PatientManagement } from "@/components/sections/PatientManagement";
import { Prescription } from "@/components/sections/Prescription";
import { Security } from "@/components/sections/Security";
import { Tutorials } from "@/components/sections/Tutorials";

/**
 * One doctor's day, from opening to closing:
 * hero → the scattered practice → patient → history → consultation → AI
 * → prescription → the day in review → built with doctors → security → tutorials
 * → how it works (free trial) → founder doctor offer → final CTA → ask us a question.
 * Appointments and Ctrl + K sections are kept in components/sections/ but not shown for now.
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
        <ConsultationHistory />
        <ConsultationExperience />
        <AIConsultation />
        <Prescription />
        <FeatureStory />
        <BuiltWithDoctors />
        <Security />
        <Tutorials />
        <HowItWorks />
        <FounderOffer />
        <FinalCTA />
        <AskQuestion />
      </main>
      <Footer />
    </>
  );
}
