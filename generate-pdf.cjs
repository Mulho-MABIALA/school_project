const { jsPDF } = require('jspdf');
require('jspdf-autotable');

// Données du cahier des charges
const data = {
  titre: "SchoolFlow - Cahier des Charges",
  soustitre: "Système de Gestion Scolaire Complet",

  sections: [
    {
      titre: "1. Contexte et objectif",
      contenu: "Dans un monde où le numérique prend de l'ampleur, où l'information est à portée de main, il est important de marcher avec l'évolution technologique. De ce fait, l'intérêt est de développer une application web complète permettant d'automatiser et de faciliter la gestion administrative, pédagogique, financière et organisationnelle d'un établissement scolaire. L'objectif est d'améliorer la productivité, la communication entre acteurs et la qualité du suivi des élèves."
    },
    {
      titre: "2. Périmètre et modules du projet",
      items: [
        "Gestion des élèves : inscriptions, dossiers, présences, historique scolaire",
        "Gestion des enseignants : affectations, emplois du temps, planification des cours",
        "Gestion des employés (Gestion RH) : postes, paie, pointage, badges",
        "Gestion des classes : création, affectation élèves, niveaux",
        "Gestion des matières : création, affectation, coefficients",
        "Gestion des notes et compétences : saisie, évaluations, moyennes",
        "Gestion des bulletins scolaires : génération automatique, diffusion",
        "Gestion administrative : paiements, facturation, sanctions",
        "Gestion des modes de paiement : Wave, Orange Money, MTN, Moov",
        "Communication intégrée : messagerie, notifications SMS/email",
        "Tableaux de bord : statistiques, analyses, performances",
        "Gestion des emplois du temps : création, modifications",
        "Sécurité : accès par rôles, chiffrement, RGPD",
        "Système de rapport : exports PDF, Excel"
      ]
    },
    {
      titre: "3. Fonctionnalités prioritaires - Roadmap",
      subsections: [
        {
          titre: "Phase 1 - MVP (4 mois)",
          items: [
            "✓ Authentification et gestion des rôles",
            "✓ Gestion des élèves (CRUD complet)",
            "✓ Gestion des classes et matières",
            "✓ Saisie et consultation des notes",
            "✓ Génération bulletins PDF basiques",
            "✓ Dashboard de base"
          ]
        },
        {
          titre: "Phase 2 - Gestion financière (3 mois)",
          items: [
            "○ Gestion des présences",
            "○ Cahier de texte enseignants",
            "○ Paiements basiques (espèces)",
            "○ Reçus numériques PDF",
            "○ Historique des paiements"
          ]
        },
        {
          titre: "Phase 3 - Paiements avancés (3 mois)",
          items: [
            "○ Interface paiement style Wave",
            "○ Intégration Orange/MTN/Moov Money",
            "○ Messagerie interne",
            "○ Notifications SMS/Email automatiques",
            "○ Tableaux de bord avancés"
          ]
        }
      ]
    },
    {
      titre: "4. Acteurs et profils utilisateurs",
      items: [
        "Administrateur général",
        "Secrétaire",
        "Enseignants",
        "Personnel",
        "Élèves",
        "Parents",
        "Responsable de classe"
      ]
    },
    {
      titre: "5. Contraintes techniques",
      subsections: [
        {
          titre: "Performance",
          items: [
            "Temps réponse API : < 200ms (95%)",
            "Chargement page : < 2 secondes",
            "Génération PDF : < 3 secondes",
            "500-1000 utilisateurs simultanés",
            "Disponibilité : 99.5%"
          ]
        },
        {
          titre: "Sécurité et RGPD",
          items: [
            "Chiffrement AES-256",
            "Conformité RGPD complète",
            "Journaux d'audit",
            "Sauvegarde quotidienne chiffrée",
            "Rétention 30 jours"
          ]
        }
      ]
    },
    {
      titre: "6. Technologies proposées",
      subsections: [
        {
          titre: "Frontend",
          items: [
            "Next.js : Framework React SSR/SSG",
            "TypeScript : Typage statique",
            "Tailwind CSS : Design moderne",
            "React Context API : Gestion d'état"
          ]
        },
        {
          titre: "Backend",
          items: [
            "Node.js + Express.js",
            "API RESTful versionnée (/api/v1)",
            "JWT : Authentification",
            "Socket.io : Temps réel"
          ]
        },
        {
          titre: "Base de données",
          items: [
            "MongoDB : Base NoSQL",
            "Mongoose : ODM",
            "Index optimisés",
            "Réplication et sharding"
          ]
        },
        {
          titre: "Tests et Qualité",
          items: [
            "Jest : Tests unitaires (70% couverture)",
            "Supertest : Tests API",
            "Cypress : Tests E2E",
            "ESLint + Prettier",
            "Code review obligatoire"
          ]
        }
      ]
    },
    {
      titre: "7. Équipe du Projet",
      items: [
        "1 Chef de Projet : Gestion, planification, coordination",
        "2 Développeurs Full Stack : Next.js, TypeScript, Node.js, MongoDB"
      ]
    },
    {
      titre: "8. Critères de succès",
      items: [
        "Phase 1 : 80% enseignants actifs, 100% bulletins générés",
        "Phase 2 : 90% présences saisies, 70% paiements enregistrés",
        "Phase 3 : 50% paiements mobile money, satisfaction > 4/5",
        "Adoption globale : 85% utilisateurs actifs après 3 mois",
        "Performance : 95% pages < 2s",
        "Disponibilité : 99.5% uptime"
      ]
    }
  ]
};

