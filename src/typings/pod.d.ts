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

interface Pod2 {
  name: string
  ready: boolean
  ip: string
  labels: object
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

interface CreateDeployForm {
  name: string
  image: string
  port: number | null
  envVars: string
  labels: string
  userId: string
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
