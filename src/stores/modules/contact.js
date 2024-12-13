import {defineStore} from "pinia";

export const useContactStore = defineStore('sillyboyy-contact', () => {
  const contact_text = {
    qq: 'come to be friends with me',
    github: 'find me on github',
    douyin: 'watch my daily life',
  }
  return {
    contact_text
  }
})