// Fonction pour ajouter du texte avec retour à la ligne automatique
function addWrappedText(doc, text, x, y, maxWidth, lineHeight = 7) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + (lines.length * lineHeight);
}

// Générer le PDF
function generatePDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let y = 20;

  // Page de garde
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('SchoolFlow', pageWidth / 2, y, { align: 'center' });

  y += 15;
  doc.setFontSize(20);
  doc.setFont('helvetica', 'normal');
  doc.text('Cahier des Charges', pageWidth / 2, y, { align: 'center' });

  y += 10;
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('Système de Gestion Scolaire Complet', pageWidth / 2, y, { align: 'center' });

  y += 30;
  doc.setFontSize(10);
  doc.text('Équipe : 3 experts (1 Chef de Projet + 2 Développeurs Full Stack)', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text('Stack : Next.js, TypeScript, Node.js, MongoDB', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text('Phases : MVP (4 mois) → Gestion financière (3 mois) → Paiements avancés (3 mois)', pageWidth / 2, y, { align: 'center' });

  y += 30;
  doc.setFontSize(12);
  doc.setTextColor(255, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('DOCUMENT CONFIDENTIEL', pageWidth / 2, y, { align: 'center' });

  y += 7;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('© 2024 SchoolFlow - Tous droits réservés', pageWidth / 2, y, { align: 'center' });

  // Nouvelle page pour le contenu
  doc.addPage();
  y = 20;
  doc.setTextColor(0, 0, 0);

  // Table des matières
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Table des matières', margin, y);
  y += 12;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  data.sections.forEach((section, index) => {
    doc.text(`${section.titre}`, margin, y);
    y += 7;
  });

  // Contenu détaillé
  data.sections.forEach((section, sectionIndex) => {
    doc.addPage();
    y = 20;

    // Titre de section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 98, 255); // Bleu
    doc.text(section.titre, margin, y);
    y += 10;
    doc.setTextColor(0, 0, 0);

    // Ligne de séparation
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Contenu de la section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    if (section.contenu) {
      y = addWrappedText(doc, section.contenu, margin, y, maxWidth);
      y += 5;
    }

    if (section.items) {
      section.items.forEach((item, index) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const bullet = '• ';
        const lines = doc.splitTextToSize(item, maxWidth - 10);
        doc.text(bullet, margin, y);
        doc.text(lines, margin + 5, y);
        y += lines.length * 6 + 2;
      });
    }

    if (section.subsections) {
      section.subsections.forEach((subsec) => {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }

        // Sous-titre
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(subsec.titre, margin, y);
        y += 7;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        subsec.items.forEach((item) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          const bullet = '  - ';
          const lines = doc.splitTextToSize(item, maxWidth - 15);
          doc.text(bullet, margin, y);
          doc.text(lines, margin + 10, y);
          y += lines.length * 6 + 2;
        });
        y += 5;
      });
    }
  });

  // Page finale
  doc.addPage();
  y = 100;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 0, 0);
  doc.text('DOCUMENT CONFIDENTIEL', pageWidth / 2, y, { align: 'center' });

  y += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  const footerText = [
    '⚠️ Reproduction, distribution ou partage non autorisés.',
    '🚫 Ce document contient des informations confidentielles.',
    'Tous les droits sont réservés.',
    '',
    '© 2024 SchoolFlow',
    'contact@schoolflow.com'
  ];

  footerText.forEach((line) => {
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += 7;
  });

  // Sauvegarder le PDF
  doc.save('SchoolFlow-Cahier-des-Charges.pdf');
  console.log('✅ PDF généré avec succès : SchoolFlow-Cahier-des-Charges.pdf');
}

// Exécuter la génération
generatePDF();
