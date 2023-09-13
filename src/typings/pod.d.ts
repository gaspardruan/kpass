interface Pod {
  name: string
  ready: string
  status: string
  restarts: number
  age: string
  ip: string
  node: string
  tags: string[]
}

interface CreatePod {
  imageID: string
  imageName: string
  podName: string
  podPort: number | null
}

interface CreatePodV2 {
  imageName: string
  podName: string
  podPort: number | null
}

interface Deployment {
  name: string
  ready: string
  upToDate: number
  available: number
  age: string
}
