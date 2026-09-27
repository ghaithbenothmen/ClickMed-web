/**
 * All visible marketing copy lives here, in French.
 * Product mockups use the demo data at the bottom of this file.
 * Every value shown in a mockup is illustrative UI, not a medical claim.
 */

export const site = {
  name: "SHIFA",
  tagline: "Le cabinet médical, simplifié.",
  description:
    "Patients, rendez-vous, consultations et ordonnances réunis dans un seul espace de travail, avec une IA qui aide le médecin à réfléchir, sans jamais décider à sa place.",
  /** Set NEXT_PUBLIC_SITE_URL in production so Open Graph URLs are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Where "Demander un accès médecin" leads from the final section.
   * Replace with the SHIFA app access-request route once it is public.
   */
  accessRequestUrl: "#contact",
} as const;

export const hero = {
  chapter: { time: "08:30", label: "Ouverture du cabinet" },
  titleLines: ["Le cabinet médical,", "simplifié."],
  lead: "Patients, rendez-vous, consultations et ordonnances réunis dans un seul espace de travail.",
  aiNote: "Une IA vous aide à réfléchir. La décision reste toujours entre les mains du médecin.",
  primaryCta: "Demander un accès médecin",
  secondaryCta: "Découvrir SHIFA",
} as const;

export const intro = {
  statement: "Tout ce dont le médecin a besoin. Rien de plus.",
  body: "SHIFA rassemble les outils essentiels du cabinet dans une expérience simple, rapide et pensée autour du médecin.",
  fragmentedTitle: "Aujourd'hui, le cabinet est éparpillé.",
  fragmentedBody:
    "Un agenda d'un côté, les dossiers de l'autre, les ordonnances sur un carnet et les résultats dans un tiroir.",
  unifiedTitle: "Avec SHIFA, tout tient dans un seul espace.",
  unifiedBody: "Le patient, sa consultation, son ordonnance et son prochain rendez-vous, au même endroit.",
  fragments: [
    "Agenda papier",
    "Carnet d'ordonnances",
    "Dossiers cartonnés",
    "Post-it",
    "Tableur",
    "Messages",
  ],
} as const;

export const patients = {
  chapter: { time: "09:30", label: "Arrivée de la patiente" },
  title: "Le dossier patient, sans détour.",
  body: "Retrouvez un patient en quelques lettres et ouvrez un dossier complet : identité, antécédents, allergies, traitements et historique des consultations.",
  points: [
    { title: "Recherche instantanée", text: "Par nom, date de naissance ou téléphone." },
    { title: "Tri et filtres", text: "La liste s'organise comme vous travaillez." },
    { title: "Création rapide", text: "Un nouveau patient en quelques champs." },
  ],
} as const;

export const consultation = {
  chapter: { time: "09:32", label: "Consultation" },
  title: "Une consultation pensée autour du médecin.",
  body: "Motif, examen clinique, diagnostics et notes s'enchaînent dans l'ordre de votre raisonnement. Les constantes et l'historique restent à portée de regard.",
  autosave: "Enregistré automatiquement",
  saving: "Enregistrement…",
  finish: "Terminer la consultation",
} as const;

export const ai = {
  chapter: { time: "09:38", label: "Réflexion clinique" },
  title: "Une IA qui aide à réfléchir. Jamais à décider.",
  body: "SHIFA analyse les informations déjà présentes dans le dossier et propose des pistes de réflexion directement dans la consultation.",
  disclaimer: "Aide à la décision uniquement. La validation finale revient toujours au médecin.",
  steps: [
    { title: "Données patient", text: "Âge, antécédents, allergies et traitements en cours." },
    { title: "Contexte clinique", text: "Motif, examen et constantes de la consultation." },
    { title: "Analyse", text: "L'assistant relit le dossier, sans rien vous demander de ressaisir." },
    { title: "Hypothèses", text: "Jusqu'à trois pistes, classées par probabilité, expliquées en une ligne." },
    { title: "Points à vérifier", text: "Examens, questions de suivi et vigilance sur les allergies." },
  ],
} as const;

export const prescription = {
  chapter: { time: "09:41", label: "Ordonnance" },
  title: "Prescrire plus simplement.",
  body: "Partez d'un modèle, ajustez les posologies, puis imprimez ou exportez en PDF. Si un médicament entre en conflit avec une allergie connue, SHIFA vous le signale avant l'impression.",
  points: ["Modèles d'ordonnance", "Alerte allergies", "Impression", "Export PDF"],
} as const;

