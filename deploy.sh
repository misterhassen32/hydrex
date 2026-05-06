#!/bin/bash
# ============================================================
# 🚀 HYDREX — Script d'installation automatique
# Pour VPS Hostinger avec domaine hydrex-assainissement.com
# ============================================================
# Utilisation :
#   1. Uploadez ce script + le projet sur votre VPS
#   2. chmod +x deploy.sh
#   3. ./deploy.sh
# ============================================================

set -e

# ---- CONFIGURATION ----
DOMAIN="hydrex-assainissement.com"
DOMAIN_WWW="www.hydrex-assainissement.com"
SITE_DIR="/var/www/hydrex"
NGINX_CONF="/etc/nginx/sites-available/hydrex"
# ------------------------

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        🚀 HYDREX — Installation Automatique      ║${NC}"
echo -e "${BLUE}║        Domaine : ${DOMAIN}          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier qu'on est root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Ce script doit être lancé en root (sudo ./deploy.sh)${NC}"
    exit 1
fi

# ---- ÉTAPE 1 : Demander l'IP du VPS ----
echo -e "${YELLOW}📋 Étape 1/7 — Configuration${NC}"
echo ""
read -p "Entrez l'IP de votre VPS : " VPS_IP
if [ -z "$VPS_IP" ]; then
    echo -e "${RED}❌ IP requise !${NC}"
    exit 1
fi

read -p "Entrez votre email (pour SSL et notifications) : " ADMIN_EMAIL
if [ -z "$ADMIN_EMAIL" ]; then
    ADMIN_EMAIL="admin@${DOMAIN}"
fi

echo -e "${GREEN}✅ Configuration enregistrée${NC}"
echo ""

# ---- ÉTAPE 2 : Mise à jour du système ----
echo -e "${YELLOW}📋 Étape 2/7 — Mise à jour du système${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}✅ Système à jour${NC}"
echo ""

# ---- ÉTAPE 3 : Installer les dépendances ----
echo -e "${YELLOW}📋 Étape 3/7 — Installation de Node.js, Bun, Nginx, Git${NC}"

# Node.js 20
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi
echo -e "  Node.js : ${GREEN}$(node -v)${NC}"

# Bun
if ! command -v bun &> /dev/null; then
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi
echo -e "  Bun : ${GREEN}$(bun --version 2>/dev/null || echo 'installé')${NC}"

# Nginx
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
fi
echo -e "  Nginx : ${GREEN}$(nginx -v 2>&1)${NC}"

# Git
if ! command -v git &> /dev/null; then
    apt install -y git
fi
echo -e "  Git : ${GREEN}$(git --version)${NC}"

echo -e "${GREEN}✅ Dépendances installées${NC}"
echo ""

# ---- ÉTAPE 4 : Builder le site ----
echo -e "${YELLOW}📋 Étape 4/7 — Build du site statique${NC}"

# Vérifier que le projet existe
if [ ! -f "${SITE_DIR}/package.json" ]; then
    echo -e "${RED}❌ Projet non trouvé dans ${SITE_DIR}${NC}"
    echo -e "  Uploadez d'abord le projet :"
    echo -e "  ${BLUE}scp -r ./hydrex root@${VPS_IP}:${SITE_DIR}${NC}"
    echo ""
    read -p "Ou entrez l'URL du repo Git (ou Entrée pour ignorer) : " GIT_REPO
    if [ -n "$GIT_REPO" ]; then
        git clone "$GIT_REPO" "$SITE_DIR"
    else
        exit 1
    fi
fi

cd "$SITE_DIR"

# Installer les dépendances
echo -e "  Installation des dépendances..."
npm install

# Builder le site statique
echo -e "  Build en cours..."
npm run build

# Vérifier que le dossier /out existe
if [ ! -d "${SITE_DIR}/out" ]; then
    echo -e "${RED}❌ Build échoué — dossier /out non trouvé${NC}"
    exit 1
fi

