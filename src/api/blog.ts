import { backend } from './base'

export const likeBlog = (id: number) => {
  return backend.put(`/blog/${id}/like`)
}

export const getBlogList = (data: { page: number; size: number }) => {
  return backend.get(`/blog/list`, { params: data })
}
