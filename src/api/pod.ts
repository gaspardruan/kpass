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

export const deletePod = (podName: string) => {
  return backend.post(`/delete/pod?podName=` + podName)
}

export const deleteDeploy = (deployName: string) => {
  return backend.post(`/delete/deployment?deploymentName=` + deployName)
}

export const createDeploy = (data: CreateDeployForm) => {
  return backend.post(
    `/create/deployment?name=${data.name}&image=${data.image}&port=${data.port}&envVars=${data.envVars}&labels=${data.labels}&userId=${data.userId}`
  )
}