FILE_COUNT=$(find "${SITE_DIR}/out" -type f | wc -l)
echo -e "  ${GREEN}${FILE_COUNT} fichiers générés dans /out${NC}"
echo -e "${GREEN}✅ Site buildé avec succès${NC}"
echo ""

# ---- ÉTAPE 5 : Configurer Nginx ----
echo -e "${YELLOW}📋 Étape 5/7 — Configuration Nginx${NC}"

cat > "$NGINX_CONF" << EOF
server {
    listen 80;
    server_name ${DOMAIN} ${DOMAIN_WWW};

    root ${SITE_DIR}/out;
    index index.html;

    # Cache statique performant (fichiers _next/static)
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Images et assets
    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 6M;
        add_header Cache-Control "public";
    }

    # Toutes les routes → index.html
    location / {
        try_files \$uri \$uri.html \$uri/ /index.html;
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Compression Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
}
EOF

# Activer le site
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Tester la config
nginx -t
systemctl reload nginx
systemctl enable nginx

echo -e "${GREEN}✅ Nginx configuré${NC}"
echo ""

# ---- ÉTAPE 6 : SSL ----
echo -e "${YELLOW}📋 Étape 6/7 — Certificat SSL (HTTPS)${NC}"
echo -e "${BLUE}  ⚠️  Assurez-vous que les DNS pointent vers ${VPS_IP} avant de continuer !${NC}"
echo "  DNS nécessaires chez Hostinger :"
echo "    - Enregistrement A : @ → ${VPS_IP}"
echo "    - Enregistrement A : www → ${VPS_IP}"
echo ""
read -p "Les DNS sont-ils configurés ? (o/n) : " DNS_READY

if [ "$DNS_READY" = "o" ] || [ "$DNS_READY" = "O" ] || [ "$DNS_READY" = "y" ] || [ "$DNS_READY" = "Y" ]; then
    apt install -y certbot python3-certbot-nginx
    
    certbot --nginx \
        -d "$DOMAIN" \
        -d "$DOMAIN_WWW" \
        --non-interactive \
        --agree-tos \
        --email "$ADMIN_EMAIL" \
        --redirect
    
    echo -e "${GREEN}✅ SSL installé — HTTPS actif !${NC}"
else
    echo -e "${YELLOW}⚠️  SSL ignoré. Relancez ce script ou manuellement :${NC}"
    echo -e "  ${BLUE}certbot --nginx -d ${DOMAIN} -d ${DOMAIN_WWW}${NC}"
fi
echo ""

# ---- ÉTAPE 7 : Vérification finale ----
echo -e "${YELLOW}📋 Étape 7/7 — Vérification${NC}"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost/" 2>/dev/null || echo "000")

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}║          ✅ SITE HYDREX EN LIGNE !               ║${NC}"
else
    echo -e "${YELLOW}║       ⚠️  Site en cours de déploiement            ║${NC}"
fi
echo -e "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  🌐 URL : ${GREEN}https://${DOMAIN}${NC}"
echo -e "  📁 Dossier site : ${SITE_DIR}"
echo -e "  📁 Dossier statique : ${SITE_DIR}/out"
echo -e "  ⚙️  Config Nginx : ${NGINX_CONF}"
echo ""
echo -e "${YELLOW}📝 Pour mettre à jour le site plus tard :${NC}"
echo "  cd ${SITE_DIR}"
echo "  git pull              # Récupérer les modifications"
echo "  npm install           # Mettre à jour les dépendances"
echo "  npm run build         # Rebuilder le site"
echo "  # C'est tout ! Nginx sert automatiquement les nouveaux fichiers"
echo ""
echo -e "${YELLOW}📝 Commandes utiles :${NC}"
echo "  systemctl status nginx    # Vérifier Nginx"
echo "  systemctl reload nginx    # Recharger la config"
echo "  certbot renew             # Renouveler le SSL"
echo "  journalctl -u nginx       # Logs Nginx"
echo ""
