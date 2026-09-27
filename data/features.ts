import {
  BadgeCheck,
  CalendarDays,
  Cookie,
  FilePenLine,
  Keyboard,
  LockKeyhole,
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
    summary: "Le dossier médical complet, retrouvé en quelques lettres.",
    items: ["Dossier médical", "Recherche", "Filtres", "Historique"],
    icon: UsersRound,
  },
  {
    id: "consultation",
    time: "09:32",
    title: "Consultation",
    summary: "Une saisie structurée qui suit le raisonnement clinique.",
    items: ["Consultation structurée", "Historique", "Constantes", "IA"],
    icon: Stethoscope,
  },
  {
    id: "prescription",
    time: "09:41",
    title: "Prescription",
    summary: "Des ordonnances prêtes en quelques secondes, vérifiées contre les allergies.",
    items: ["Modèles", "Alertes allergies", "PDF", "Impression"],
    icon: FilePenLine,
  },
  {
    id: "organisation",
    time: "12:30",
    title: "Organisation",
    summary: "L'agenda du cabinet, du jour au mois.",
    items: ["Rendez-vous", "Planning", "Statuts"],
    icon: CalendarDays,
  },
  {
    id: "productivite",
    time: "14:00",
    title: "Productivité",
    summary: "Le clavier d'abord, pour ne jamais attendre l'outil.",
    items: ["Ctrl + K", "Autosave", "Navigation fluide"],
    icon: Keyboard,
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
