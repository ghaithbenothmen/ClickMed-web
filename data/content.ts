/**
 * All visible marketing copy lives here, in French.
 * Product mockups use the demo data at the bottom of this file.
 * Every value shown in a mockup is illustrative UI, not a medical claim.
 */

export const site = {
  name: "ClickMed",
  tagline: "Le cabinet médical, simplifié.",
  description:
    "Patients, rendez-vous, consultations et ordonnances réunis dans un seul espace de travail, avec une IA qui aide le médecin à réfléchir, sans jamais décider à sa place.",
  /** Set NEXT_PUBLIC_SITE_URL in production so Open Graph URLs are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Where "Demander un accès médecin" leads from the final section.
   * Replace with the ClickMed app access-request route once it is public.
   */
  accessRequestUrl: "#contact",
  /**
   * Free-trial sign-up ("Tester / Commencer gratuitement"). No sign-up flow exists yet,
   * so it opens the question form with the trial subject attached. Replace with the
   * app's sign-up route once it is public.
   */
  signupUrl: "?sujet=essai#question",
  /** Founder doctor offer: the question form, with the founder subject attached. */
  founderRequestUrl: "?sujet=fondateur#question",
  /** "Devenir partenaire": no partner flow exists, so the question form with the partner subject. */
  partnerUrl: "?sujet=partenaire#question",
} as const;

export const hero = {
  chapter: { time: "08:30", label: "Ouverture du cabinet" },
  titleLines: ["Des consultations plus simples,", "plus rapides et mieux organisées."],
  /** Supporting statement; `highlight` is visually emphasised. */
  lead: {
    before: "ClickMed vous aide à retrouver rapidement les informations de vos patients et à gérer ",
    highlight: "votre consultation",
    after: " dans un seul espace.",
  },
  primaryCta: "Tester ClickMed gratuitement",
  primaryNote: "Sans engagement",
  primaryHref: "#comment-ca-fonctionne",
  secondaryCta: "Découvrir ClickMed",
  highlights: ["Dossier patient complet", "Constantes intégrées", "Ordonnance en PDF"],
  /** Kept for the mobile menu. */
  aiNote: "Une IA vous aide à réfléchir. La décision reste toujours entre les mains du médecin.",
} as const;

/** "Comment ça fonctionne": getting started, after the tutorials. Target of the hero CTA. */
export const howItWorks = {
  title: "Commencez en quelques étapes.",
  steps: [
    { title: "Créez votre compte", text: "Inscrivez-vous gratuitement et accédez à ClickMed." },
    { title: "Testez ClickMed", text: "Créez jusqu'à 10 patients et utilisez ClickMed dans vos consultations." },
    {
      title: "Décidez par vous-même",
      text: "Découvrez si ClickMed correspond à votre façon de travailler avant de vous engager.",
    },
  ],
  reassurance: "Aucun engagement pour tester ClickMed.",
  cta: "Tester ClickMed gratuitement",
  ctaNote: "Sans engagement",
} as const;

export const tutorials = {
  title: "Découvrez ClickMed en quelques minutes.",
  body: "Des tutoriels courts pour vous montrer l'essentiel, sans formation compliquée.",
  /** `id` matches the video entry in data/media.ts (tutorialVideos). */
  items: [
    { id: "creer-patient", title: "Créer un patient", text: "Ajoutez un nouveau patient en quelques étapes." },
    {
      id: "demarrer-consultation",
      title: "Démarrer une consultation",
      text: "Retrouvez le patient et commencez sa consultation rapidement.",
    },
    {
      id: "consulter-historique",
      title: "Consulter l'historique",
      text: "Retrouvez les consultations et informations précédentes du patient.",
    },
    {
      id: "prescrire-terminer",
      title: "Prescrire et terminer une consultation",
      text: "Documentez la consultation et conservez toutes les informations pour la prochaine fois.",
    },
  ],
  placeholder: "Vidéo bientôt disponible",
  cta: "Commencer gratuitement",
  ctaNote: "Sans engagement",
} as const;

