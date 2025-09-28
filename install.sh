#!/bin/bash

# Nuxt 4 Site Structure Setup Script
echo "🚀 Setting up Nuxt 4 site structure..."

# Create project structure
mkdir -p {components/{common,ui,sections},composables,layouts,pages/{projects},public/{images,icons},assets/{css,js},types,utils}

# Create component directories
mkdir -p components/common/{Header,Footer,Hero,Modal}
mkdir -p components/ui/{Button,Card,Navigation}
mkdir -p components/sections/{ProjectList,ProjectFilter}

# Create essential files
touch {nuxt.config.ts,app.vue,error.vue}
touch layouts/{default.vue,project.vue}
touch pages/{index.vue,about.vue,contact.vue}
touch pages/projects/{index.vue,'[slug].vue'}

# Create composable files
touch composables/{useTheme.ts,useProjects.ts,useModal.ts,useFilters.ts}

# Create utility files
touch utils/{constants.ts,helpers.ts,validation.ts}

# Create type definitions
touch types/{index.ts,project.ts,ui.ts}

# Create CSS files
touch assets/css/{main.css,components.css,utilities.css}

echo "📁 Directory structure created!"

# Install dependencies (if package.json exists)
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install @nuxt/ui @nuxtjs/color-mode @vueuse/nuxt @pinia/nuxt
else
    echo "⚠️  No package.json found. Initialize your project first:"
    echo "npx nuxi@latest init my-nuxt-app"
    echo "cd my-nuxt-app"
    echo "Then run this script again."
fi

echo "✅ Setup complete! Ready to build your Nuxt 4 site."
