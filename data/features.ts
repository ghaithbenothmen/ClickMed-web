import {
  BadgeCheck,
  Cookie,
  FilePenLine,
  History,
  LockKeyhole,
  Sparkles,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { FeatureGroup, SecurityPoint } from "@/types";

export const featureGroups: FeatureGroup[] = [
  {
    id: "patients",
    time: "09:30",
    title: "Patients",
    summary: "L'essentiel de votre patient, lisible d'un coup d'œil.",
    items: ["Identité", "Antécédents", "Allergies", "Traitements"],
    icon: UsersRound,
  },
  {
    id: "historique",
    time: "09:31",
    title: "Historique",
    summary: "Ce qui a été fait, prescrit et observé, retrouvé en quelques secondes.",
    items: ["Consultations précédentes", "Prescriptions passées", "Observations"],
    icon: History,
  },
  {
    id: "consultation",
    time: "09:32",
    title: "Consultation",
    summary: "Motif, examen, diagnostic et notes, dans l'ordre de votre raisonnement.",
    items: ["Motif", "Examen clinique", "Diagnostic", "Notes"],
    icon: Stethoscope,
  },
  {
    id: "ia",
    time: "09:38",
    title: "Assistant IA",
    summary: "Des pistes de réflexion pendant la consultation. La décision reste la vôtre.",
    items: ["Hypothèses diagnostiques", "Points à vérifier"],
    icon: Sparkles,
  },
  {
    id: "prescription",
    time: "09:41",
    title: "Prescription",
    summary: "Des ordonnances prêtes en quelques secondes, vérifiées contre les allergies.",
    items: ["Modèles", "Alertes allergies", "PDF", "Impression"],
    icon: FilePenLine,
  },
];

export const securityPoints: SecurityPoint[] = [
  {
    title: "Session sécurisée",
    description: "La session est gérée côté serveur.",
    icon: LockKeyhole,
  },
  {
    title: "Accès médecin",
    description: "Un identifiant médecin personnel pour chaque compte.",
    icon: UserRound,
  },
  {
    title: "Comptes validés",
    description: "Chaque compte est créé et validé par l'administrateur.",
    icon: BadgeCheck,
  },
  {
    title: "Cookie sécurisé",
    description: "La connexion repose sur un cookie de session sécurisé.",
    icon: Cookie,
  },
];
