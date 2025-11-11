import { useState } from 'react'
import emailjs from '@emailjs/browser'

function EntrepreneurForm({ isDarkMode, language, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'avis', // 'avis' ou 'proposition'
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const translations = {
    fr: {
      title: '📝 Formulaire Entrepreneur',
      subtitle: 'Partagez votre avis ou faites une proposition',
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      subject: 'Type de message',
      opinion: 'Avis / Feedback',
      proposal: 'Proposition',
      message: 'Message',
      submit: 'Envoyer',
      sending: 'Envoi en cours...',
      success: '✅ Merci! Votre message a été envoyé avec succès.',
      error: '❌ Erreur lors de l\'envoi. Veuillez réessayer.',
      required: 'Ce champ est requis',
      invalidEmail: 'Email invalide',
    },
    en: {
      title: '📝 Entrepreneur Form',
      subtitle: 'Share your opinion or make a proposal',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      subject: 'Message Type',
      opinion: 'Opinion / Feedback',
      proposal: 'Proposal',
      message: 'Message',
      submit: 'Send',
      sending: 'Sending...',
      success: '✅ Thank you! Your message has been sent successfully.',
      error: '❌ Error sending message. Please try again.',
      required: 'This field is required',
      invalidEmail: 'Invalid email',
    }
  }

  const t = (key) => translations[language]?.[key] || translations['fr'][key]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: t('required') })
      return false
    }
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: t('required') })
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: t('invalidEmail') })
      return false
    }
    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: t('required') })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Initialiser EmailJS si pas déjà fait
      if (!window.emailJSInitialized) {
        emailjs.init('Axs3eRLFuT8cDYBxn')
        window.emailJSInitialized = true
      }

      // Préparer les paramètres pour l'email
      const templateParams = {
        to_email: 'imulhomabiala@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Non fourni',
        subject_type: formData.subject === 'avis' ? 'Avis / Feedback' : 'Proposition',
        message: formData.message,
        reply_to: formData.email
      }

      // Envoyer l'email
      await emailjs.send(
        'service_z0kshh4',
        'template_dz6dgwt',
        templateParams
      )

      setSubmitStatus({ type: 'success', message: t('success') })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'avis',
        message: ''
      })

      // Fermer le formulaire après 3 secondes
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Erreur EmailJS:', error)
      setSubmitStatus({ type: 'error', message: t('error') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`p-8 rounded-xl border transition-colors ${
      isDarkMode
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200'
    }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className={`block text-sm font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t('name')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Mulho - MABIALA"
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t('email')} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="imulhomabiala@gmail.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t('phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="+221 78 730 87 06"
              />
            </div>

            {/* Subject Type */}
            <div>
              <label className={`block text-sm font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t('subject')} *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="avis">{t('opinion')}</option>
                <option value="proposition">{t('proposal')}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className={`block text-sm font-semibold mb-2 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t('message')} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Écrivez votre message ici..."
              />
            </div>

            {/* Status Message */}
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                  : isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-300 text-slate-500'
                    : isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isSubmitting ? t('sending') : t('submit')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border ${
                  isDarkMode
                    ? 'border-slate-600 hover:bg-slate-700 text-slate-300'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {t('cancel')}
              </button>
            </div>
          </form>
    </div>
  )
}

export default EntrepreneurForm
