import Mock from '~/data'

export default function (ctx, inject) {
  inject('fake', new Mock())
}
