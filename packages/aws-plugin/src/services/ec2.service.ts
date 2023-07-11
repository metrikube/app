import { DescribeInstancesCommand, DescribeInstancesCommandInput, DescribeRegionsCommand, EC2Client, Reservation, Tag } from '@aws-sdk/client-ec2'
import { AwsCredentialIdentityProvider } from '@aws-sdk/types'

import { CostExplorerService } from './cost-explorer.service'

export class EC2Service {
  private readonly client: EC2Client
  private readonly credentials: AwsCredentialIdentityProvider
  constructor(credentials: AwsCredentialIdentityProvider, region?: string) {
    this.client = new EC2Client({
      region: region,
      credentials: credentials
    })
    this.credentials = credentials
  }

  async getInstances(
    params: DescribeInstancesCommandInput = {
      Filters: [
        {
          Name: 'instance-state-name',
          Values: ['running', 'pending', 'stopping', 'stopped']
        }
      ]
    }
  ): Promise<Reservation[]> {
    try {
      const data = await this.client.send(new DescribeInstancesCommand(params))
      if (!data.Reservations || data.Reservations.length === 0) {
        throw new Error('No reservations found')
      }
      return data.Reservations
    } catch (error) {
      console.error('Error fetching EC2 instances :', error)
      throw error
    }
  }

  async getAvailableRegions() {
    const command = new DescribeRegionsCommand({})
    const response = await this.client.send(command)
    return response?.Regions?.map((region) => region.RegionName)
  }

  async getInstancesByRegion(region: string) {
    const client = new EC2Client({ credentials: this.credentials, region })
    const command = new DescribeInstancesCommand({})
    const response = await client.send(command)
    return response?.Reservations?.flatMap((reservation) => reservation.Instances)
  }

  async getAllInstances() {
    const regions = await this.getAvailableRegions()
    const allInstances = []
    if (!regions || regions.length === 0) {
      return []
    }
    for (const region of regions) {
      if (!region) {
        continue
      }
      console.log('Récupération des instances pour la région:', region)
      const instances = await this.getInstancesByRegion(region)
      allInstances.push(instances)
    }
    return allInstances
  }

  /**
   * Get all instances information
   * @returns
   */
  async getInstancesInformations(): Promise<
    {
      InstanceName?: string
      Region?: string
      IsActive: boolean
      CurrentCost?: string
      currency?: string
    }[]
  > {
    const instancesInformation = []
    try {
      const params: DescribeInstancesCommandInput = {
        Filters: [
          {
            Name: 'instance-state-name',
            Values: ['running', 'stopping', 'stopped']
          }
        ]
      }
      const response = await this.client.send(new DescribeInstancesCommand(params))

      if (!response.Reservations || response.Reservations.length === 0) {
        console.log('No reservations found')
        return []
      }

      for (const reservation of response.Reservations) {
        if (!reservation.Instances || reservation.Instances.length === 0) {
          console.log('No instances found')
          return []
        }
        for (const instance of reservation.Instances) {
          const instanceId = instance.InstanceId
          if (!instanceId || !instance.Tags || !instance.Placement || !instance.State || !instance.Placement.AvailabilityZone) {
            console.log('No instance id, tags, region or state found')
            return []
          }
          const instanceName = this.getInstanceName(instance.Tags)
          const region = instance.Placement.AvailabilityZone.slice(0, -1)
          const isActive = instance.State.Name === 'running'
          const costExploreClient = new CostExplorerService(this.credentials)
          const cost = await costExploreClient.getInstanceCost(instanceId, {
            startDate: new Date().toISOString().split('T')[0].slice(0, -2) + '01',
            endDate: new Date().toISOString().split('T')[0]
          })

          const instanceInfo = {
            id: instanceId,
            InstanceName: instanceName,
            Region: region,
            CurrentCost: cost.currentCost,
            currency: cost.currency,
            IsActive: isActive
          }

          instancesInformation.push(instanceInfo)
        }
      }
    } catch (err) {
      console.log('Error fetching instance infos:', err)
    }

    return instancesInformation
  }

  /**
   * Retrieve the instance name from the tags
   * @param tags
   * @returns
   */
  getInstanceName(tags: Tag[]) {
    for (const tag of tags) {
      if (tag.Key === 'Name') {
        return tag.Value
      }
    }
    return ''
  }
}