export const founderOffer = {
  badge: "OFFRE MÉDECIN FONDATEUR",
  title: "Rejoignez les 15 premiers médecins fondateurs de ClickMed.",
  positioning: "Vous ne rejoignez pas seulement ClickMed. Vous participez à sa construction.",
  seats: 15,
  seatsLabel: "places",
  price: "299 DT",
  priceLabel: "Offre médecin fondateur",
  benefits: [
    { title: "1 an de ClickMed", text: "Accès à ClickMed pendant 12 mois." },
    { title: "50 % de réduction à vie", text: "Une réduction de 50 % à vie sur les futurs abonnements." },
    {
      title: "Accompagnement individuel",
      text: "Une session personnalisée pour apprendre à utiliser ClickMed et l'adapter à votre façon de travailler.",
    },
    { title: "Support prioritaire", text: "Une assistance privilégiée lorsque vous avez besoin d'aide." },
    { title: "Accès anticipé aux évolutions", text: "Découvrez les nouvelles fonctionnalités en priorité." },
    {
      title: "Participation à l'évolution de ClickMed",
      text: "Votre retour en tant que médecin fondateur contribue directement à l'évolution du produit.",
    },
  ],
  cta: "Devenir médecin fondateur",
  reassurance: "Seulement 15 places disponibles.",
} as const;

export const intro = {
  statement: "Tout ce dont le médecin a besoin. Rien de plus.",
  body: "ClickMed rassemble les outils essentiels du cabinet dans une expérience simple, rapide et pensée autour du médecin.",
  fragmentedTitle: "Aujourd'hui, le cabinet est éparpillé.",
  fragmentedBody:
    "Un agenda d'un côté, les dossiers de l'autre, les ordonnances sur un carnet et les résultats dans un tiroir.",
  unifiedTitle: "Avec ClickMed, tout tient dans un seul espace.",
  unifiedBody: "Le patient, son historique, sa consultation et son ordonnance, au même endroit.",
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
  body: "Identité, antécédents, allergies et traitements en cours : l'essentiel de votre patient, lisible d'un coup d'œil.",
} as const;

export const history = {
  chapter: { time: "09:31", label: "Avant la consultation" },
  title: "Vous ne vous souvenez plus de la dernière consultation ? Plus besoin.",
  body: "Retrouvez en quelques secondes ce qui a été fait, prescrit et observé lors des consultations précédentes.",
} as const;

export const consultation = {
  chapter: { time: "09:32", label: "Consultation" },
  title: "Vous consultez. ClickMed suit.",
  body: "Pas besoin de changer votre façon de travailler. Motif, examen clinique, diagnostic et notes s'enchaînent dans l'ordre de votre raisonnement.",
  autosave: "Enregistré automatiquement",
  saving: "Enregistrement…",
  finish: "Terminer la consultation",
} as const;

export const ai = {
  chapter: { time: "09:38", label: "Réflexion clinique" },
  title: "Une IA qui aide à réfléchir. Jamais à décider.",
  body: "ClickMed analyse les informations déjà présentes dans le dossier et propose des pistes de réflexion directement dans la consultation.",
  disclaimer: "Aide à la décision uniquement. La validation finale revient toujours au médecin.",
} as const;

export const prescription = {
  chapter: { time: "09:41", label: "Ordonnance" },
  title: "Prescrire plus simplement.",
  body: "Partez d'un modèle, ajustez les posologies, puis imprimez ou exportez en PDF. Si un médicament entre en conflit avec une allergie connue, ClickMed vous le signale avant l'impression.",
  points: ["Modèles d'ordonnance", "Alerte allergies", "Impression", "Export PDF"],
} as const;

/** Not rendered on the homepage for now (section removed from app/page.tsx). */
export const appointments = {
  chapter: { time: "12:30", label: "Planning" },
  title: "Votre journée, en un coup d'œil.",
  body: "Passez du jour à la semaine ou au mois, créez un rendez-vous en un geste et ouvrez la consultation directement depuis l'agenda.",
} as const;

/** Ctrl + K section. Not rendered on the homepage for now (removed from app/page.tsx). */
export const productivity = {
  chapter: { time: "14:00", label: "L'après-midi file" },
  title: "Vous cherchez quelque chose ? Tapez. C'est trouvé.",
  body: "Avec Ctrl + K, recherchez directement ce dont vous avez besoin et accédez-y sans parcourir plusieurs pages.",
  tryIt: "Essayez Ctrl + K sur cette page",
  concepts: [
    { title: "Tout retrouver rapidement", text: "Un patient, un rendez-vous, une page : tapez, c'est ouvert." },
    { title: "Rien ne se perd", text: "Chaque note est enregistrée pendant que vous écrivez." },
    { title: "Une navigation sans friction", text: "Un retour immédiat à chaque clic, sans écran blanc." },
  ],
} as const;

