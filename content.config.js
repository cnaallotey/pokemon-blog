import { defineCollection } from '@nuxt/content'

export default defineCollection({
    content: {
      source: {
        include: '**/*.md',
        exclude: ['**/.(!(navigation.yml))'] // Exclude dot files except navigation.yml
      }
    }
  })
  