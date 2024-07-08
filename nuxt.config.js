// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content'],

  tailwindcss: {
    config: {
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
      ],
      plugins:[
        require('@tailwindcss/typography'),
      ]
    }
  },

  compatibilityDate: '2024-07-07'
})