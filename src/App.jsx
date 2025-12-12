import { useState, useEffect } from 'react'
import EntrepreneurForm from './EntrepreneurForm'

function App() {
  const [expandedSection, setExpandedSection] = useState('objectif')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [captureAttempt, setCaptureAttempt] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [language, setLanguage] = useState('fr')

  const translations = {
    fr: {
      password: 'Mot de passe',
      login: 'Accéder au document',
      logout: '🔒 Quitter',
      teamButton: '👥 Équipe',
      backButton: '← Retour',
      light: '☀️ Clair',
      dark: '🌙 Sombre',
      confidential: 'CONFIDENTIEL',
      courseSpecs: 'Cahier des Charges',
      teamPage: 'Équipe',
      ourTeam: 'Notre Équipe',
      teamDesc: '10 experts passionnés par l\'excellence',
      overview: 'Aperçu du Projet',
      sections: 'Sections Principales',
      modules: 'Modules Détaillés',
      users: 'Profils Utilisateurs',
      teamMembers: 'Membres Équipe',
      seeFullTeam: '👥 Voir l\'équipe complète',
      teamExperts: 'Découvrez les 10 experts qui pilotent ce projet',
      error: 'Mot de passe incorrect',
      screenCapture: 'Tentative de capture détectée !',
      screenshotBlocked: 'Les captures d\'écran et l\'enregistrement sont interdits.\nCette action a été enregistrée.',
      documentConfidential: 'Document Confidentiel',
      accessReserved: 'Accès réservé - Usage interne uniquement',
      errorAlert: 'DOCUMENT CONFIDENTIEL',
      reproduction: '⚠️ Reproduction, distribution ou partage non autorisés.\n🚫 Captures d\'écran et enregistrements interdits et détectés.\nTous les droits sont réservés.',
      schoolflow: 'SchoolFlow',
    },
    en: {
      password: 'Password',
      login: 'Access Document',
      logout: '🔒 Logout',
      teamButton: '👥 Team',
      backButton: '← Back',
      light: '☀️ Light',
      dark: '🌙 Dark',
      confidential: 'CONFIDENTIAL',
      courseSpecs: 'Course Specifications',
      teamPage: 'Team',
      ourTeam: 'Our Team',
      teamDesc: '10 experts passionate about excellence',
      overview: 'Project Overview',
      sections: 'Main Sections',
      modules: 'Detailed Modules',
      users: 'User Profiles',
      teamMembers: 'Team Members',
      seeFullTeam: '👥 View Full Team',
      teamExperts: 'Discover the 10 experts driving this project',
      error: 'Incorrect password',
      screenCapture: 'Screenshot Attempt Detected!',
      screenshotBlocked: 'Screenshots and recordings are prohibited.\nThis action has been logged.',
      documentConfidential: 'Confidential Document',
      accessReserved: 'Restricted access - Internal use only',
      errorAlert: 'CONFIDENTIAL DOCUMENT',
      reproduction: '⚠️ Reproduction, distribution or sharing not authorized.\n🚫 Screenshots and recordings are prohibited and detected.\nAll rights reserved.',
      schoolflow: 'SchoolFlow',
    }
  }

  const t = (key) => translations[language][key] || translations['fr'][key]

  const PASSWORD = 'SchoolFlow2024' // À changer !

  // Protection contre les captures d'écran et inspecteur
  useEffect(() => {
    if (!isAuthenticated) return

    // Désactiver PrintScreen
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        setCaptureAttempt(true)
        setTimeout(() => setCaptureAttempt(false), 3000)
        return false
      }

      // Désactiver F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 's') // Ctrl+S
      ) {
        e.preventDefault()
        return false
      }
    }

    // Désactiver clic droit
    const handleContextMenu = (e) => {
      e.preventDefault()
      return false
    }

    // Désactiver drag/drop et copie
    const handleCopy = (e) => {
      e.preventDefault()
      return false
    }

    // Détection de screenshot via API Screen Capture
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.addEventListener('enumeratedevices', () => {
        setCaptureAttempt(true)
        setTimeout(() => setCaptureAttempt(false), 3000)
      })
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('selectstart', (e) => {
      e.preventDefault()
      return false
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('selectstart', () => {})
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      setPassword('')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Écran de login
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gradient-to-br from-slate-950 to-slate-900' : 'bg-gradient-to-br from-slate-50 to-white'
      }`}>
        <div className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border ${
          isDarkMode
            ? 'bg-slate-800/50 border-slate-700'
            : 'bg-white/50 border-slate-200'
        }`}>
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-light tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t('schoolflow')}
            </h1>
            <div className={`h-px w-12 mx-auto mb-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
            <p className={`text-xs tracking-widest uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              {t('confidential')}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex gap-2 mb-8 justify-center">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                language === 'fr'
                  ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-900 text-white'
                  : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              FRANÇAIS
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                language === 'en'
                  ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-900 text-white'
                  : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              ENGLISH
            </button>
          </div>

          {/* Alert Confidentiel - Minimaliste */}
          <div className={`mb-8 p-6 rounded-sm border ${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <p className={`text-xs tracking-widest uppercase font-semibold mb-2 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              🔒 {t('documentConfidential')}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              {t('accessReserved')}
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-3 tracking-wide uppercase ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-sm border-b-2 transition-colors bg-transparent focus:outline-none ${
                  isDarkMode
                    ? 'border-slate-600 text-white placeholder-slate-600 focus:border-slate-400'
                    : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-900'
                }`}
                autoFocus
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className={`p-4 text-sm font-medium ${
                isDarkMode
                  ? 'bg-slate-800/50 text-slate-300'
                  : 'bg-slate-100 text-slate-700'
              } rounded-sm border-l-2 border-slate-600`}>
                {error}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              className={`w-full py-3 rounded-sm font-semibold tracking-wide uppercase text-sm transition-all duration-500 ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  : 'bg-slate-900 hover:bg-black text-white'
              }`}
            >
              {t('login')}
            </button>
          </form>

          {/* Footer */}
          <div className={`mt-6 pt-6 border-t text-center text-xs ${
            isDarkMode
              ? 'border-slate-700 text-slate-500'
              : 'border-slate-300 text-slate-600'
          }`}>
            <p className="mb-2">© 2024 SchoolFlow - Tous droits réservés</p>
            <p className="text-[11px]">
              ⚠️ Document confidentiel. Reproduction et partage interdits.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const sections = [
    {
      id: 'objectif',
      title: '1. Contexte et objectif',
      icon: '🎯',
      content: 'Dans un monde où le numérique prend de l\'ampleur, où l\'information est à portée de main, il est important de marcher avec l\'évolution technologique. De ce fait, l\'intérêt est de développer une application web complète permettant d\'automatiser et de faciliter la gestion administrative, pédagogique, financière et organisationnelle d\'un établissement scolaire. L\'objectif est d\'améliorer la productivité, la communication entre acteurs et la qualité du suivi des élèves.'
    },
    {
      id: 'modules',
      title: '2. Périmètre et modules du projet',
      icon: '📦',
      items: [
        'Gestion des élèves : inscriptions, dossiers, présences, historique scolaire',
        'Gestion des enseignants : affectations, emplois du temps, notes, planification',
        'Gestion des employés : liste des employés, gestion des postes, planification des horaires, gestion de la paie, gestion du pointage avec badgeuse, suivi des présences, gestion des badges',
        'Gestion des classes et matières : création, association enseignants-classes, matières',
        'Gestion des notes et compétences : saisie des évaluations, liaison aux compétences, calcul des moyennes, bulletins',
        'Gestion des bulletins scolaires : génération automatique, diffusion numérique, commentaires personnalisés',
        'Gestion administrative : suivi des paiements, facturation, sanctions disciplinaires',
        'Gestion des modes de paiement : interface intuitive style Wave, paiements mobiles (Orange Money, MTN Money, Moov Money), cartes bancaires, virements, espèces, historique des transactions, reçus numériques',
        'Communication intégrée : messagerie interne, notifications par SMS/email, forums, alertes',
        'Tableaux de bord : statistiques globales, suivi pédagogique, absentéisme, performances',
        'Gestion des ressources matérielles : réservation de salles, équipements, inventaires',
        'Gestion des emplois du temps : création, modifications, visualisations par profil',
        'Sécurité et confidentialité : gestion des accès par rôles, chiffrement des données, conformité RGPD',
        'Sauvegarde et restauration : plans de sauvegarde automatiques et manuels',
        'Accessibilité : interface responsive pour ordinateurs et mobiles, multilingue (français, anglais, troisième langue configurable)',
        'Système de rapport : génération de rapports synthétiques et détaillés exportables (PDF, Excel)',
        'Gestion de la santé scolaire : suivi des rendez-vous médicaux, dossiers médicaux, vaccinations',
        'Accessibilité et inclusion : interfaces adaptées pour élèves en situation de handicap, suivi pédagogique spécifique',
        'Outils de collaboration entre enseignants : partage sécurisé de ressources, co-élaboration des cours, suivi des projets interdisciplinaires',
        'Automatisation des tâches administratives répétitives : rappels automatiques, formulaires pré-remplis, workflow de validation',
        'Chatbot côté client : assistant numérique avec interactions automatisées et gestion côté navigateur'
      ],
      subSection: {
        title: 'Gestion des présences et suivi pédagogique par matière :',
        items: [
          'Chaque enseignant coche la présence/absence des élèves pour chaque séance',
          'Interface simple et accessible aux enseignants depuis leur compte',
          'Responsable de classe peut consulter, valider et modifier les présences pour sa classe',
          'Les enseignants remplissent un cahier de texte des chapitres ou thèmes enseignés par séance',
          'Responsable de classe accède aux suivis pédagogiques consolidés',
          'Notifications et rappels pour assurer la régularité de la saisie',
          'Rapports synthétiques disponibles pour la direction et responsables pédagogiques'
        ]
      }
    },
    {
      id: 'acteurs',
      title: '3. Acteurs et profils utilisateurs',
      icon: '👥',
      items: [
        'Administrateur général',
        'Secrétaire',
        'Enseignants',
        'Employés non enseignants',
        'Élèves',
        'Parents',
        'Responsable de classe'
      ]
    },
    {
      id: 'fonctionnalites',
      title: '4. Fonctionnalités détaillées',
      icon: '⚙️',
      subsections: [
        {
          title: 'Gestion des élèves',
          items: [
            'Inscription en ligne et gestion du dossier administratif',
            'Suivi des présences avec alertes d\'absences',
            'Historique pédagogique complet et archivage'
          ]
        },
        {
          title: 'Gestion des enseignants et notes',
          items: [
            'Planification des cours et affectations',
            'Saisie des notes, évaluation par compétences, calculs automatiques',
            'Edition, personnalisation et envoi des bulletins avec liaison des notes aux compétences et commentaires individualisés'
          ]
        },
        {
          title: 'Règles de calcul des moyennes et compétences',
          items: [
            'Saisie des notes par évaluation avec coefficient paramétrable',
            'Calcul automatique des moyennes par matière et compétence',
            'Prise en compte des absences, rattrapages, règles spécifiques',
            'Bulletins générés avec synthèses et historiques des progrès',
            'Notifications automatiques en cas de résultats critiques'
          ]
        },
        {
          title: 'Gestion des employés',
          items: [
            'Liste complète des employés et fiches individuelles',
            'Gestion des postes et rôles',
            'Planification horaires, gestion paie, pointage automatisé par badgeuse',
            'Gestion des badges d\'accès',
            'Suivi des congés, absences, remplacements'
          ]
        },
        {
          title: 'Communication',
          items: [
            'Messagerie interne, notifications, forums, espaces collaboratifs'
          ]
        },
        {
          title: 'Administration et finances',
          items: [
            'Paiements, facturation, gestion disciplinaire'
          ]
        },
        {
          title: 'Gestion des modes de paiement (Interface style Wave)',
          items: [
            'Interface utilisateur moderne et intuitive inspirée de Wave',
            'Paiements mobiles : Orange Money, MTN Money, Moov Money',
            'Paiements par carte bancaire (Visa, Mastercard)',
            'Virements bancaires et paiements en espèces',
            'QR Code pour paiements rapides',
            'Historique complet des transactions avec filtres avancés',
            'Génération automatique de reçus numériques (PDF)',
            'Notifications instantanées de confirmation de paiement',
            'Tableau de bord financier avec graphiques et statistiques',
            'Gestion des échéances et rappels automatiques',
            'Paiements fractionnés et plans de paiement personnalisés',
            'Sécurité renforcée avec authentification à deux facteurs',
            'Export des données financières (Excel, PDF)',
            'Intégration API des opérateurs mobiles'
          ]
        },
        {
          title: 'Tableaux de bord et rapports',
          items: [
            'Rapports interactifs et exportables'
          ]
        },
        {
          title: 'Gestion multilingue',
          items: [
            'Interface multilingue adaptable par session ou par profil',
            'Traductions complètes des contenus et adaptation des formats'
          ]
        }
      ]
    },
    {
      id: 'contraintes',
      title: '5. Contraintes techniques et réglementaires',
      icon: '🔒',
      items: [
        'Sécurité renforcée, conformité RGPD',
        'Sauvegardes fiables, restauration rapide',
        'Architecture modulaire accessible mobile et PC',
        'Norme internationale d\'internationalisation'
      ]
    },
    {
      id: 'technologies',
      title: '6. Technologies proposées',
      icon: '💻',
      subsections: [
        {
          title: 'Frontend',
          items: [
            'Next.js : Framework React pour le rendu côté serveur (SSR) et génération de sites statiques (SSG)',
            'TypeScript : Typage statique pour un code robuste et maintenable',
            'Tailwind CSS : Framework CSS utilitaire pour un design moderne et responsive',
            'Intégration chatbot JavaScript côté client pour assistance en temps réel'
          ]
        },
        {
          title: 'Côté serveur (Backend)',
          items: [
            'Node.js : Environnement d\'exécution JavaScript haute performance',
            'Express.js : Framework web minimaliste et flexible pour Node.js',
            'API RESTful : Architecture pour la communication entre frontend et backend',
            'JWT (JSON Web Tokens) : Authentification sécurisée des utilisateurs',
            'Socket.io : Communication en temps réel pour notifications et messagerie'
          ]
        },
        {
          title: 'Base de données',
          items: [
            'MongoDB : Base de données NoSQL orientée documents',
            'Mongoose : ODM (Object Data Modeling) pour MongoDB et Node.js',
            'Structure flexible pour gérer des données complexes et évolutives',
            'Indexation optimisée pour performances élevées'
          ]
        },
        {
          title: 'Intégrations et APIs',
          items: [
            'API Orange Money, MTN Money, Moov Money pour paiements mobiles',
            'API de paiement par carte bancaire (Stripe, PayPal)',
            'API SMS pour notifications (Twilio, Nexmo)',
            'API Email (SendGrid, Mailgun)'
          ]
        },
        {
          title: 'Hébergement et DevOps',
          items: [
            'Cloud sécurisé : AWS, Azure, Google Cloud ou OVH',
            'Docker : Conteneurisation pour déploiement simplifié',
            'CI/CD : Intégration et déploiement continus',
            'Monitoring : Outils de surveillance et logging (PM2, Winston)'
          ]
        },
        {
          title: 'Sécurité',
          items: [
            'HTTPS/SSL : Chiffrement des communications',
            'Authentification à deux facteurs (2FA)',
            'Hashage des mots de passe (bcrypt)',
            'Protection contre XSS, CSRF, injection SQL',
            'Conformité RGPD'
          ]
        }
      ]
    },
    {
      id: 'planification',
      title: '7. Planification prévisionnelle',
      icon: '📅',
      items: [
        'Analyse : 2-3 semaines',
        'Conception : 3-4 semaines',
        'Développement & intégration : 14 semaines (incluant chatbot et gestion présences)',
        'Tests : 4 semaines',
        'Déploiement & formation : 2-3 semaines'
      ]
    },
    {
      id: 'budget',
      title: '8. Budget',
      icon: '💰',
      content: 'À affiner selon les options et ressources.'
    },
    {
      id: 'equipe',
      title: '9. Équipe du Projet',
      icon: '👔'
    }
  ]

  const teamMembers = [
        // {
        //   id: 1,
        //   name: 'Chef de Projet',
        //   role: 'Project Manager',
        //   icon: '📋',
        //   photo: '',
        //   skills: ['Gestion de projet', 'Planification', 'Coordination d\'équipe', 'Suivi budgétaire']
        // },
        // {
        //   id: 2,
        //   name: 'Architecte Système',
        //   role: 'System Architect',
        //   icon: '🏗️',
        //   photo: '',
        //   skills: ['Architecture logicielle', 'Design système', 'Scalabilité', 'Sécurité']
        // },
        // {
        //   id: 3,
        //   name: 'Lead Frontend',
        //   role: 'Frontend Developer',
        //   icon: '🎨',
        //   photo: '',
        //   skills: ['React/Angular', 'UI/UX Design', 'Responsive Design', 'Performance']
        // },
        // {
        //   id: 4,
        //   name: 'Lead Backend',
        //   role: 'Backend Developer',
        //   icon: '⚙️',
        //   photo: '',
        //   skills: ['Node.js/Django/Laravel', 'API REST', 'Bases de données', 'Optimisation']
        // },
        // {
        //   id: 5,
        //   name: 'DBA (Database Administrator)',
        //   role: 'Database Specialist',
        //   icon: '🗄️',
        //   photo: '',
        //   skills: ['MySQL', 'PostgreSQL', 'Optimisation requêtes', 'Sauvegardes']
        // },
        // {
        //   id: 6,
        //   name: 'Spécialiste Sécurité',
        //   role: 'Security Engineer',
        //   icon: '🔐',
        //   photo: '',
        //   skills: ['RGPD', 'Chiffrement', 'Authentification', 'Audit sécurité']
        // },
        // {
        //   id: 7,
        //   name: 'QA Lead',
        //   role: 'Quality Assurance',
        //   icon: '✅',
        //   photo: '',
        //   skills: ['Tests automatisés', 'Tests manuels', 'Reporting bugs', 'Performance testing']
        // },
        // {
        //   id: 8,
        //   name: 'DevOps Engineer',
        //   role: 'DevOps Specialist',
        //   icon: '🚀',
        //   photo: '',
        //   skills: ['CI/CD', 'Docker', 'AWS/Azure', 'Monitoring']
        // },
        // {
        //   id: 9,
        //   name: 'Développeur Frontend',
        //   role: 'Frontend Developer',
        //   icon: '💻',
        //   photo: '',
        //   skills: ['ReactJS', 'Tailwind CSS', 'JavaScript', 'Intégration API']
        // },
        // {
        //   id: 10,
        //   name: 'Développeur Backend',
        //   role: 'Backend Developer',
        //   icon: '🔧',
        //   photo: '',
        //   skills: ['Node.js/Python', 'REST API', 'Intégration BDD', 'Logique métier']
        // }
  ]

  // Page équipe
  if (currentPage === 'team') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        {/* Navigation */}
        <nav className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
          isDarkMode
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white/80 border-slate-200'
        } border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  isDarkMode ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'
                }`}>
                  <span className="text-lg font-bold text-white">📚</span>
                </div>
                <div>
                  <h1 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    SchoolFlow
                  </h1>
                  <p className={`text-xs transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Équipe</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('backButton')}
                </button>
                <div className={`h-4 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`text-sm font-medium tracking-wide bg-transparent transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                </select>
                <div className={`h-4 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isDarkMode ? '○' : '●'}
                </button>
                <button
                  onClick={() => {
                    setIsAuthenticated(false)
                    setPassword('')
                    setError('')
                  }}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                    isDarkMode
                      ? 'text-slate-500 hover:text-slate-300'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Watermark CONFIDENTIEL */}
        <div className="fixed top-4 right-4 z-40 pointer-events-none">
          <div className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 ${
            isDarkMode
              ? 'bg-red-600/80 text-white'
              : 'bg-red-500/80 text-white'
          }`}>
            <span>🔒</span>
            CONFIDENTIEL
          </div>
        </div>

        {/* Protection écran */}
        <style>{`
          * {
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          input, textarea {
            -webkit-user-select: text;
            user-select: text;
          }
        `}</style>

        {/* Équipe Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h2 className={`text-6xl font-light tracking-tight mb-4 transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('ourTeam')}
            </h2>
            <div className={`h-px w-16 mx-auto mb-8 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
            <p className={`text-sm tracking-wide transition-colors ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>
              {t('teamDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`group rounded-sm overflow-hidden transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-slate-800/40 border border-slate-700/50 hover:border-slate-600'
                    : 'bg-white border border-slate-200 hover:border-slate-900/20'
                }`}
              >
                {/* Photo/Avatar */}
                <div className={`h-40 flex items-center justify-center overflow-hidden ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
                } group-hover:bg-slate-600/50 transition-colors duration-500`}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-500">{member.icon}</div>
                  )}
                </div>

                {/* Info - Très épuré */}
                <div className={`p-5 text-center border-t ${
                  isDarkMode ? 'border-slate-700/50' : 'border-slate-200'
                }`}>
                  <h3 className={`text-xs font-medium tracking-wide mb-3 transition-colors uppercase ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-900'
                  }`}>
                    {member.name}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {member.skills.slice(0, 2).map((skill, idx) => (
                      <p
                        key={idx}
                        className={`text-xs transition-colors ${
                          isDarkMode
                            ? 'text-slate-500'
                            : 'text-slate-600'
                        }`}
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t py-12 transition-colors duration-300 ${
          isDarkMode
            ? 'border-slate-800 bg-slate-900/50'
            : 'border-slate-200 bg-slate-100/50'
        }`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className={`p-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-red-500/20 border-red-500/30'
                  : 'bg-red-100 border-red-300'
              }`}>
                <p className={`text-sm font-bold flex items-center justify-center gap-2 ${
                  isDarkMode ? 'text-red-400' : 'text-red-700'
                }`}>
                  <span>🔒</span>
                  DOCUMENT CONFIDENTIEL
                  <span>🔒</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Alerte capture d'écran */}
      {captureAttempt && isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`p-8 rounded-2xl border-2 text-center max-w-md ${
            isDarkMode
              ? 'bg-red-900/90 border-red-600'
              : 'bg-red-100 border-red-600'
          }`}>
            <p className={`text-2xl mb-3`}>⚠️</p>
            <h2 className={`text-xl font-bold mb-2 ${
              isDarkMode ? 'text-red-100' : 'text-red-900'
            }`}>
              Tentative de capture détectée !
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-red-200' : 'text-red-800'
            }`}>
              Les captures d'écran et l'enregistrement sont interdits.
              Cette action a été enregistrée.
            </p>
          </div>
        </div>
      )}

      {/* Watermark CONFIDENTIEL */}
      <div className="fixed top-4 right-4 z-40 pointer-events-none">
        <div className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 ${
          isDarkMode
            ? 'bg-red-600/80 text-white'
            : 'bg-red-500/80 text-white'
        }`}>
          <span>🔒</span>
          CONFIDENTIEL
        </div>
      </div>

      {/* Protection écran (user-select: none) */}
      <style>{`
        * {
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        input, textarea {
          -webkit-user-select: text;
          user-select: text;
        }
      `}</style>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDarkMode
          ? 'bg-slate-900/80 border-slate-800'
          : 'bg-white/80 border-slate-200'
      } border-b`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                isDarkMode ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'
              }`}>
                <span className="text-lg font-bold text-white">📚</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  SchoolFlow
                </h1>
                <p className={`text-xs transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Cahier des Charges</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('team')}
                className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('teamButton')}
              </button>
              <div className={`h-4 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`text-sm font-medium tracking-wide bg-transparent transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
              <div className={`h-4 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`text-sm font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isDarkMode ? '○' : '●'}
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false)
                  setPassword('')
                  setError('')
                }}
                className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                  isDarkMode
                    ? 'text-slate-500 hover:text-slate-300'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              isDarkMode
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-blue-100 text-blue-700 border border-blue-300'
            }`}>
              📋 Gestion Scolaire Complète
            </span>
          </div>
          <h2 className={`text-5xl sm:text-6xl font-bold leading-tight transition-colors ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Système Complet et Avancé
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              de Gestion d'École
            </span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Cahier des charges détaillé pour une solution intégrée de gestion administrative,
            pédagogique, financière et organisationnelle
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`group rounded-xl overflow-hidden transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50'
                  : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full px-6 py-5 transition-all duration-300 flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-3xl transform group-hover:scale-110 transition-transform">
                    {section.icon}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {section.title}
                  </h3>
                </div>
                <span className={`text-2xl text-white transition-transform duration-300 ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {expandedSection === section.id && (
                <div className={`px-6 py-8 space-y-6 transition-all duration-300 ${
                  isDarkMode ? 'bg-slate-800/30' : 'bg-slate-50/50'
                }`}>
                  {section.content && (
                    <p className={`leading-relaxed text-base transition-colors ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {section.content}
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, idx) => (
                        <li key={idx} className={`flex gap-3 transition-colors ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <span className={`flex-shrink-0 font-bold text-lg ${
                            isDarkMode ? 'text-slate-500' : 'text-slate-400'
                          }`}>▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subSection && (
                    <div className={`mt-8 pt-8 space-y-4 transition-colors ${
                      isDarkMode ? 'border-t border-slate-700' : 'border-t border-slate-300'
                    }`}>
                      <h4 className={`text-lg font-semibold flex items-center gap-2 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        <span className="text-green-400">✓</span>
                        {section.subSection.title}
                      </h4>
                      <ul className="space-y-3 pl-4">
                        {section.subSection.items.map((item, idx) => (
                          <li key={idx} className={`flex gap-3 transition-colors ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            <span className="text-green-400 flex-shrink-0">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.subsections && (
                    <div className="space-y-4">
                      {section.subsections.map((subsec, sidx) => (
                        <div key={sidx} className={`p-5 rounded-lg border transition-colors ${
                          isDarkMode
                            ? 'bg-slate-700/30 border-slate-700 hover:border-slate-600'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}>
                          <h4 className={`font-semibold mb-4 flex items-center gap-2 transition-colors ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                            {subsec.title}
                          </h4>
                          <ul className="space-y-3">
                            {subsec.items.map((item, idx) => (
                              <li key={idx} className={`flex gap-3 transition-colors ${
                                isDarkMode ? 'text-slate-300' : 'text-slate-700'
                              }`}>
                                <span className={`flex-shrink-0 font-bold ${
                                  isDarkMode ? 'text-slate-500' : 'text-slate-400'
                                }`}>•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.id === 'equipe' && (
                    <div className="text-center space-y-4">
                      <p className={`transition-colors ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Découvrez les 10 experts qui pilotent ce projet
                      </p>
                      <button
                        onClick={() => setCurrentPage('team')}
                        className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        👥 Voir l'équipe complète
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Formulaire Entrepreneur Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            📝 {language === 'fr' ? 'Donner votre Avis' : 'Share Your Feedback'}
          </h2>
          <p className={`text-lg transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {language === 'fr'
              ? 'Votre feedback est important pour nous. Partagez votre avis ou faites une proposition.'
              : 'Your feedback is important to us. Share your opinion or make a proposal.'}
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <EntrepreneurForm
            isDarkMode={isDarkMode}
            language={language}
            onClose={() => {}}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className={`text-2xl font-bold text-center mb-12 transition-colors ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Aperçu du Projet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: t('sections'), value: '9', icon: '📋' },
            { label: t('modules'), value: '20+', icon: '📦' },
            { label: t('users'), value: '7', icon: '👥' },
            { label: t('teamMembers'), value: '10', icon: '👔' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800 to-slate-700/50 border-slate-700 hover:border-slate-600'
                  : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-4xl font-bold mb-2 transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {stat.value}
              </div>
              <p className={`transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900/50'
          : 'border-slate-200 bg-slate-100/50'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            {/* Alert Confidentiel */}
            <div className={`p-4 rounded-lg border ${
              isDarkMode
                ? 'bg-red-500/20 border-red-500/30'
                : 'bg-red-100 border-red-300'
            }`}>
              <p className={`text-sm font-bold flex items-center justify-center gap-2 ${
                isDarkMode ? 'text-red-400' : 'text-red-700'
              }`}>
                <span>🔒</span>
                DOCUMENT CONFIDENTIEL
                <span>🔒</span>
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                ⚠️ Reproduction, distribution ou partage non autorisés.
                <br/>
                🚫 Captures d'écran et enregistrements interdits et détectés.
                <br/>
                Tous les droits sont réservés.
              </p>
            </div>

            <div className="space-y-2">
              <p className={`font-semibold transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                SchoolFlow
              </p>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                © 2024 Système de Gestion d'École - Cahier des Charges Complet
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