export const features = {
  chapter: { time: "17:30", label: "Bilan de la journée" },
  title: "Une consultation. Un seul espace.",
  body: "Cinq espaces qui se parlent, pour que chaque information saisie serve partout.",
} as const;

/** Authority section, right after the feature summary. Figures are provided by ClickMed. */
export const builtWithDoctors = {
  title: "Conçu avec des médecins, pour leur façon de travailler.",
  paragraphs: [
    "Plus de 100 médecins ont contribué à la réflexion et à l'évolution de ClickMed.",
    "Leur objectif était simple : créer un outil qui s'adapte à la réalité d'une consultation.",
  ],
  conclusion: "Vous n'avez pas à changer votre façon de travailler. ClickMed l'améliore.",
  stat: {
    value: "100+",
    label: "médecins",
    caption: "ont contribué à la réflexion et à l'évolution de ClickMed.",
  },
} as const;

export const security = {
  chapter: { time: "18:00", label: "Fermeture de session" },
  title: "Vos données médicales méritent une attention particulière.",
  body: "Les accès sont créés et validés par l'administrateur. Chaque médecin dispose d'un compte personnel et d'une session protégée.",
  /** Onboarding flow: no longer shown in the security section, kept for reuse. */
  flowTitle: "Comment un médecin rejoint ClickMed",
  flow: [
    { title: "Demande d'accès", text: "Le médecin envoie sa demande." },
    { title: "Validation", text: "L'administrateur crée et valide le compte." },
    { title: "Première connexion", text: "Identifiant médecin personnel et mot de passe temporaire." },
    { title: "Session protégée", text: "Une session sécurisée côté serveur, par cookie." },
  ],
} as const;

export const finalCta = {
  chapter: { time: "18:05", label: "Fin de journée" },
  title: "Prêt à simplifier votre cabinet ?",
  body: "Demandez votre accès médecin et découvrez ClickMed.",
  primaryCta: "Tester gratuitement",
  secondaryCta: "Devenir partenaire",
} as const;

export const askQuestion = {
  title: "Une question ? Posez-la-nous.",
  body: "Écrivez-nous, notre équipe vous recontacte.",
  outcomesTitle: "Selon votre question, nous vous répondons avec :",
  outcomes: [
    { title: "Une réponse de notre FAQ", text: "Quand votre question est générale." },
    { title: "Plus d'informations sur ClickMed", text: "Si vous envisagez de l'utiliser dans votre cabinet." },
    { title: "Un échange direct", text: "Quand votre situation demande une réponse personnelle." },
  ],
  form: {
    title: "Formulaire de question",
    intentLabel: "Sujet :",
    intentRemove: "Retirer le sujet",
    name: "Nom complet",
    required: "obligatoire",
    contactLegend: "Comment vous recontacter ?",
    contactHint: "Téléphone ou e-mail : au moins l'un des deux.",
    phone: "Téléphone",
    email: "Adresse e-mail",
    question: "Votre question",
    questionPlaceholder: "Par exemple : comment importer mes dossiers patients existants ?",
    privacy: "Vos coordonnées servent uniquement à vous répondre.",
    submit: "Envoyer ma question",
    submitting: "Envoi en cours…",
    success: "Merci. Votre question a bien été envoyée. Notre équipe vous répondra prochainement.",
    another: "Poser une autre question",
    errorNotConfigured:
      "Votre question n'a pas pu être envoyée : l'envoi n'est pas encore activé sur ce site. Vos informations sont conservées.",
    errorFailed:
      "Votre question n'a pas pu être envoyée. Réessayez dans quelques instants : vos informations sont conservées.",
    errorSummary: (n: number) =>
      n === 1 ? "Le formulaire contient 1 erreur." : `Le formulaire contient ${n} erreurs.`,
  },
} as const;

export const footer = {
  copyright: "© 2026 ClickMed",
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
