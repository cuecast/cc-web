import * as F from 'faker'
import Unsplash from 'unsplash-js'

export default class Mock {
  streamList(count) {
    let list: any = []
    for (let i = 0; i < count; i++) {
      list.push({
        id: i+1,
        title: F.lorem.sentence(),
        description: F.lorem.sentence(),
        thumbnail: this.randomImageUrl(),
        hostName: F.internet.userName(),
        viewers: F.random.number(),
      })
    }
    return list
  }

  randomImageUrl() {
    return `/images/00${Math.floor(Math.random() * 50) + 11}.jpg`
  }
}


