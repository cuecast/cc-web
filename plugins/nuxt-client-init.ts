// @ts-ignore
export default async ({app}) => {
  let todos = [{id: 3, title: 'aaaaaaaaaaaaabl bah', completed: false}]

  await app.store.dispatch('nuxtServerInit', todos)
}

