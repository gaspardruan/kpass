import { backend } from './base'

export const getDeployList = () => {
  return backend.get(`/get/deployment`)
}

export const getPodList = () => {
  return backend.get(`/get/podlist`)
}

export const exposeDeploy = (deployName: string, deployPort: number) => {
  return backend.get(`/get/deploymentIp`, {
    params: { deploymentName: deployName, deploymentPort: deployPort }
  })
}

export const exposeDeployRandom = (deployName: string) => {
  return backend.get(`/get/deploymentIp`, { params: { deploymentName: deployName } })
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

export const updateDeploy = (data: UpdateDeployForm) => {
  return backend.post(
    `/update/deployment/image?deploymentName=${data.deploymentName}&imageName=${data.imageName}`
  )
}
