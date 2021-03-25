module.exports = {
  base: '/mosha-vue-toastify/',
  title: 'Mosha Vue Toastify',
  description: 'A glassmorphism inspired Vue 3 UI library',

  themeConfig: {
    repo: 'szboynono/mosha-vue-toastify',
    logo: '/shangmian.png',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Getting Started', link: '/getting-started/introduction' },
    ],

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
        { text: 'Introduction', link: '/getting-started/introduction' },
      ]
    },
    {
      text: 'Components',
      children: [
        { text: 'Alert', link: '/components/alert' },
        { text: 'Button', link: '/components/button' },
        { text: 'Container', link: '/components/container' },
        { text: 'Message', link: '/components/message' },
        { text: 'Notification', link: '/components/notification' },
      ]
    },
  ]
}