export const appointments = {
  chapter: { time: "12:30", label: "Planning" },
  title: "Votre journée, en un coup d'œil.",
  body: "Passez du jour à la semaine ou au mois, créez un rendez-vous en un geste et ouvrez la consultation directement depuis l'agenda.",
} as const;

export const productivity = {
  chapter: { time: "14:00", label: "L'après-midi file" },
  title: "Pensé pour aller vite.",
  body: "Chaque action courante est à une touche de distance. Rien ne se perd, rien ne vous ralentit.",
  tryIt: "Essayez Ctrl + K sur cette page",
  concepts: [
    { title: "Tout retrouver rapidement", text: "Un patient, un rendez-vous, une page : tapez, c'est ouvert." },
    { title: "Rien ne se perd", text: "Chaque note est enregistrée pendant que vous écrivez." },
    { title: "Une navigation sans friction", text: "Un retour immédiat à chaque clic, sans écran blanc." },
  ],
} as const;

export const features = {
  chapter: { time: "17:30", label: "Bilan de la journée" },
  title: "Une journée entière, dans un seul outil.",
  body: "Cinq espaces qui se parlent, pour que chaque information saisie serve partout.",
} as const;

export const security = {
  chapter: { time: "18:00", label: "Fermeture de session" },
  title: "Vos données médicales méritent une attention particulière.",
  body: "Les accès sont créés et validés par l'administrateur. Chaque médecin dispose d'un compte personnel et d'une session protégée.",
  flowTitle: "Comment un médecin rejoint SHIFA",
  flow: [
    { title: "Demande d'accès", text: "Le médecin envoie sa demande." },
    { title: "Validation", text: "L'administrateur crée et valide le compte." },
    { title: "Première connexion", text: "Identifiant médecin personnel et mot de passe temporaire." },
    { title: "Session protégée", text: "Une session sécurisée côté serveur, par cookie." },
  ],
} as const;

export const finalCta = {
  chapter: { time: "18:05", label: "Fin de journée" },
  title: "Prêt à simplifier votre cabinet ?",
  body: "Demandez votre accès médecin et découvrez SHIFA.",
  primaryCta: "Demander un accès médecin",
  secondaryCta: "Découvrir le produit",
} as const;

export const footer = {
  copyright: "© 2026 SHIFA",
  access: "Demander un accès",
} as const;

/* ------------------------------------------------------------------ */
/* Demo data for the product mockups                                  */
/* ------------------------------------------------------------------ */

export const demo = {
  doctor: { firstName: "Karim", display: "Dr Karim Haddad", initials: "KH", specialty: "Médecine générale" },
  date: "Lundi 28 septembre",
  patients: [
    { name: "Mohamed Ben Ali", birth: "12/03/1984", phone: "+216 20 000 101", initials: "MB" },
    { name: "Sarra Trabelsi", birth: "04/11/1991", phone: "+216 20 000 102", initials: "ST" },
    { name: "Ahmed Mansour", birth: "27/06/1958", phone: "+216 20 000 103", initials: "AM" },
    { name: "Mariem Ben Salah", birth: "19/01/2002", phone: "+216 20 000 104", initials: "MS" },
  ],
  vitals: [
    { label: "Tension", value: "120 / 80", unit: "mmHg", numeric: null },
    { label: "FC", value: "72", unit: "bpm", numeric: 72 },
    { label: "Température", value: "37.1", unit: "°C", numeric: 37.1 },
    { label: "SpO₂", value: "98", unit: "%", numeric: 98 },
    { label: "Poids", value: "72", unit: "kg", numeric: 72 },
    { label: "Taille", value: "178", unit: "cm", numeric: 178 },
  ],
  agenda: [
    { time: "09:00", name: "Mohamed Ben Ali", reason: "Suivi tension", status: "termine" },
    { time: "09:30", name: "Sarra Trabelsi", reason: "Toux fébrile", status: "confirme" },
    { time: "10:15", name: "Ahmed Mansour", reason: "Renouvellement", status: "attente" },
    { time: "11:00", name: "Mariem Ben Salah", reason: "Certificat", status: "annule" },
  ],
} as const;

export const statusLabels = {
  confirme: "Confirmé",
  attente: "En attente",
  termine: "Terminé",
  annule: "Annulé",
} as const;
