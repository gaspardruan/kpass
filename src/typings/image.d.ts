interface Image {
  id: string
  imageName: string
  size: number
  labels: string[]
  createTime: number
}

interface CreateImageForm {
  imageName: string
  labels: string
  userId: string
  dockerfile: File | null
}
