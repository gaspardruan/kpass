import { backend } from './base'

// export const likeBlog = (id: number) => {
//   return backend.put(`/blog/${id}/like`)
// }

// export const getBlogList = (data: { page: number; size: number }) => {
//   return backend.get(`/blog/list`, { params: data })
// }

export const getPublicImageList = () => {
  return backend.get(`/get/imagelist`, { params: { labels: `{"isPublic":"true"}` } })
}

export const getUserImageList = (id: number) => {
  return backend.get(`/get/imagelist`, { params: { userId: id } })
}

export const createImage = (data: CreateImageForm) => {
  const formData = new FormData()
  formData.append('imageName', data.imageName)
  formData.append('labels', data.labels)
  formData.append('userId', data.userId)
  formData.append('dockerfile', data.dockerfile as File)
  return backend.post(`/create/image/dockerfile`, formData)
}
