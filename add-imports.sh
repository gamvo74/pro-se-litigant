#!/bin/bash

files=(
  "apps/web/app/page.tsx"
  "apps/web/app/matters/page.tsx"
  "apps/web/app/transcribe/page.tsx"
  "apps/web/app/mock-trial/page.tsx"
  "apps/web/app/research/page.tsx"
  "apps/web/app/document-generator/page.tsx"
  "apps/web/app/drafting/page.tsx"
  "apps/web/app/citator/page.tsx"
  "apps/web/app/canvas-editor/page.tsx"
  "apps/web/app/subscription/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    if ! grep -q "import EmptyState from '@/components/EmptyState'" "$file"; then
      if head -1 "$file" | grep -q '"use client"'; then
        sed -i '1a\\nimport EmptyState from '"'"'@/components/EmptyState'"'"';' "$file"
      else
        sed -i '1i import EmptyState from '"'"'@/components/EmptyState'"'"';\n' "$file"
      fi
      echo "✅ Added import to $file"
    else
      echo "⏭️  Import already exists in $file"
    fi
  else
    echo "❌ File not found: $file"
  fi
done

echo ""
echo "✅ All imports have been processed!"
