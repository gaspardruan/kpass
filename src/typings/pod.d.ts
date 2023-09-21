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
  labels: string[]
}

interface CreatePodV2 {
  imageName: string
  podName: string
  podPort: number | null
  labels: string[]
}

interface Deployment {
  name: string
  availableReplicas: number
  unavailableReplicas: number
  creationTime: string
  labels: object
}

interface ExposePod {
  podName: string
  podPort: number | null
}
