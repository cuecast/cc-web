// @ts-ignore
export default async ({app}) => {
  await app.store.dispatch('todo/nuxtClientInit', app)
}
