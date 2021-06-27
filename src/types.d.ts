interface Memory {
    stats: {
        time: number,
        gcl: {
            progress: number,
            progressTotal: number,
            level: number
        },
        rooms: {
            [roomName: string]: {
                storageEnergy: number,
                terminalEnergy: number,
                energyAvailable: number,
                energyCapacityAvailable: number,
                controllerProgress: number,
                controllerProgressTotal: number,
                controllerLevel: number
            }
        },
        cpu: {
            bucket: number,
            limit: number,
            used: number
        }
    }
}
