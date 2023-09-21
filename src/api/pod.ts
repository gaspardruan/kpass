import { backend } from './base'

export const getDeployList = () => {
  return backend.get(`/get/deployment`)
}

export const getPodList = () => {
  return backend.get(`/get/podlist`)
}

export const exposePod = (podName: string, port: number) => {
  return backend.get(`/get/podIp`, { params: { podName: podName, port: port } })
}
