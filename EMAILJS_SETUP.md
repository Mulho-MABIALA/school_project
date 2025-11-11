# Configuration EmailJS - Guide d'Installation

Ce guide vous explique comment configurer EmailJS pour que le formulaire entrepreneur fonctionne correctement.

## 📋 Étapes de Configuration

### 1️⃣ Créer un Compte EmailJS

1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up"** ou **"Create Account"**
3. Remplissez le formulaire d'inscription
4. Vérifiez votre email et connectez-vous

### 2️⃣ Créer un Service Email

1. Une fois connecté, allez dans **"Email Services"** (sur le dashboard)
2. Cliquez sur **"Create New Service"**
3. Choisissez votre email provider:
   - **Gmail** (recommandé)
   - Outlook
   - Yahoo
   - Ou un serveur SMTP personnalisé
4. Suivez les instructions pour connecter votre email
5. **Notez votre Service ID** (il ressemble à: `service_xxxxxxxxxxxxx`)

### 3️⃣ Créer un Template Email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template comme suit:

**Template Content:**
```
Nouvel Avis/Proposition reçu de {{from_name}}

---

De: {{from_name}} ({{from_email}})
Entreprise: {{company}}
Téléphone: {{phone}}
Type: {{subject_type}}

---

MESSAGE:
{{message}}

---

Vous pouvez répondre directement à: {{from_email}}
```

4. **Important**: Dans les "Email Parameters", assurez-vous que:
   - `to_email` contient votre adresse email (par défaut)
   - Testez l'envoi avant de sauvegarder
5. **Notez votre Template ID** (il ressemble à: `template_xxxxxxxxxxxxx`)

### 4️⃣ Obtenir votre Clé Publique

1. Allez dans **"Account"** → **"API Keys"**
2. Copiez votre **Public Key** (commence par `xxxx_`)
3. Cette clé ne nécessite pas de protection (publique)

## 🔑 Remplacer les Clés dans le Code

Ouvrez le fichier `src/EntrepreneurForm.jsx` et remplacez les placeholders:

**Ligne ~117 - Public Key:**
```javascript
emailjs.init('YOUR_PUBLIC_KEY')
```
👇 Remplacez par:
```javascript
emailjs.init('pk_xxxxxxxxxxxxxxxxxxxxxxxx') // Votre clé publique
```

**Ligne ~133 - Email de destination:**
```javascript
to_email: 'votre-email@example.com',
```
👇 Remplacez par:
```javascript
to_email: 'votre-email-reel@gmail.com', // Votre email
```

**Ligne ~154 - Service ID:**
```javascript
'YOUR_SERVICE_ID',
```
👇 Remplacez par:
```javascript
'service_xxxxxxxxxxxxxxxxxxxxxxx', // Votre Service ID
```

**Ligne ~156 - Template ID:**
```javascript
'YOUR_TEMPLATE_ID',
```
👇 Remplacez par:
```javascript
'template_xxxxxxxxxxxxxxxxxxxxxxx', // Votre Template ID
```

## ✅ Vérifier la Configuration

### Option 1: Tester sur votre site
1. Lancez le projet: `npm run dev`
2. Authentifiez-vous
3. Cliquez sur le bouton **📝 Avis** dans la navbar
4. Remplissez et envoyez un message test
5. Vérifiez que vous recevez l'email

### Option 2: Tester dans EmailJS
1. Allez sur **Email Templates**
2. Sélectionnez votre template
3. Cliquez sur **"Test it"**
4. Entrez les paramètres de test
5. Cliquez sur **"Send Test Email"**

## 🔒 Sécurité

- **Votre Public Key** peut être exposée (elle est publique par nature)
- **Jamais** n'exposez votre Secret Key si vous en avez une
- Les emails sont envoyés via les serveurs sécurisés d'EmailJS

## 📞 Support

**Problèmes courants:**

| Problème | Solution |
|----------|----------|
| "Invalid Service ID" | Vérifiez que votre Service ID est correct dans le code |
| "Invalid Template ID" | Vérifiez que votre Template ID existe et est actif |
| Pas de réception d'email | Vérifiez l'adresse `to_email` et les paramètres du template |
| "ReCAPTCHA failed" | Rafraîchissez la page et réessayez |

Pour plus d'aide: [Documentation EmailJS](https://www.emailjs.com/docs/)

## 📧 Variables Disponibles dans le Template

Ces variables sont automatiquement remplies par le formulaire:

```
{{from_name}}      → Nom complet de la personne
{{from_email}}     → Email de contact
{{company}}        → Nom de l'entreprise
{{phone}}          → Numéro de téléphone
{{subject_type}}   → Type de message (Avis / Proposition)
{{message}}        → Contenu du message
{{to_email}}       → Votre email (destination)
{{reply_to}}       → Email de réponse
```

---

**Note:** Une fois que vous avez remplacé les clés, vous pouvez supprimer ce fichier ou le garder comme référence.
