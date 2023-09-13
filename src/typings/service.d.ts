interface Service {
  name: string
  type: string
  clusterIP: string
  externalIP: string
  ports: string[]
  age: string
}

interface CreateService {
  name: string
  type: string
  port: number
  targetPort: number
  selector: string[]
}
