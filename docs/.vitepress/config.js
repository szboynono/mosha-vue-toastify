module.exports = {
  base: '/mosha-vue-toastify/',
  title: 'Mosha Vue Toastify',
  description: 'A light weight and fun Vue 3 toast or notification or snack bar or however you wanna call it library.',

  themeConfig: {
    repo: 'szboynono/mosha-vue-toastify',
    logo: '/shangmian.png',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    lastUpdated: 'Last Updated',

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: 'Getting Started',
      children: [
        { text: 'Introduction', link: '/' },
        { text: 'Installation', link: '/getting-started/installation' },
        { text: 'Configuration', link: '/getting-started/configuration' },
      ]
    },
  ]
}
